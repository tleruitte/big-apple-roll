import globals from "globals";
import js from "@eslint/js";
import typescript from "typescript-eslint";
import react from "eslint-plugin-react";

import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  includeIgnoreFile(gitignorePath),
  { ignores: [".yarn"] },
  { settings: { react: { version: "detect" } } },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...typescript.configs.recommended,
  react.configs.flat.recommended,
];
