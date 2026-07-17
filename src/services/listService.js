import { getAllJobs } from "../models/jobModel.js";

export function listJobs() {
    return getAllJobs();
}