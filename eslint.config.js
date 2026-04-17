import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { noRelativeParentImports } from "./eslint-rules/no-relative-parent-imports.mjs";

import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  { ignores: ["dist"] },

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin, // ✅ REQUIRED
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports, // ✅ FIXED
      prettier: prettierPlugin,
      import: importPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
      "local-rules": {
        rules: { "no-relative-parent-imports": noRelativeParentImports },
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": "error",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          rootDir: path.resolve(__dirname, "src"),
          prefix: "#",
        },
      ],
      "local-rules/no-relative-parent-imports": [
        "error",
        {
          rootDir: path.resolve(__dirname, "src"),
          prefix: "#",
        },
      ],
    },

    settings: {
      "import/resolver": {
        typescript: {
          paths: true, // respect tsconfig paths like "#"
        },
      },
    },
  },

  prettierConfig,
);
