module.exports = (app) => {
  return class AdminController extends app.Controller {
    async index() {
      const { ctx } = this;
      if (ctx.session.userInfo) {
        await ctx.renderClient("admin/index.js");
      } else {
        await ctx.renderClient("login/index.js", {
          code: 401,
          msg: "登陆状态已失效，请重新登陆",
        });
      }
    }
    async login() {
      const { ctx } = this;
      if (ctx.session.userInfo) {
        await ctx.renderClient("admin/index.js");
      } else {
        await ctx.renderClient("login/index.js");
      }
    }
  };
};
