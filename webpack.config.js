const path = require("path");
module.exports = {
  entry: {
    include: ["app/web/page"],
    exclude: ["app/web/page/[a-z]+/component", "app/web/page/test"],
    loader: {
      client: "app/web/framework/entry/client-loader.js",
      server: "app/web/framework/entry/server-loader.js",
    },
  },
  loaders: {
    scss: true,
    css: true,
  },
  module: {
    rules: [
      {
        scss: true,
      },
    ],
  },
  plugins: [{ imagemini: false }],
  alias: {
    "~": path.join(__dirname, "./app/web"),
  },
};
