module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '_' }]
    }
}
