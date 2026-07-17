import { getAllWorkers } from "../models/workerModel.js";

export function listWorkers() {
    return getAllWorkers();
}