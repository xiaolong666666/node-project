const { Buffer } = require("buffer");

const buf = Buffer.from("hello world", "utf8");

console.log(buf.toString("ascii"));
console.log(buf.toString("utf8"));
console.log(buf.toString("base64"));
console.log(buf.toString("hex"));
