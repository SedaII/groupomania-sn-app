import api from "./api";

export const signUp = (data) => {
  return api.post("/auth/signup", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const logout = () => {
  return api.get("/auth/logout");
};

export const setProfil = (data) => {
  return api.put("auth/profil", data);
};

export const getProfil = () => {
  return api.get("auth/profil");
};

export const deleteAccount = () => {
  return api.delete("auth/delete-account");
};

export const isConnected = () => {
  return api.get("auth");
};
