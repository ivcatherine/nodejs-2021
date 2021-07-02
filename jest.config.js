module.exports = {
  testEnvironment: 'node',
    roots: ['<rootDir>'],
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|js)?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)?$',
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
    ],
    globals: {
      'ts-jest': {
        tsConfig: '<rootDir>/tsconfig.jest.json',
      },
    }
};