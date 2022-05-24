<template>
  <div>
    <h1>Login</h1>
    <form class="Form">
      <div class="Form__group">
        <label for="email">email</label>
        <input id="email" type="mail" v-model="email" />
      </div>
      <div class="Form__group">
        <label for="password">Mot de passe</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="button" @click="login">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { login } from "../services/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    login() {
      login({ ...this.form })
        .then(({ data }) => {
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("isAdmin", data.user.isAdmin);
          if (
            data.user.firstname === null &&
            data.user.lastname === null &&
            data.user.job === null
          ) {
            this.$router.replace({ name: "profil" });
          } else {
            this.$router.replace({ name: "home" });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
