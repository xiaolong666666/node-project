const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// 连接到 MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 定义 MongoDB 模型
const Product = mongoose.model("Product", { name: String, price: Number });

// Express 中间件，实现简单的事务

app.post("/create-product", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };

    // 创建第⼀个产品
    const product1 = await Product.create(
      [{ name: "Product 1", price: 10 }],
      opts
    );

    // 创建第⼆个产品
    const product2 = await Product.create(
      [{ name: "Product 2", price: 20 }],
      opts
    );

    // 如果⼀切正常，提交事务
    await session.commitTransaction();

    // 关闭 session
    session.endSession();

    res.status(200).json({
      message: "Transaction successful",
      products: [product1, product2],
    });
  } catch (error) {
    // 如果出现错误，回滚事务
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
