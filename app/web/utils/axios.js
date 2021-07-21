import axios from "axios";
import qs from "qs";
import { getCookie } from "./index.js";
// 创建axios
const request = axios.create({
  headers: {
    "x-csrf-token": getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
  },
});
// 发送请求
request.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    // 请求拦截: 失败
    console.error("请求失败： ", error);
    return error;
  }
);

// 接受回调
request.interceptors.response.use(
  (response) => {
    // 响应拦截: 成功
    if (response.data.code === 401 || response.data.code === 400) {
      window.location.href = "/logout";
    }
    return response;
  },
  (error) => {
    // 响应拦截: 失败
    return error;
  }
);

const http = {
  get: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        params,
        method: "get",
      })
        .then((res) => {
          if (res && res.data && res.data.code == 200) {
            resolve(res.data);
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post: (url, data) => {
    let config = {
      url: url,
      data,
      method: "post",
    };
    return new Promise((resolve, reject) => {
      request(config)
        .then((res) => {
          if (res && res.data && res.data.code == 200) {
            resolve(res.data);
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default http;
