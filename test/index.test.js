const fs = require("fs").promises;
const aurelius = require("../src/index");

test("can correctly transform file to md", async () => {
  const origin = await fs.readFile("./test/testfile.js", { encoding: "utf-8" });
  const expected = await fs.readFile("./test/expected.md", {
    encoding: "utf-8",
  });
  expect(aurelius(origin, "javascript")).toEqual(expected);
});
