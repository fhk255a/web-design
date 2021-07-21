const fs = require("fs");
// 过滤掉无用的参数
const filterQuery = (target, params = {}) => {
  let query = {
    page: {},
    column: {},
  };
  let { number = [], string = [] } = params;
  if (!number || !Array.isArray(number)) {
    number = [];
  }
  if (!string || !Array.isArray(string)) {
    string = [];
  }
  const page = ["current", "pageSize"];
  for (let key in target) {
    if (target[key]) {
      if (number.indexOf(key) !== -1 && !query.hasOwnProperty(key) && !!target[key]) {
        query.column[key] = Number(target[key]);
      }
      if (page.indexOf(key) !== -1) {
        query.page[key] =
          key === "current"
            ? Number(target[key]) === 0
              ? 0
              : Number(target[key]) - 1
            : Number(target[key]);
      }
      if (string.indexOf(key) !== -1 && !query.hasOwnProperty(key) && !!target[key]) {
        query.column[key] = target[key];
      }
    }
  }
  return query;
};
const mkdir = (dirName) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};
module.exports = {
  filterQuery,
  mkdir,
};
