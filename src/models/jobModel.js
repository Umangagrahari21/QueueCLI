import db from "../database/db.js";

const insertJobStmt = db.prepare(`
INSERT INTO jobs (
    id,
    command,
    state,
    attempts,
    max_retries,
    available_at,
    worker_id,
    last_error,
    created_at,
    updated_at
)
VALUES (
    @id,
    @command,
    @state,
    @attempts,
    @max_retries,
    @available_at,
    @worker_id,
    @last_error,
    @created_at,
    @updated_at
)
`);

const getNextJobStmt = db.prepare(`
SELECT *
FROM jobs
WHERE state = 'pending'
AND available_at <= ?
ORDER BY created_at
LIMIT 1
`);

const listJobsStmt = db.prepare(`
SELECT
    id,
    command,
    state,
    attempts,
    max_retries,
    worker_id,
    created_at,
    updated_at
FROM jobs
ORDER BY created_at DESC
`);

const statsStmt = db.prepare(`
SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN state='pending' THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN state='processing' THEN 1 ELSE 0 END) AS processing,
    SUM(CASE WHEN state='completed' THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN state='dead' THEN 1 ELSE 0 END) AS dead
FROM jobs
`);

const getJobByIdStmt = db.prepare(`
SELECT *
FROM jobs
WHERE id = ?
`);

const updateStateStmt = db.prepare(`
UPDATE jobs
SET state = ?, updated_at = ?
WHERE id = ?
`);

const retryJobStmt = db.prepare(`
UPDATE jobs
SET
    state = 'pending',
    attempts = attempts + 1,
    available_at = ?,
    last_error = ?,
    updated_at = ?
WHERE id = ?
`);

const moveToDeadStmt = db.prepare(`
UPDATE jobs
SET
    state = 'dead',
    last_error = ?,
    updated_at = ?
WHERE id = ?
`);

const updateWorkerStmt = db.prepare(`
UPDATE jobs
SET worker_id = ?
WHERE id = ?
`);

export function createJob(job) {
    insertJobStmt.run(job);
}

export function claimNextJob(workerId) {
    const now = new Date().toISOString();

    return db.transaction(() => {
        const job = getNextJobStmt.get(now);

        if (!job) {
            return null;
        }

        updateStateStmt.run(
            "processing",
            now,
            job.id
        );

        updateWorkerStmt.run(
            workerId,
            job.id
        );

        return {
            ...job,
            state: "processing",
            worker_id: workerId,
        };
    })();
}

export function updateJobState(id, state) {
    updateStateStmt.run(
        state,
        new Date().toISOString(),
        id
    );
}

export function retryJob(id, nextRun, error) {
    retryJobStmt.run(
        nextRun,
        error,
        new Date().toISOString(),
        id
    );
}

export function moveToDead(id, error) {
    moveToDeadStmt.run(
        error,
        new Date().toISOString(),
        id
    );
}
export function getAllJobs() {
    return listJobsStmt.all();
}
export function getJobById(id) {
    return getJobByIdStmt.get(id);
}
export function getJobStats() {
    return statsStmt.get();
}