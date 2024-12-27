#!/usr/bin/env yarn ts-node

import path from "node:path";
import { parseArgs } from "node:util";

import sharp from "sharp";

// Parse arguments
const { values } = parseArgs({
  options: {
    input: {
      type: "string",
    },
  },
});
if (!values.input) {
  throw new Error("Missing input argument");
}

const input = values.input;
const parsedInput = path.parse(input);
const output = path.format({
  ...parsedInput,
  base: undefined,
  name: `${parsedInput.name}-converted`,
  ext: ".png",
});

// Convert image
sharp(input)
  .unflatten()
  .ensureAlpha()
  .toFormat("png")
  .toFile(output)
  .then(() => {
    console.log("Converted", input, "to", output);
  });
