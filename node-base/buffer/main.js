const { readFile, writeFile, open, read, write, close } = require("fs");
const path = require("path");

const buf1 = Buffer.alloc(5);
const buf2 = Buffer.from("小龙");
const buf3 = Buffer.from([0xe5, 0xb0, 0x8f]);

// console.log("buf1", buf1);
// console.log("buf2", buf2);
// console.log("buf3", buf3.toString());

// readFile(path.resolve(__dirname, "./a.js"), "utf-8", function (err, data) {
//   writeFile(path.resolve(__dirname, "./a_copy.js"), data, function (e) {});
// });

const buf = Buffer.alloc(30);
open(path.resolve(__dirname, "./a.js"), "r", function (err, rfd) {
  read(rfd, buf, 0, 30, 0, function (err, bytesRead) {
    console.log(buf.toString());
    // 0o666 读写权限
    open(
      path.resolve(__dirname, "./a_copy_stream.js"),
      "w",
      0o666,
      function (err, wfd) {
        write(wfd, buf, 0, 30, 0, function (err, bytesWritten) {
          console.log("bytesWritten", bytesWritten);
          close(rfd, function () {});
          close(wfd, function () {});
        });
      }
    );
  });
});
