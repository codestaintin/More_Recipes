module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/tests/__mocks__/fileMock.js',
    '\\.(scss|css)$': '<rootDir>/client/tests/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: [
    "/build/",
    "client/tests/__mocks__",
    "/sweetalert2/"
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json'
  ],
};