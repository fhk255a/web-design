module.exports = (app) => {
  // 页面
  app.get("/", app.controller.home.home.index);
  app.get("/client", app.controller.home.home.client);
  app.get("/contact", app.controller.home.home.contact);
  app.get(["/admin", "/admin/*"], app.controller.admin.admin.index);
  app.get("/login", app.controller.admin.admin.login);

  // 获取作品列表
  app.get("/api/word.getWordList", app.controller.api.word.getWordList);
  app.post(
    "/api/word.updateOrAddWord",
    app.controller.api.word.updateOrAddWord
  );
  app.post(
    "/api/word.changeWordStatus",
    app.controller.api.word.changeWordStatus
  );
  // 标签
  app.get("/api/tag.getTagList", app.controller.api.tag.getTagList);
  app.post("/api/tag.updateOrAddTag", app.controller.api.tag.updateOrAddTag);
  // 通用
  app.post("/api/common.login", app.controller.api.common.login);
  app.post("/api/common.uploadImage", app.controller.api.common.uploadImage);
};
