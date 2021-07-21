const path = require("path");
const fs = require("fs");
module.exports = (app) => {
  const exports = {};

  exports.siteFile = {
    "/favicon.ico": fs.readFileSync(
      path.join(app.baseDir, "app/web/asset/images/favicon.ico")
    ),
  };

  exports.logger = {
    consoleLevel: "DEBUG",
    dir: path.join(app.baseDir, "logs"),
  };
  // 上传地址
  exports.uploadUrl = {
    uploadOrgin:'http://127.0.0.1:7001',
    root: path.join(app.baseDir, "public"),
    image: "/app/public/image/",
    file: "/app/public/file/",
  };
  // 关闭验证
  exports.security = {
    // 关闭csrf验证
    csrf: {
      headerName: "x-csrf-token", // 自定义请求头
    },
    // 白名单
    // domainWhiteList: ['*']
  };
  exports.mysql = {
    client: {
      // host
      host: "localhost",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "88888888",
      // 数据库名
      database: "web_desgin",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  exports.static = {
    prefix: "/public/",
    dir: path.join(app.baseDir, "public"),
  };

  exports.keys = "123456";

  exports.middleware = ["access"];

  exports.reactssr = {
    layout: path.resolve(app.baseDir, "app/web/view/layout.html"),
  };

  return exports;
};
