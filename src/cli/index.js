#!/usr/bin/env node

import "../database/init.js";

import { Command } from "commander";
import { registerEnqueueCommand } from "./commands/enqueue.js";
import { registerWorkerCommand } from "./commands/worker.js";

const program = new Command();

program
  .name("queuectl")
  .description("CLI-based Background Job Queue")
  .version("1.0.0");

program
  .command("hello")
  .description("Test CLI")
  .action(() => {
    console.log("QueueCTL is working ✅");
  });

registerEnqueueCommand(program);
registerWorkerCommand(program);

program.parse(process.argv);