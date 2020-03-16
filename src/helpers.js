/**
 * Find title of md file in # or === format
 */
const findTitle = content => {
  const regex = /^#(.*)$|^(.*)\n[=]+/m;
  const match = content.match(regex);

  if (match && (match[1] || match[2])) {
    return (match[1] || match[2]).trim();
  }
};
module.exports.findTitle = findTitle;
/**
 * Generate a md file header
 */
const generateHeader = title => `---
title: ${title}
sidebar_label: ${title}
---`;
module.exports.generateHeader = generateHeader;

/**
 * Replace title with header
 */
const replaceTitleWithHeader = content => {
  const regex = /^#(.*)$|^(.*)\n[=]+/m;
  return content.replace(regex, (_, p1, p2) => {
    if (p1 || p2) {
      return generateHeader((p1 || p2).trim());
    }
  });
};
module.exports.replaceTitleWithHeader = replaceTitleWithHeader;
