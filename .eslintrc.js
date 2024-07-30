module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: ['off', 'always'],
    'no-new': 'off',
  },
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    jest: true,
  },
}
