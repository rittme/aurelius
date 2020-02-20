# Aurelius

Aurelius is a simple library to convert code with markdown comments to markdown pages.

It's meant to be a helpful tool to convert executable and testable code into documentation pages.
One of the hard parts of mantaining an updated documentation is making sure the code examples still work.
If you write your documentation pages as code, you can execute them to make sure they are always updated.

## Run once

If you want to run **aurelius** from the command line only once, you can do:

```bash
npx aurelius <file paths>
```

## Running from the cli

When you run **aurelius** from the cli, you have two arguments:

- `--out`: path to the folder we will write the markdown files to (if not set, output files will be at the same directory as the input files)
- every other argument will be treated as input file path globs

### Installing

```bash
yarn global add aurelius
```

or

```bash
npm install -g aurelius
```

### Running

Then you can run:

```bash
aurelius --out <output folder> <file paths>
```

For example:

```bash
aurelius --out docs src/**
```

## As a library

You can also install **aurelius** as a dependency and use it directly in your code:

In your command line:

```bash
yarn add aurelius
```

In your code:

```javascript
const aurelius = require('aurelius');

...
const code = await fs.readFile("file.js");
const markdown = aurelius(code, 'javascript');
```
