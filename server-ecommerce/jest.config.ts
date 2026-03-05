import type { JestConfigWithTsJest } from 'ts-jest';

const defaultEsmPreset = {
    preset: 'ts-jest/presets/default-esm',
};

const jestConfig: JestConfigWithTsJest = {
    ...defaultEsmPreset,
    testEnvironment: 'node',
    testMatch: ['**/src/__tests__/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};

export default jestConfig;
