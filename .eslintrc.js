module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'warn', // FIXME: turn this into a warning some day
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-parameter-properties': ['off'],
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '[iI]gnored' }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-await': 'error',
    'array-callback-return': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'no-warning-comments': 'warn',
    'object-shorthand': ['warn', 'always'],
    //"@typescript-eslint/explicit-member-accessibility": ["error"],
    //"@typescript-eslint/interface-name-prefix": ["warn", { "prefixWithI": "always" }],
    curly: 'warn',
    eqeqeq: 'warn',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};