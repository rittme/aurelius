const parse = require("./parser");
const { findTitle, generateHeader } = require("./helpers.js");

/**
 * Converts the code string to a markdown string
 * @param {string} content
 */
function aurelius(content, codeType) {
  const parsedArray = parse(content, codeType);
  let output = parsedArray.join("\n");

  if (output) {
    const title = findTitle(output);
    if (title) {
      const header = generateHeader(title);
      output = header + output;
    }
  }

  return output;
}

module.exports = aurelius;
