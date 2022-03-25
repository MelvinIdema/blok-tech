module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: "module"
  },
  ignorePatterns: ['bundle.js'],
  rules: {
    semi: ['error', 'always'],
  },
};
