const net = require("net");

const server = net.createServer();

server.listen(9999, "127.0.0.1");

server.on("listening", () => {
  console.log("Server is listening on port 9999");
});

server.on("connection", (socket) => {
  socket.on("data", (buffer) => {
    console.log(`Server: ${buffer.toString()}`);

    socket.write("你好 我是 Server!");
  });

  socket.on("close", () => {
    console.log("客户端断开连接");
    // 当客户端断开连接时，服务端也可以选择断开连接
    server.getConnections((err, count) => {
      if (count === 0) server.close();
    });
  });
});

server.on("close", () => {
  console.log("Server is closed");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    // 一对一
    console.log("当前服务已启动！");
    process.exit(1);
  }
  console.error("Server error:", err);
});
