const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

fs.createReadStream(path.resolve(__dirname, "./a.js"))
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(path.resolve(__dirname, "./a_zip.gz")));
