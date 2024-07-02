// 创建用于加密的类 CryptoBlock
const crypto = require("crypto");

class CryptoBlock {
  constructor(index, timestamp, data, previousHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    // 将对象转换为字符串
    const objectString =
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data);
    // 创建 SHA-256 加密器
    const sha256 = crypto.createHash("sha256");
    // 更新加密器的数据
    sha256.update(objectString, "utf-8");
    // 计算摘要
    return sha256.digest("hex");
  }

  // 工作量证明，确保每个区块的哈希值都以难度等级（difficuly）中设定的零的数目开始，这需要大量的计算能力。
  // 难度越高，挖掘新区块所需的时间久越长。
  proofofWork(difficuly) {
    while (
      this.hash.substring(0, difficuly) !== Array(difficuly + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

// 块建立完成之后建立链 CryptoChain
class CryptoChain {
  constructor() {
    this.chain = [this.startGenesisBlock()];
    this.difficuly = 10;
  }

  startGenesisBlock() {
    return new CryptoBlock(0, Date.now(), "Initial Genesis Block", "0");
  }

  obtainLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    // 此处应加入交易合法性逻辑，此处做简单模拟
    newBlock.previousHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    newBlock.proofofWork(this.difficuly);
    this.chain.push(newBlock);
  }

  // 验证区块链
  checkChainValidity() {
    for (let i = 0; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log("Current Hash not equal to calculated hash.");
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log("Previous Hash not equal to expected value.");
        return false;
      }
    }
    return true;
  }
}

const myCoin = new CryptoChain();
console.log("myCoin mining in progress...");

myCoin.addNewBlock(
  new CryptoBlock(1, Date.now(), { transaction: "Send 1 BTC to John Doe" })
);

myCoin.addNewBlock(
  new CryptoBlock(2, Date.now(), { transaction: "Send 2 BTC to John Doe" })
);

console.log(JSON.stringify(myCoin, null, 4));
