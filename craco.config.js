const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      resolve: {
        alias: {
          'node:buffer': 'buffer',
          // Add other aliases if needed
        },
        fallback: {
          stream: require.resolve('stream-browserify'),
          process: require.resolve('process/browser.js'),
          zlib: require.resolve("browserify-zlib"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer/"),
          asset: require.resolve("assert"),
          "tls": false,
          "crypto": false,
          "https": false,
          "http": false
        },
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ]
    },
  },
};
