const fs = require("fs");
const path = require("path");

const res = fs.createReadStream(path.resolve(__dirname, "./a.js"), {
  flags: "r",
  start: 0,
  end: 1000,
  highWaterMark: 20,
  autoClose: true,
  emitClose: true,
});

const arr = [];

// 流读取
res.on("open", function (fd) {
  console.log({ fd });
});

res.on("data", function (data) {
  console.log({ data });
  arr.push(data);
});

res.on("end", function (data) {
  console.log({ end: true });
  console.log("arr", Buffer.concat(arr).toString());
});
