import db from "../database/db.js";

const insertJob = db.prepare(`
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

export function createJob(job) {
  insertJob.run(job);
}