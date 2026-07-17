import { processNextJob } from "../services/workerService.js";

console.log("Worker started...");

setInterval(() => {
    processNextJob();
}, 1000);