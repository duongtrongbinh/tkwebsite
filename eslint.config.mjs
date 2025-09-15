// @ts-check
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  // Your custom configs here
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'indent': ['error', 2, { offsetTernaryExpressions: false }],
      'vue/html-indent': ['error', 2],
      'no-undef': 'off',
      'semi': ['error', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    ignores: ['node_modules', '.nuxt'],
  },
];