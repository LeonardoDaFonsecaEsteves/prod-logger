module.exports = async () => {
    return {
        verbose: true,
        collectCoverageFrom: [
            "**/src/**/*.js",
            "**/src/**/*.jsx"
        ],
        moduleDirectories: [
            "node_modules"
        ],
        transform: {
            "^.+\\.[tj]sx?$": "babel-jest"
        },
        globals: {
            "NODE_ENV": "production"
        },
        coverageReporters: [
            "json-summary",
            "text",
            "lcov",
            "cobertura"
        ]
    };
};