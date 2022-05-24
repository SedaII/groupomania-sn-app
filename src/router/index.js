import Vue from "vue";
import VueRouter from "vue-router";
import { isConnected } from "../services/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/profil",
    name: "profil",
    component: () => import("@/views/Profil.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("@/views/Post.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/Setting.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  isConnected()
    .then(() => {
      console.log("oui");
      next();
    })
    .catch(() => {
      if (to.name !== "login" && to.name !== "signup") {
        next({ name: "login" });
      } else {
        next();
      }
    });
});

export default router;
