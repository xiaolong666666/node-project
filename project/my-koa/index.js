const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// 中间件
app.use(async (context, next) => {
  console.log("1. Before");
  await next();
  console.log("4. After");
});

app.use(async (context, next) => {
  console.log("2. Inside");
  context.body = "Hello, Koa!";
  await next();
  console.log("3. Inside after");
});

app.use(router.routes());

router.get("/api", async (ctx) => {
  ctx.body = "Welcome to Koa!";
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
