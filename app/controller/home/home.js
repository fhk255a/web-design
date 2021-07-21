module.exports = (app) => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      // const params = {
      //   column: {
      //     status: 1,
      //   },
      //   page: {
      //     current: 1,
      //     pageSize: 10,
      //   },
      // };
      // const response = await ctx.service.admin.getWordList(params);
      // await ctx.render("home/home.js", { wordList: response });
      await ctx.render("home/home.js");
    }

    async client() {
      const { ctx } = this;
      await ctx.renderClient("home/home.js");
    }

    async contact() {
      const { ctx } = this;
      await ctx.render("contact/contact.js");
    }
  };
};
