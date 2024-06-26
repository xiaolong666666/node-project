// 按文本读取，按文件流读取
// 尽量都同步
const { readFileSync, readFile } = require("fs");
const path = require("path");

async function logFile() {
  // 同步
  try {
    const data = readFileSync(path.resolve(__dirname, "log.txt"), {
      encoding: "utf8",
    });
    console.log("data", data);
  } catch (err) {
    console.log("err", err.message);
  }

  // 异步
  readFile(
    path.resolve(__dirname, "log.txt"),
    {
      encoding: "utf8",
    },
    (err, data) => {
      if (err) {
        console.log("err", err.message);
      } else {
        console.log("data", data);
      }
    }
  );
}

logFile();
