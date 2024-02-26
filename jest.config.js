/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 * */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporters",
            {
                pageTitle: "Tianyu Client base Unit Test",
                publicPath: "test/__report__/unit",
                includeFailureMsg: true,
                expand: true,
                filename: "test-report.html",
            },
        ],
    ],
    coverageDirectory: "test/__report__/coverage",
    setupFiles: [],
    resetMocks: true,
    clearMocks: true,
    testTimeout: 1000 * 30,
};
