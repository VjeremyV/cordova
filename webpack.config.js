
const options = {
  mode: process.env.NODE_ENV,
  entry: __dirname + "/src/index.ts",
  output: {
    path: __dirname + "/www/js/",
    filename: "App.js",
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ]
      }
    ],
  },
  devServer: {
    open: true,
    watchFiles: ['./src**/*']
  },
  resolve : {
    extensions: ['.js', '.ts']
  }
};

module.exports = options;
