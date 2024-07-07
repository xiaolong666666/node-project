# 安装方式

```
npm install @xlkklt/tools
```

## 导入

```js
const tools = require("@xlkklt/tools");
```

## 格式化时间

```js
tools.format(new Date());
```

## 转义 HTML 中特殊字符

```js
const htmlStr = '<h1 title="title">测试<span>span&nbsp;</span></h1>';
const str = tools.htmlEscape(htmlStr);
```

## 还原 HTML 中特殊字符

```js
tools.htmlUnEscape(str);
```

## 开源协议

ISC
