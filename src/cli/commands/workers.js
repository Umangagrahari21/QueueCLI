import { listWorkers } from "../../services/workerInfoService.js";

export function registerWorkersCommand(program) {
    program
        .command("workers")
        .description("List all registered workers")
        .action(() => {
            const workers = listWorkers();

            if (workers.length === 0) {
                console.log("No workers registered.");
                return;
            }

            console.table(workers);
        });
}