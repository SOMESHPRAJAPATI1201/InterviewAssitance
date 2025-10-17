module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:vue/essential'  // if using Vue
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'vue'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off'
  }
};
