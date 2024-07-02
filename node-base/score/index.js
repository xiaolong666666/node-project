const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./files/成绩.txt"), "utf8", (err, data) => {
  if (!err) {
    const newString = data
      .split(" ")
      .map((item) => item.replace("=", ": "))
      .sort((a, b) => b.split(": ")[1] - a.split(": ")[1])
      .join("\r\n");
    fs.writeFile(
      path.join(__dirname, "./files/成绩-ok.txt"),
      newString,
      (e, d) => {
        if (!e) console.log("成绩写入成功");
        else console.log(e.message);
      }
    );
  }
});

// example
// node index.js
