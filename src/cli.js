#!/usr/bin/env node
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const glob = require("glob");
const ora = require("ora");
const argv = require("minimist")(process.argv.slice(2));

const aurelius = require("./index.js");
const spinner = ora().start();

// create output path if it doesn't exist
const out = argv.out;
if (out) {
  const spinner = ora("Creating output folder").start();
  mkdirp.sync(out);
  spinner.stopAndPersist({ symbol: "📂", text: "Creating output folder" });
}

// Get all the files to process from the glob arguments
spinner.start("Listing files to parse");
const filePaths = argv._.reduce((paths, pattern) => {
  return paths.concat(glob.sync(pattern));
}, []);
spinner.stopAndPersist({ symbol: "📥", text: "Listing files to parse" });

filePaths.forEach(filePath => {
  spinner.start(`Processing file ${filePath}`);
  // Find the correct extension for the file (or skip it if it's not a js or ts file)
  let extension = /\.(ts|js|jsx)$/i.exec(filePath);
  if (!extension) {
    return;
  } else {
    if (extension[1] === "js" || extension[1] === "jsx") {
      extension = "javascript";
    } else if (extension[1] === "ts") {
      extension = "typescript";
    } else {
      extension = "";
    }
  }

  // Read the file content, convert to md, output to file output
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const md = aurelius(fileContent, extension);
  const outPath = path.join(
    out || path.parse(filePath).dir,
    path.parse(filePath).name + ".md"
  );
  fs.writeFileSync(outPath, md);
  spinner.stopAndPersist({ symbol: "📄", text: `Processed file ${outPath}` });
});

spinner.succeed("All done!");
