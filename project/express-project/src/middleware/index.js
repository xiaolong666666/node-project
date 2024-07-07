const qs = require("querystring");
const { format } = require("@xlkklt/tools");

const mountRequestTime = (req, res, next) => {
  req.startTime = format(Date.now());
  next();
};

const bodyParser = (req, res, next) => {
  let str = "";
  req.on("data", (chunk) => (str += chunk));
  req.on("end", () => {
    let body;
    try {
      body = JSON.parse(str);
    } catch (e) {
      body = qs.parse(str);
    }
    req.body = body;
    next();
  });
};

module.exports = {
  mountRequestTime,
  bodyParser,
};
