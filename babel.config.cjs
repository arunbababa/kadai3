module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react", // React用のプリセット
    "@babel/preset-typescript", // TypeScript用のプリセット
  ],
};
