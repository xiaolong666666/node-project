const path = require("path");
const { readFileSync } = require("fs");
const { Script } = require("vm");

function my_require(fileName) {
  const filePath = path.resolve(__dirname, fileName);
  // 以字符串形式读取
  const file = readFileSync(filePath, "utf-8");
  // 包裹成一个函数
  const context = `(function(require, module, exports){
    ${file}
  })`;

  const module = {
    exports: {},
  };

  // 让这个字符串以 Js 虚拟机的方式，变成可执行的代码
  const res = new Script(context).runInThisContext();

  // 将参数进行传递
  res(my_require, module, module.exports);

  // 导出 module.exports
  return module.exports;
}

module.exports = my_require;
