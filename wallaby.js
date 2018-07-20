module.exports = function (wallaby) {
    return {
        files: [
            'tsconfig.json',
            'src/**/*.ts',
            'src/**/__mocks__/*.ts',
            '!src/**/__tests__/*.ts',
        ],

        tests: [
            'src/**/__tests__/*.ts',
        ],

        testFramework: 'jest',

        env: {
            type: 'node',
            runner: 'node',
        },
    };
};
