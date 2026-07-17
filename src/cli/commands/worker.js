export function registerWorkerCommand(program) {
    program
        .command("worker")
        .description("Start worker")
        .action(async () => {
            await import("../../workers/worker.js");
        });
}