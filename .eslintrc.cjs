module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // disables cross-feature imports:
          // eg. src/features/discussions should not import from src/features/comments, etc.
          {
            target: "./src/features/auth",
            from: "./src/features",
            except: ["./auth"],
          },
        ],
      },
    ],
  },
};
