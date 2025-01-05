import path from "node:path";
import { fileURLToPath } from "node:url";

import globals from "globals";
import js from "@eslint/js";
import typescript from "typescript-eslint";
import react from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImportX from "eslint-plugin-import-x";
import { includeIgnoreFile } from "@eslint/compat";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default typescript.config(
  js.configs.recommended,
  typescript.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  react.configs.flat.recommended,
  eslintConfigPrettier,
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "default-case": "error",
      "no-console": "warn",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'SwitchStatement > SwitchCase[test=null] > BlockStatement:first-child > :first-child:not(ExpressionStatement[expression.callee.name="assertNever"])',
          message:
            "`assertNever` should be the first statement of a switch default case - or disable rule if all cases cannot be enumerated",
        },
      ],
      "no-unused-vars": "off",
      "no-useless-rename": "error",
      "object-shorthand": "error",
      "unicorn/no-unnecessary-await": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-string-raw": "error",
      "unicorn/switch-case-braces": "error",
      ...reactHooksPlugin.configs.recommended.rules,
      "import-x/no-dynamic-require": "warn",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/order": [
        "warn",
        {
          "newlines-between": "always",
        },
      ],
    },
    settings: {
      "import/resolver-next": [createTypeScriptImportResolver()],
      react: {
        version: "detect",
      },
    },
  },
);
