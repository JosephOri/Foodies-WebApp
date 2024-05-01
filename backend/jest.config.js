module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/tests/$1',
    '^@src/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts'],
};
