import Loadable from "react-loadable";
import React from "react";

let routeConfig = [
  {
    path: "/admin",
    component: () => import("~/page/admin/wordList"),
  },
  {
    path: "/admin/wordList",
    component: () => import("~/page/admin/wordList"),
  },
  {
    path: "/admin/tagList",
    component: () => import("~/page/admin/tagList"),
  },
];

let routerList = routeConfig.map((item) => {
  return {
    ...item,
    exact: true,
    component: Loadable({
      loader: item.component,
      loading: () => <div>loading...</div>,
    }),
  };
});

routerList.push({
  path: "*",
  component: "",
  redirect: "/admin",
});

export default routerList;
