import { getJobStatus } from "../../services/statusService.js";

export function registerStatusCommand(program) {
    program
        .command("status <jobId>")
        .description("Show job details")
        .action((jobId) => {
            const job = getJobStatus(jobId);

            if (!job) {
                console.log("❌ Job not found");
                return;
            }

            console.table([job]);
        });
}