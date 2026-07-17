import { getJobById } from "../models/jobModel.js";

export function getJobStatus(id) {
    return getJobById(id);
}