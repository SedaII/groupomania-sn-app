import api from "./api";

export const createComment = (data) => {
  return api.post("comment", data);
};

export const deleteComment = (id) => {
  return api.delete("comment/" + id);
};
