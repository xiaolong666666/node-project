// 推送信息到前端
// 利用 openSSL 生成密钥
// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
// -keyout localhost-privkey.pem -out localhost-cert.pem

const http2 = require("http2");
const fs = require("fs");
const PORT = 8443;

// 证书 & 私钥
const cert = fs.readFileSync("localhost-cert.pem");
const key = fs.readFileSync("localhost-privkey.pem");

// 创建服务器
const server = http2.createSecureServer(
  {
    cert,
    key,
  },
  onRequest
);

server.listen(PORT, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`server listening on ${PORT}`);
});

function onRequest(req, res) {
  const reqPath = req.url === "/" ? "/index.html" : req.url;
  console.log("请求流 Id：", req.stream.id);
  console.log("响应流 Id：", res.stream.id);

  if (reqPath === "/index.html") {
    // 推送 1.js
    res.stream.pushStream({ ":path": "/1.js" }, (err, pushStream, headers) => {
      if (err) {
        return console.error(err.message);
      }
      pushStream.respond({ ":status": 200, "content-type": "text/javascript" });
      console.log("pushStream", pushStream.id);
      pushStream.end("console.log(1)");
    });
    // 推送 2.js
    res.stream.pushStream({ ":path": "/2.js" }, (err, pushStream, headers) => {
      if (err) {
        return console.error(err.message);
      }
      pushStream.respond({ ":status": 200, "content-type": "text/javascript" });
      console.log("pushStream", pushStream.id);
      pushStream.end("console.log(2)");
    });
    const fd = fs.openSync("./index.html", "r");
    const stat = fs.fstatSync(fd);
    const headers = {
      "content-length": stat.size,
      "last-modified": stat.mtime.toUTCString(),
      "content-type": "text/html",
    };
    res.stream.respondWithFD(fd, headers);
  } else {
    res.end("404");
  }
}
