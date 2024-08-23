process.on("message", (msg) => {
  console.log("child Received: ", msg);
  process.send("Hello from child!");
});
