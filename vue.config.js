module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/library/" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
