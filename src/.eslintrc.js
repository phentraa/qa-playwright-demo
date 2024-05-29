module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json', // Path to your `tsconfig.json` file
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  };
  