module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'eslint-config-prettier',
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}]
  },
};
