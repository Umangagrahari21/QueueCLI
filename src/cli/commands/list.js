import { listJobs } from "../../services/listService.js";

export function registerListCommand(program) {
    program
        .command("list")
        .description("List all jobs")
        .action(() => {
            const jobs = listJobs();
            console.table(jobs);
        });
}