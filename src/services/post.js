import api from "./api";

export const getAllPosts = () => {
  return api.get("post");
};

export const createPost = (data) => {
  return api.post("post", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
