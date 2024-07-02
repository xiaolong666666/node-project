const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Express 中间件，实现简单的事务
app.post("/create-user", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 执⾏第⼀个 SQL 语句
    await connection.query("INSERT INTO users (name, email) VALUES (?, ?)", [
      "User 1",
      "user1@example.com",
    ]);

    // 执⾏第⼆个 SQL 语句
    await connection.query(
      "INSERT INTO addresses (user_id, address) VALUES(LAST_INSERT_ID(), ?)",
      ["Address 1"]
    );

    // 如果⼀切正常，提交事务
    await connection.commit();

    res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    // 如果出现错误，回滚事务
    await connection.rollback();

    console.error(error);
    res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  } finally {
    // 释放连接
    connection.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
