module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  testRegex: '/client/tests/.*.js$',
  coveragePathIgnorePatterns: [
    "client/src/build",
    "client/src/utils",
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/tests/__mocks__/fileMock.js',
    '\\.(scss|css)$': '<rootDir>/client/tests/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: [
    "client/tests/__mocks__",
    "client/tests/e2e/",
    "/server/",
    "client/tests/setup.js"
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
};