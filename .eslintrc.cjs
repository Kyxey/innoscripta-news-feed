module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "react-hooks", "@tanstack/eslint-plugin-query"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
};
