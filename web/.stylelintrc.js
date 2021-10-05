module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended',
  ],
  plugins: [],
  ignoreFiles: ['**/.vscode/**', '**/.nuxt/**', '**/node_modules/**'],
  plugins: [],
  rules: {
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: '//',
      },
    ],
  },
}
