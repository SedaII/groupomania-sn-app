<template>
  <div>
    <h1>Connexion</h1>
    <form class="Form">
      <div class="Form__group">
        <label for="email">email</label>
        <input id="email" type="mail" v-model="email" />
      </div>
      <div class="Form__group">
        <label for="password">Mot de passe</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="row">
        <router-link to="/signup" class="link">S'inscrire</router-link>
        <button type="button" class="Button Button--primary" @click="login">
          Se connecter
        </button>
      </div>
      <div v-if="badUser">Nous ne reconnaissons pas vos identifiants</div>
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
      badUser: false,
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
          this.badUser = false;
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
        .catch((error) => {
          this.badUser = true;
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.link {
  color: $color-primary;
  margin-right: 1em;
}

.Form {
  width: 300px;
  max-width: 300px;
}
</style>
