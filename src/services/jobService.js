import { v4 as uuidv4 } from "uuid";
import { createJob } from "../models/jobModel.js";

export function enqueueJob(command) {
  const now = new Date().toISOString();

  const job = {
    id: uuidv4(),
    command,
    state: "pending",
    attempts: 0,
    max_retries: 3,
    available_at: now,
    worker_id: null,
    last_error: null,
    created_at: now,
    updated_at: now,
  };

  createJob(job);

  return job.id;
}