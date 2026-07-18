import { retryJob } from "../../services/requeueService.js";

export function registerRetryCommand(program) {
    program
        .command("retry <jobId>")
        .description("Retry a dead job")
        .action((jobId) => {

            const result = retryJob(jobId);

            if (result.changes === 0) {
                console.log("❌ Job not found.");
                return;
            }

            console.log("✅ Job moved back to pending.");
        });
}