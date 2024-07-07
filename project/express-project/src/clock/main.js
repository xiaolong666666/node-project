const fs = require("fs");
const path = require("path");

const regScript = /<script>[\s\S]*<\/script>/;
const regStyle = /<style>[\s\S]*<\/style>/;

const resolveJs = (html) => {
  const js = regScript
    .exec(html)?.[0]
    ?.replace("<script>", "")
    ?.replace("</script>", "");

  fs.writeFile(path.join(__dirname, "/public/index.js"), js, (err) => {
    if (!err) console.log("index.js 写入成功");
  });
};

const resolveCss = (html) => {
  const js = regStyle
    .exec(html)?.[0]
    ?.replace("<style>", "")
    ?.replace("</style>", "");

  fs.writeFile(path.join(__dirname, "/public/index.css"), js, (err) => {
    if (!err) console.log("index.css 写入成功");
  });
};

const resolveHtml = (htmlStr) => {
  const html = htmlStr
    ?.replace(regScript, '<script src="./index.js" defer></script>')
    ?.replace(regStyle, '<link rel="stylesheet" href="./index.css" />');

  fs.writeFile(path.join(__dirname, "/public/index.html"), html, (err) => {
    if (!err) console.log("index.html 写入成功");
  });
};

fs.readFile(path.resolve(__dirname, "./template.html"), "utf8", (err, data) => {
  if (!err) {
    const folderPath = path.resolve(__dirname, "public");
    fs.access(folderPath, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdirSync(path.join(__dirname, "public"), { recursive: true });
      }
      resolveJs(data);
      resolveCss(data);
      resolveHtml(data);
    });
  }
});
