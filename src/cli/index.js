#!/usr/bin/env node

import { Command } from "commander";
import db from "../database/db.js";
import "../database/init.js";

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

program.parse(process.argv);