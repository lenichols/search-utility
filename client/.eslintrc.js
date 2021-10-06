module.exports =  {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    // indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    // 'no-console': 'warn',
    'no-unused-vars': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    // 'no-empty': 'warn',
  }
}