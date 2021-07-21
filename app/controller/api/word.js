const { filterQuery } = require("../../utils");
// 防止卡死
const pump = require("mz-modules/pump");
const fs = require("fs");
module.exports = (app) => {
  return class ApiController extends app.Controller {
    // 获取作品列表
    async getWordList() {
      const { ctx } = this;
      const params = filterQuery(ctx.request.query, {
        string: ["word_name"],
        number: ["status"],
      });
      const response = await ctx.service.admin.getWordList(params);
      ctx.body = {
        code: 200,
        result: response,
      };
    }
    // 保存创建作品
    async updateOrAddWord() {
      const { ctx } = this;
      const tags_id =
        ctx.request.body.tags_id && ctx.request.body.tags_id.join
          ? ctx.request.body.tags_id.join(";")
          : "";
      const data = {
        ...ctx.request.body,
        tags_id,
      };
      const { column } = filterQuery(data, {
        number: ["sort", "status", "id"],
        string: [
          "word_name",
          "word_desc",
          "image_url",
          "tags_id",
          "finish_time",
        ],
      });
      let response = {};
      // 添加
      if (column.id) {
        response = await ctx.service.admin.updateWord(column);
      } else {
        response = await ctx.service.admin.addWord(column);
      }
      if (response && response.affectedRows === 1) {
        ctx.body = {
          code: 200,
          msg: column.id ? "保存成功" : "创建成功",
          result: true,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: column.id ? "保存失败" : "创建失败",
          result: false,
        };
      }
    }
    // 更改状态
    async changeWordStatus() {
      const { ctx } = this;
      const { status, id } = ctx.request.body;
      if (!id) {
        ctx.body = {
          code: 500,
          result: {},
          msg: "id不能为空",
        };
        return;
      }
      const params = {
        status,
        id,
      };
      const response = await ctx.service.admin.updateWord(params);
      if (response && response.affectedRows === 1) {
        ctx.body = {
          code: 200,
          result: true,
          msg: "更改成功",
        };
      } else {
        ctx.body = {
          code: 500,
          result: false,
          msg: "更改失败",
        };
      }
    }
  };
};
