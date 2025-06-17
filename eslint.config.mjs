import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tsdocPlugin from "eslint-plugin-tsdoc";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslint.configs.recommended,
  globalIgnores(["node_modules", "scripts", "openapi-ts.config.ts"]),
  {
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooksPlugin,
      tsdoc: tsdocPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.eslintRecommended,
      tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // typescript-eslint
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // import
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-cycle": [
        "error",
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],
      // simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // react
      "react/display-name": "off",
      "react/jsx-uses-react": "error",
      "react/no-children-prop": ["error", { allowFunctions: true }],
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      // react-hooks
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",
      // tsdoc
      "tsdoc/syntax": "warn",
      // other
      "no-prototype-builtins": "off",
      // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
      "no-shadow": "off",
      "prefer-const": "warn",
    },
  },
  // Rules for all js/ts files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["React", "^react", "^@?\\w"],
            ["^\\u0000"],
            ["^(router)(/.*|$)(?<!\\.scss)"],
            ["^@(/.*|$)(?<!\\.scss)", "^\\."],
            ["^.+\\.(s?css|png|svg)$"],
          ],
        },
      ],
    },
  },
  // Rules for components
  {
    files: ["**/components/**/*.ts", "**/components/**/*.tsx"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "import/no-default-export": "error",
    },
  },
);
