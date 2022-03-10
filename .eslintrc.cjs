"use strict"

const generalRules = {
  complexity: "off",
  "func-style": ["error", "expression"],
  "id-length": ["error", { exceptionPatterns: ["^_$"] }],
  "import/no-unused-modules": "off",
  "import/prefer-default-export": "off",
  "max-statements": "off",
  "new-cap": "off",
  "no-console": "off",
  "prettier/prettier": "error",
  "sonarjs/cognitive-complexity": "off",
  "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
}

const typescriptRules = {
  "@typescript-eslint/ban-types": [
    "error",
    {
      types: {
        Function: false,
      },
    },
  ],

  "@typescript-eslint/explicit-member-accessibility": "off",
  "@typescript-eslint/init-declarations": "off",

  "@typescript-eslint/naming-convention": [
    "error",
    {
      format: ["strictCamelCase"],
      leadingUnderscore: "allow",
      selector: "default",
    },
    {
      format: ["strictCamelCase", "StrictPascalCase"],
      selector: "function",
    },
    {
      format: ["StrictPascalCase"],
      selector: ["typeLike", "enumMember"],
    },
    {
      format: ["PascalCase"],
      leadingUnderscore: "allow",
      prefix: ["is", "has", "are", "can", "should", "did", "will"],
      selector: ["variable", "parameter", "property", "accessor"],
      types: ["boolean"],
    },
  ],

  "@typescript-eslint/no-magic-numbers": "off",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_$" }],
  "@typescript-eslint/prefer-readonly-parameter-types": "off",

  "@typescript-eslint/require-array-sort-compare": [
    "error",
    { ignoreStringArrays: true },
  ],

  "etc/no-misused-generics": "off",
  "etc/no-t": "off",
  "typescript-sort-keys/interface": "error",
  "typescript-sort-keys/string-enum": "error",
}

module.exports = {
  env: {
    es2022: true,
    node: true,
  },

  extends: ["hardcore", "prettier"],
  ignorePatterns: ["build", "node_modules"],

  overrides: [
    {
      extends: ["hardcore", "hardcore/ts", "prettier"],
      files: "*.ts",
      parser: "@typescript-eslint/parser",

      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
      },

      rules: { ...generalRules, ...typescriptRules },
    },
    {
      files: [".eslintrc.cjs"],

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
      },

      rules: {
        "import/no-commonjs": "off",

        "putout/putout": [
          "error",
          {
            rules: {
              "convert-commonjs-to-esm": "off",
            },
          },
        ],

        "unicorn/prefer-module": "off",
      },
    },
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["prettier", "sort-keys-fix", "typescript-sort-keys"],
  rules: generalRules,
}
