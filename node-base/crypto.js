const crypto = require("crypto");

const input = JSON.stringify({ name: "xl", expire_time: new Date().getTime() });

const key = `${new Date().getTime().toString(16)}${Math.floor(
  Math.random() * 100000
)}`;

// 创建 cipher 实例，选择算法为 aes-128-cbc，使用密钥
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-128-cbc", Buffer.from(key), iv);

// 加密输入数据并转换为十六进制的字符串
let encrypted = cipher.update(input, "utf-8", "hex");
encrypted += cipher.final("hex");

console.log("encrypted", encrypted);

// 创建 decipher 实例，选择算法为 aes-128-cbc，使用密钥
const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(key), iv);
// 解密数据
let decrypted = decipher.update(encrypted, "hex", "utf-8");
decrypted += decipher.final("utf-8");

console.log("decrypted", decrypted);
