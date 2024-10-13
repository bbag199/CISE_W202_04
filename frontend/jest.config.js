module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest', // Transform TypeScript and JSX
    },
    testMatch: ['**/__tests__/**/*.(test|spec).(js|ts|jsx|tsx)'],
  };
  