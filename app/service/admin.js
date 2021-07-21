const { QUERY_TABLES, QUERY_COUNT, QUERY_BY_IDS } = require("../utils/sql");
const path = require("path");
const { mkdir } = require("../utils");
const SD = require("silly-datetime");
const Jimp = require("jimp");

module.exports = (app) => {
  return class AdminService extends app.Service {
    // 获取作品列表
    async getWordList(config = {}) {
      const { page = {}, column = {} } = config;
      const { pageSize = 10, current = 1 } = page;
      const result = await app.mysql.select("word_list", {
        where: column, // WHERE 条件
        orders: [["sort", "desc"]], // 排序方式
        limit: pageSize,
        offset: current * pageSize, // 数据偏移量
      });
      const total = await app.mysql.count("word_list", column);

      return {
        list: result.map((item) => {
          item.tags_id = item.tags_id
            ? item.tags_id.split(";").map((it) => Number(it))
            : [];
          item.status = item.status === 1;
          return item;
        }),
        pagination: {
          total: total || 0,
          current: current + 1,
          pageSize,
        },
      };
    }
    // 获取标签列表
    async getTagList(config) {
      if (config) {
        const { page = {}, column = {} } = config;
        const { pageSize = 10, current = 1 } = page;
        const result = await app.mysql.select("tag_list", {
          where: column, // WHERE 条件
          limit: pageSize,
          offset: current * pageSize, // 数据偏移量
        });
        console.log("conf----", config);
        const total = await app.mysql.count("tag_list", column);
        return {
          list: result,
          pagination: {
            total: total || 0,
            current: current + 1,
            pageSize,
          },
        };
      } else {
        const result = await app.mysql.select("tag_list");
        return result;
      }
    }
    // 修改作品
    async updateWord(column) {
      if (column) {
        return await app.mysql.update("word_list", column);
      }
    }
    // 添加作品
    async addWord(column) {
      delete column.id;
      return await app.mysql.insert("word_list", column);
    }
    // 修改作品
    async updateTag(column) {
      if (column) {
        return await app.mysql.update("tag_list", column);
      }
    }
    // 添加作品
    async addTag(column) {
      delete column.id;
      return await app.mysql.insert("tag_list", column);
    }
    // 生成缩略图方法
    async jimpImg(target, filename) {
      Jimp.read(target, (err, lenna) => {
        if (err) throw err;
        // 生成200乘以200大小，品质为90，并重命名文件
        lenna
          .resize(100, 100)
          .quality(90)
          .write(filename + "_100x100" + path.extname(target));
      });
    }
    // 获取用户信息
    async getUserInfo(username, password) {
      return await app.mysql.get("user_list", { username, password });
    }
    // 获取上传的文件夹名称
    async getUploadFileDirname(stream) {
      const { app } = this;
      // 获取当前日期
      const now = SD.format(new Date(), "YYYYMMDD");
      // 创建文件目录（将存放地址与日期进行拼接）;
      const dir = path.join(app.config.uploadUrl.root, now);
      // 文件名
      const filename =
        new Date().getTime() + Math.random().toString(36).substr(4);
      // 按dir去创建文件夹，如果没有则生成，如果有则忽略
      await mkdir(dir);
      // 图片的保存路径(文件夹 + 时间戳 + 后辍名)
      const imageUrl = path.join(dir, filename + path.extname(stream.filename));

      // 返回到img.fhk255.cn目录
      const resultPath = path.join(__dirname, "../../../../../");
      console.log("resultPath======", resultPath);
      console.log("__dirname======", __dirname);
      // //最终要保存到的文件夹目录
      // dir = resultPath+'img.fhk255.cn/'+dirD;

      const minUrl = path.join(
        dir,
        filename + "_100x100" + path.extname(stream.filename)
      );
      return {
        // 缩略图
        minUrl,
        // 上传地址
        imageUrl,
        // 图片名称
        filename: path.join(dir, filename),
        // 数据库地址
        systemUrl: imageUrl.slice(3).replace(/\\/g, "/"),
      };
    }
  };
};
