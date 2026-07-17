import { stats } from "../../services/statsService.js";

export function registerStatsCommand(program) {
    program
        .command("stats")
        .description("Show queue statistics")
        .action(() => {

            const s = stats();

            console.log("\n📊 Queue Statistics");
            console.log("==========================");
            console.log(`Pending     : ${s.pending}`);
            console.log(`Processing  : ${s.processing}`);
            console.log(`Completed   : ${s.completed}`);
            console.log(`Dead        : ${s.dead}`);
            console.log("--------------------------");
            console.log(`Total Jobs  : ${s.total}`);
        });
}