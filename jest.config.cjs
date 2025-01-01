module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ["dotenv/config"], // dotenv を Jest 起動時に読み込む
};
