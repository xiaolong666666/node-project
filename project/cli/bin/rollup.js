const rollup = require("rollup");
const { devConfig } = require("./rollup.config");

async function devRollup(entry) {
  // 以 rollup.config.js 为打包配置文件运行
  const options = devConfig(entry);
  const bundle = await rollup.rollup(options);
  await bundle.generate(options.output);
  await bundle.write(options.output);
}

module.exports = devRollup;
