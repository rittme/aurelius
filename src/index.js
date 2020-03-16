const parse = require("./parser");
const { replaceTitleWithHeader } = require("./helpers.js");

/**
 * Converts the code string to a markdown string
 * @param {string} content
 */
function aurelius(content, codeType) {
  const parsedArray = parse(content, codeType);
  let output = parsedArray.join("\n");

  return replaceTitleWithHeader(output);
}

module.exports = aurelius;
