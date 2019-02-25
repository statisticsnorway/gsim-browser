module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      require("@babel/preset-env"),
      require("@babel/preset-react")
    ],
    plugins: [
      [require("@babel/plugin-proposal-class-properties"), { loose: true }],
      [require("@babel/plugin-syntax-jsx")]
    ]
  }
}
