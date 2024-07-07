const express = require("express");

const router = express.Router();

router.get("/list", (req, res) => {
  const startTime = req.startTime;
  const query = req.query;

  res.send({
    status: 200,
    message: "GET Product List Successfully!",
    startTime,
    data: query,
  });
});

module.exports = router;
