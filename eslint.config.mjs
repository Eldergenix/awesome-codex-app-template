import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.expo/**",
      "**/coverage/**"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-var": "error",
      "prefer-const": "error"
    }
  }
];
