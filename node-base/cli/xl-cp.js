// 读取 cli 启动参数  process.argv
const fs = require("fs");

function copy(src, dst) {
  try {
    fs.writeFileSync(dst, fs.readFileSync(src)); // <= 2 GB 先写到内存中，再读
    // fs.createReadStream(src).pipe(fs.createWriteStream(dst)); // > 2 GB 流式：边写边读
    // 缓存区：
    console.log("copy success!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

function main(...args) {
  console.log("args", args);
  copy(...args);
}

main(...process.argv.slice(2));

// example
// node xl-cp.js ./log.txt ./log-copy.txt
