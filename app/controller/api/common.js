const { filterQuery } = require("../../utils");
// 防止卡死
const pump = require("mz-modules/pump");
const fs = require("fs");

module.exports = (app) => {
  return class CommonController extends app.Controller {
    // 登陆
    async login() {
      const { ctx } = this;
      const { username, password } = ctx.request.body;
      const userInfo = await ctx.service.admin.getUserInfo(username, password);
      if (userInfo) {
        ctx.session.userInfo = userInfo;
        ctx.body = {
          code: 200,
          result: true,
          msg: "登陆成功",
        };
      } else {
        ctx.body = {
          code: 500,
          result: false,
          msg: "登陆失败，请查看账号密码是否正确",
        };
      }
    }
    // 上传组件
    async uploadImage() {
      const { ctx, app } = this;
      const parts = ctx.multipart({ autoFields: true });
      const files = [];
      // 文件流
      let stream;
      while ((stream = await parts()) != null) {
        if (!stream.filename) {
          break;
        }
        // 上传图片的目录
        const dir = await ctx.service.admin.getUploadFileDirname(stream);
        // 将图片存进库
        const writeStream = fs.createWriteStream(dir.imageUrl);
        // 将缩略图存进内存
        await ctx.service.admin.jimpImg(dir.imageUrl, dir.filename);
        // 结束
        await pump(stream, writeStream);
        files.push({
          image: dir.imageUrl,
          url: `${app.config.uploadUrl.uploadOrgin}${dir.minUrl}`,
          orgin: dir.imageUrl,
          system: dir.systemUrl,
        });
      }
      if (files.length > 0) {
        ctx.body = { code: 200, result: files.length === 1 ? files[0] : files };
      } else {
        ctx.body = { code: 500, msg: "上传失败" };
      }
    }
  };
};
