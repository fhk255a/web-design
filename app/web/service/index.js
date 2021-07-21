import axios from "~/utils/axios";

export const getWordList = (params) => {
  return axios.get("/api/word.getWordList", params);
};
export const updateOrAddWord = (params) => {
  return axios.post("/api/word.updateOrAddWord", params);
};
export const changeWordStatus = (params) => {
  return axios.post("/api/word.changeWordStatus", params);
};


export const getTagList = (params) => {
  return axios.get("/api/tag.getTagList", params);
};
export const updateOrAddTag = (params) => {
  return axios.post("/api/tag.updateOrAddTag", params);
};


export const login = (params) => {
  return axios.post("/api/common.login", params);
};