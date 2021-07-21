const { filterQuery } = require("../../utils");
module.exports = (app) => {
  return class TagController extends app.Controller {
    // 保存创建作品
    async updateOrAddTag() {
      const { ctx } = this;
      const { column } = filterQuery(ctx.request.body, {
        number: ["id"],
        string: ["tag_name"],
      });
      let response = {};
      // 添加
      if (column.id) {
        response = await ctx.service.admin.updateTag(column);
      } else {
        response = await ctx.service.admin.addTag(column);
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
    // 获取标签列表
    async getTagList() {
      const { ctx } = this;
      const { current } = ctx.request.query;
      const params = filterQuery(ctx.request.query, {
        string: ["tag_name"],
      });
      const response = await ctx.service.admin.getTagList(
        current ? params : false
      );
      ctx.body = {
        code: 200,
        result: response,
      };
    }
  };
};
