const express = require("express");

const router = express.Router();

router.get("/list", (req, res) => {
  const startTime = req.startTime;
  const query = req.query;

  res.send({
    status: 200,
    message: "GET User List Successfully!",
    startTime,
    data: query,
  });
});

router.post("/create", (req, res) => {
  const startTime = req.startTime;
  const body = req.body;

  res.send({
    status: 200,
    message: "Create User Successfully!",
    startTime,
    data: body,
  });
});

// fetch("http:127.0.0.1/api/user/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//   },
//   body: "name=xl&age=18&gender=%E7%94%B7",
// })
//   .then((res) => res.json())
//   .then(console.log);

// fetch("http:127.0.0.1/api/user/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ name: "xl", age: 18, gender: "男" }),
// })
//   .then((res) => res.json())
//   .then(console.log);

module.exports = router;
