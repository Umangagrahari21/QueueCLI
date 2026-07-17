import { processNextJob } from "../services/workerService.js";
import {
    registerWorker,
    updateHeartbeat,
    deactivateWorker,
} from "../models/workerModel.js";

const workerId = `worker-${process.pid}`;

registerWorker(workerId);

console.log(`✅ Worker started: ${workerId}`);

const jobInterval = setInterval(() => {
    processNextJob();
}, 1000);

const heartbeatInterval = setInterval(() => {
    updateHeartbeat(workerId);
}, 5000);

function shutdown() {
    console.log("\n🛑 Shutting down worker...");

    clearInterval(jobInterval);
    clearInterval(heartbeatInterval);

    deactivateWorker(workerId);

    console.log("✅ Worker stopped.");

    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);