import { getJobStats } from "../models/jobModel.js";

export function stats() {
    return getJobStats();
}