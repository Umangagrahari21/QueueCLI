import { requeueJob } from "../models/jobModel.js";

export function retryJob(jobId) {
    return requeueJob(jobId);
}