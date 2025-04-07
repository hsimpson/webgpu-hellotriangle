import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import configPrettier from 'eslint-config-prettier';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  // ...tseslint.config.stylistic,

  { ignores: ['dist/**/*', 'eslint.config.mjs', '.prettierrc.js'] },
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },

  // eslint rules
  {
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-unused-vars': 'off',
      'no-warning-comments': 'warn',
      eqeqeq: 'error',
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },

  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-parameter-properties': ['off'],
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: false, vars: 'all' },
      ],
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },

  // prettier should come last
  configPrettier,
  pluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
