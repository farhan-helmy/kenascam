const OFF = 0;
const WARN = 1;
const ERROR = 2;

const MAX_COMPLEXITY = 8;
const MAX_DEPTH = 4;
const MAX_LINES = 500;
const MAX_LINES_PER_FUNCTION = 140;

module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:typescript-sort-keys/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['sort-keys-fix', '@typescript-eslint', 'import', 'typescript-sort-keys', 'sort-destructure-keys'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/consistent-type-imports': ERROR,
    '@typescript-eslint/naming-convention': [
      ERROR,
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        selector: 'variable',
      },
    ],
    '@typescript-eslint/no-shadow': ERROR,
    '@typescript-eslint/prefer-enum-initializers': ERROR,
    'arrow-parens': [ERROR, 'as-needed'],
    'class-methods-use-this': OFF,
    complexity: [ERROR, MAX_COMPLEXITY],
    'consistent-return': ERROR,
    eqeqeq: ERROR,
    'func-call-spacing': OFF,
    'import/extensions': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: true,
      },
    ],
    'import/order': ERROR,
    'import/prefer-default-export': OFF,
    'max-depth': [ERROR, MAX_DEPTH],
    'max-lines': [ERROR, MAX_LINES],
    'max-lines-per-function': [ERROR, {max: MAX_LINES_PER_FUNCTION, skipBlankLines: true, skipComments: true}],
    'no-param-reassign': ERROR,
    'no-plusplus': ERROR,
    'no-spaced-func': ERROR,
    'no-var': ERROR,
    'object-curly-newline': OFF,
    'prefer-const': ERROR,
    'prefer-template': ERROR,
    'quote-props': [ERROR, 'as-needed'],
    quotes: [ERROR, 'single', {'avoidEscape': true}],
    'react-hooks/exhaustive-deps': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react/destructuring-assignment': OFF,
    'react/function-component-definition': OFF,
    'react/jsx-filename-extension': [
      OFF,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-no-bind': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-sort-props': ERROR,
    'react/no-array-index-key': ERROR,
    'react/react-in-jsx-scope': OFF,
    'react/require-default-props': OFF,
    'sort-keys-fix/sort-keys-fix': ERROR,
    'sort-destructure-keys/sort-destructure-keys': ERROR,
  },
  overrides: [
    {
      files: ['**/components/ui/*.tsx'],
      rules: {
        'react/prop-types': [2, {ignore: ['className']}],
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
};
