import api from "./api";

export const getAllPosts = () => {
  return api.get("post");
};
