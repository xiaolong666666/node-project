const path = require("path");
const express = require("express");
const cors = require("cors");
const { mountRequestTime, bodyParser } = require("./middleware");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const app = express();
const corsMiddleware = cors();
// 静态资源服务
const static = express.static(path.resolve(__dirname, "./clock/public"));
const PREFIX = "/api";

app.use(static);

// 配置 jsonp 必须放在 cors 之前
app.get("/api/jsonp", (req, res) => {
  const { callback } = req.query;
  const data = { name: "xl", age: 18 };
  const strWithFun = `${callback}(${JSON.stringify(data)})`;
  console.log({ strWithFun });
  res.send(strWithFun);
});

// 跨域
app.use(corsMiddleware);
// 挂载请求时间
app.use(mountRequestTime);
// 解析 body
app.use(bodyParser);
// 解析 URL 编码的请求体
// app.use(express.urlencoded({ extended: false }));
// 解析 JSON 格式的请求体
// app.use(express.json());

// 路由服务
app.use(`${PREFIX}/user`, userRoutes);
app.use(`${PREFIX}/product`, productRoutes);

app.get("/:type/:clusterId", (req, res) => {
  console.log("req", req.startTime);
  res.send({
    ...req.params,
    ...req.query,
  });
});

app.listen(80, () => {
  console.log("Server is running on http://127.0.0.1");
});
