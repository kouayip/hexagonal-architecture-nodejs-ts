module.exports = {
    preset: "ts-jest",
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".*\\.(spec|test)\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "coverage",
    moduleNameMapper: {
        "~/(.*)": "<rootDir>/src/$1",
    },
    testPathIgnorePatterns: [
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
        "<rootDir>/src/__tests__/__mocks__/",
    ],
};
