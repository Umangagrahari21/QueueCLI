import db from "../database/db.js";

const registerWorkerStmt = db.prepare(`
INSERT OR REPLACE INTO workers (
    worker_id,
    pid,
    status,
    started_at,
    last_heartbeat
)
VALUES (?, ?, ?, ?, ?)
`);

const updateHeartbeatStmt = db.prepare(`
UPDATE workers
SET
    last_heartbeat = ?,
    status = ?
WHERE worker_id = ?
`);

const deactivateWorkerStmt = db.prepare(`
UPDATE workers
SET
    status = 'stopped'
WHERE worker_id = ?
`);

export function registerWorker(workerId) {

    const now = new Date().toISOString();

    registerWorkerStmt.run(
        workerId,
        process.pid,
        "active",
        now,
        now
    );

}

export function updateHeartbeat(workerId) {

    updateHeartbeatStmt.run(
        new Date().toISOString(),
        "active",
        workerId
    );

}

export function deactivateWorker(workerId) {

    deactivateWorkerStmt.run(workerId);

}