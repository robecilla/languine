#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

import { select } from "@clack/prompts";
import chalk from "chalk";
import dedent from "dedent";
import { diff } from "./commands/diff.js";
import { init } from "./commands/init.js";
import { instructions } from "./commands/instructions.js";
import { translate } from "./commands/translate.js";

console.log(
  `
    ██╗      █████╗ ███╗   ██╗ ██████╗ ██╗   ██╗██╗███╗   ██╗███████╗
    ██║     ██╔══██╗████╗  ██║██╔════╝ ██║   ██║██║████╗  ██║██╔════╝
    ██║     ███████║██╔██╗ ██║██║  ███╗██║   ██║██║██║██╗ ██║█████╗  
    ██║     ██╔══██║██║╚██╗██║██║   ██║██║   ██║██║██║╚██╗██║██╔══╝  
    ███████╗██║  ██║██║ ╚████║╚██████╔╝╚██████╔╝██║██║ ╚████║███████╗
    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝
  `,
);

console.log(
  chalk.gray(dedent`
    Automated AI localization for your applications.
    Website: ${chalk.bold("https://languine.ai")}
  `),
);

console.log();

// Parse command line arguments
const command =
  process.argv[2] ||
  (await select({
    message: "What would you like to do?",
    options: [
      { value: "init", label: "Initialize a new Languine configuration" },
      { value: "translate", label: "Translate to target languages" },
      { value: "instructions", label: "Add custom translation instructions" },
      { value: "diff", label: "Check for changes in source locale file" },
    ],
  }));

const targetLocale = process.argv[3];

if (command === "init") {
  init();
} else if (command === "translate") {
  translate(targetLocale);
} else if (command === "instructions") {
  instructions();
} else if (command === "diff") {
  diff();
} else {
  console.log(chalk.bold("\nAvailable commands:"));
  console.log(dedent`
    ${chalk.cyan("init")}          Initialize a new Languine configuration
    ${chalk.cyan("translate")}     Translate to all target locales
    ${chalk.cyan("translate")} ${chalk.gray("<locale>")}    Translate to a specific locale
    ${chalk.cyan("instructions")}  Add custom translation instructions
    
    Run ${chalk.cyan("languine <command>")} to execute a command
  `);
}