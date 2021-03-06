/**
 * 表查询(可多表)
 * @param {Object} option
 * @param {String} option.table
 * @param {Array || String} option.column
 * @param {Array} option.where
 * --------------------------------------
 * @param {Object} pageOption
 * @param {Number} pageOption.current
 * @param {Number} pageOption.pageSize
 * --------------------------------------
 * @return {String}
 */
const QUERY_TABLES = (option, pageOption) => {
  let table = [];
  let column = [];
  let where = [];
  let page = "";
  for (let item of option) {
    if (item.hasOwnProperty("table")) {
      table.push(`\`${item.table}\``);
    }
    if (item.hasOwnProperty("column") && item.column) {
      if (Array.isArray(item.column)) {
        for (let col of item.column) {
          column.push(`\`${item.table}\`.${col}`);
        }
      } else {
        column.push(`\`${item.table}\`.${item.column}`);
      }
    }
    if (item.hasOwnProperty("where") && item.where) {
      if (typeof item.where !== "string") {
        for (let whereKey in item.where) {
          where.push(`\`${item.table}\`.${whereKey} = ${item.where[whereKey]}`);
        }
      } else {
        where.push(item.where);
      }
    }
  }
  if (pageOption) {
    const { current = 0, pageSize = 10 } = pageOption;
    page = `LIMIT ${current * pageSize}, ${pageSize}`;
  }
  return `
    SELECT ${column ? column.join(" , ") : "*"} FROM ${table.join(
    " , "
  )} WHERE ${where ? where.join(" AND ") : 1} ${page}
  `;
};

/**
 * 总数查询(可多表)
 * @param {Object} option
 * @param {String} option.table
 * @param {Array} option.where
 * --------------------------------------
 * @param {Object} pageOption
 * @param {Number} pageOption.current
 * @param {Number} pageOption.pageSize
 * --------------------------------------
 * @return {String}
 */
const QUERY_COUNT = (option) => {
  let table = [];
  let where = [];
  for (let item of option) {
    if (item.hasOwnProperty("table")) {
      table.push(`\`${item.table}\``);
    }
    if (item.hasOwnProperty("where") && item.where) {
      if (typeof item.where !== "string") {
        for (let whereKey in item.where) {
          where.push(`\`${item.table}\`.${whereKey} = ${item.where[whereKey]}`);
        }
      } else {
        where.push(item.where);
      }
    }
  }
  return `SELECT COUNT(*) AS total FROM ${table.join(" , ")} WHERE ${
    where ? where.join(" AND ") : 1
  }`;
};

/**
 * 总数查询(可多表)
 * @param {Object} option
 * @param {String} option.table
 * @param {Array} option.where
 * --------------------------------------
 * @param {Object} pageOption
 * @param {Number} pageOption.current
 * @param {Number} pageOption.pageSize
 * --------------------------------------
 * @return {String}
 */
const QUERY_BY_IDS = (table, where, column) => {
  const columns = [];
  if (column) {
    if (Array.isArray(column)) {
      for (let col of column) {
        columns.push(`\`${table}\`.${col}`);
      }
    } else {
      columns.push(`\`${table}\`.${column}`);
    }
  }
  return `
  SELECT ${columns ? columns.join(" , ") : "*"} FROM ${table} WHERE ${
    where ? `id in (${where.join(",")})` : 1
  }`;
};

module.exports = {
  QUERY_TABLES,
  QUERY_COUNT,
  QUERY_BY_IDS,
};
