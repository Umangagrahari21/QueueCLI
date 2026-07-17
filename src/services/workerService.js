import { exec } from "child_process";

import {
    claimNextJob,
    updateJobState,
    retryJob,
    moveToDead
} from "../models/jobModel.js";

export function processNextJob() {

    // const job = getNextJob();
    const workerId = `worker-${process.pid}`;
    const job = claimNextJob(workerId);

    if (!job) return;

    // updateJobState(job.id, "processing");

    console.log(`Processing ${job.command}`);

    exec(job.command, (error) => {

        if (!error) {

            updateJobState(job.id, "completed");

            console.log("Completed");

            return;
        }

        const attempts = job.attempts + 1;

        if (attempts < job.max_retries) {

            const delay = Math.pow(2, attempts) * 1000;

            const nextRun = new Date(
                Date.now() + delay
            ).toISOString();

            retryJob(
                job.id,
                nextRun,
                error.message
            );

            console.log(
                `Retrying in ${delay / 1000}s`
            );

        } else {

            moveToDead(
                job.id,
                error.message
            );

            console.log("Moved to DLQ");

        }

    });

}