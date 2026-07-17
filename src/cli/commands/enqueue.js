import { enqueueJob } from "../../services/jobService.js";

export function registerEnqueueCommand(program) {
  program
    .command("enqueue <command>")
    .description("Add a job to the queue")
    .action((command) => {
      const jobId = enqueueJob(command);

      console.log("✅ Job queued successfully!");
      console.log(`Job ID: ${jobId}`);
    });
}