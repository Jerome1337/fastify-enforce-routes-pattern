import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    'plugins': {
      '@stylistic': stylistic,
    },
    'rules': {
      'quote-props': ['error', 'always'],

      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          'allowExpressions': true,
          'allowTypedFunctionExpressions': true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': [
        'error',
        {
          'code': 120,
          'ignoreTemplateLiterals': true,
        },
      ],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/no-multi-spaces': 'error',
    },
  },
  {
    'files': ['src/__tests__/*.test.ts'],
    'rules': {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    'ignores': ['dist/**', 'node_modules/**', 'coverage/**'],
  },
);
