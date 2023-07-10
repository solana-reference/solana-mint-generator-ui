'use strict'

module.exports = {
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['*.js'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Enforce that private members are prefixed with an underscore
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
  },
}
