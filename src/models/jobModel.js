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