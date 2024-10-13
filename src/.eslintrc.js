module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended'
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    rules: {
      'vue/require-v-for-key': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-parsing-error': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-unused-vars': 'off',
      'no-constant-condition': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/no-use-v-if-with-v-for': 'off',
      'no-dupe-keys': 'off',
      'vue/no-dupe-keys': 'off',
      'vue/no-side-effects-in-computed-properties': 'off',
      'no-empty': 'off'
    }
  };
  