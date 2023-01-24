module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: false,
                    ClassDeclaration: false,
                    ArrowFunctionExpression: false,
                    FunctionExpression: false
                }
            }
        ]
    }
}
