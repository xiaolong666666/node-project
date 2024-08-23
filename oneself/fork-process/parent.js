const child_process = require("child_process");

const processMaster = child_process.fork(__dirname + "/child.js");

processMaster.send("Hello from parent!");

processMaster.on("message", (msg) => {
  console.log("Parent received: ", msg);
});
