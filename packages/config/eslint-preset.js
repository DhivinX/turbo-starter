module.exports = {
  root: true,

  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'components.d.ts',
    '.nuxt',
    '.turbo',
    '*.min.js',
  ],

  overrides: [
    {
      files: ['*.ts', '.tsx'],

      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],

      env: {
        es6: true,
        browser: true,
        node: true,
      },

      plugins: ['@typescript-eslint', 'prettier'],

      rules: {
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            endOfLine: 'auto',
            printWidth: 100,
          },
        ],

        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-acces': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

        semi: ['error', 'always'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      },
    },

    {
      files: ['*.vue'],

      extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier',
      ],

      plugins: ['prettier'],

      env: {
        'vue/setup-compiler-macros': true,
      },

      rules: {
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            endOfLine: 'auto',
            printWidth: 100,
          },
        ],

        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

        'vue/multi-word-component-names': 'off',

        semi: ['error', 'always'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      },
    },

    {
      files: ['*.js', '*.mjs'],

      plugins: ['prettier'],

      parserOptions: {
        ecmaVersion: 2018,
      },

      env: {
        es6: true,
      },

      rules: {
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            endOfLine: 'auto',
            printWidth: 100,
          },
        ],

        semi: ['error', 'always'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      },
    },
  ],
};
