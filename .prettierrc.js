module.exports = {
  jsxSingleQuote: true,
  printWidth: 80,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-organize-attributes',
    'prettier-plugin-style-order',
  ],
  organizeImportsSkipDestructiveCodeActions: true,
}
