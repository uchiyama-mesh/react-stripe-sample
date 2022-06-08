// reference: https://zenn.dev/sh090/scraps/3a6fed549d4716
/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:import/recommended",
    "plugin:import/typescript",
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    // 'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-props-no-spreading': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    'import/prefer-default-export': 'off',
    // 'camelcase': 'off',
    // 'no-console': 'off',
    // 'no-alert': 'off',
    // 'react/prop-types': 'off',
    // 'no-void': [
    //   'error',
    //   {
    //     allowAsStatement: true,
    //   },
    // ],

    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
  }
};

module.exports = config