import api from "./api";

export const signUp = (data) => {
  return api.post("/auth/signup", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const setProfil = (data) => {
  return api.put("auth/profil", data);
};
