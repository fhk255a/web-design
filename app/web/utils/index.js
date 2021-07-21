// 封装获取 cookie 的方法
export const getCookie = (name) => {
  if (typeof window !== "undefined") {
    if (document) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  }
};
