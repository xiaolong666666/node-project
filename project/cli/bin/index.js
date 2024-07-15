#!/usr/bin/env node
const { program } = require("commander");
const devRollup = require("./rollup");
const inquirer = require("inquirer").default;

program
  .version("0.0.1")
  .description("this is xl cli version")
  .command("pack [entry]")
  .description("this is xl cli entry")
  .option("-d --dev", "开发模式")
  .option("-p --prod", "生产模式")
  .action((entry, type) => {
    console.log(`this is xl cli entry: ${entry} ${JSON.stringify(type)}`);
    const { dev, prod } = type;
    if (!(dev | prod)) {
      const promptList = [
        {
          type: "list", // input confrim list checkbox editor
          name: "mode",
          message: "请指定模式: 运行(dev) or 打包(prod)?",
          choices: ["dev", "prod"],
        },
      ];
      inquirer.prompt(promptList).then(({ mode }) => {
        console.log({ mode });
        if (mode === "dev") {
          console.log("dev server");
          devRollup(entry);
        } else if (mode === "prod") {
          console.log("prod server");
        }
      });
    } else {
      dev && console.log("dev server");
      prod && console.log("prod server");
    }
  });

// program 需要去解析[命令行参数]
program.parse(process.argv);
