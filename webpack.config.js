module.exports = {
  output: {
    libraryTarget: "commonjs"
  },
  externals: {
    react: "react",
	reactstrap: "reactstrap",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
