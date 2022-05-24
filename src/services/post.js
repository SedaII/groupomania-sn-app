import api from "./api";

export const getAllPosts = () => {
  return api.get("post");
};

export const getPostById = (id) => {
  return api.get("post/" + id);
};

export const createPost = (data) => {
  return api.post("post", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePost = (id) => {
  return api.delete("post/" + id);
};
