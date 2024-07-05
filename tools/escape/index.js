const htmlEscape = (htmlStr) =>
  htmlStr.replace(/<|>|"|&/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "&":
        return "&amp;";
      default:
        return match;
    }
  });

const htmlUnEscape = (str) =>
  str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
    switch (match) {
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&quot;":
        return '"';
      case "&amp;":
        return "&";
      default:
        return match;
    }
  });

module.exports = {
  htmlEscape,
  htmlUnEscape,
};
