const net = require("net");

const client = net.createConnection(
  {
    host: "127.0.0.1",
    port: 9999,
  },
  () => {
    setTimeout(() => {
      client.end(); // 主动断开
    }, 5000);
  }
);

client.on("connect", () => {
  client.write("你好，我是 Client!");

  // setTimeout(() => { // TCP 粘包
  //   client.write("你好，我是 Client0!");
  //   client.write("你好，我是 Client1!");
  //   client.write("你好，我是 Client2!");
  //   client.write("你好，我是 Client3!");
  //   client.write("你好，我是 Client4!");
  //   client.write("你好，我是 Client5!");
  //   client.write("你好，我是 Client6!");
  //   client.write("你好，我是 Client7!");
  // }, 1000);
});

client.on("data", (buffer) => {
  console.log(`Client: ${buffer.toString()}`);
});

client.on("close", () => {
  console.log("Client is closed");
});

client.on("error", (err) => {
  console.error("Client error:", err);
});
