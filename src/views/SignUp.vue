<template>
  <div>
    <h1>Signup</h1>
    <form class="Form">
      <div class="Form__group">
        <label for="email">email</label>
        <input id="email" type="mail" v-model="email" />
      </div>
      <div v-if="!isEmailValid">
        Veuillez indiquer un email valide. Ex : nom@email.fr
      </div>
      <div class="Form__group">
        <label for="password">Mot de passe</label>
        <input id="password" type="password" v-model="password" />
        <div v-if="!isPasswordValid">
          Veuillez indiquer un mot de passe valide. Il doit faire minimum 8
          caractères, contenir une majuscule et un caractère spécial. Ex :
          @Jaimeb1manger
        </div>
      </div>
      <div class="Form__group">
        <label for="passwordCheck">Confirmer le mot de passe</label>
        <input id="passwordCheck" type="password" v-model="passwordCheck" />
        <div v-if="!isPasswordVerified">
          Les mots de passe ne correspondent pas
        </div>
      </div>
      <button type="button" @click="formValidator">S'inscrire</button>
    </form>
    <router-link to="/login">Se connecter</router-link>
  </div>
</template>

<script>
import isEmailValid from "../utils/isEmailValid";
import isPasswordValid from "../utils/isPasswordValid";
import { signUp, login } from "../services/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordCheck: "",
      isEmailValid: true,
      isPasswordValid: true,
      isPasswordVerified: true,
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
    formValidator() {
      if (
        isEmailValid(this.email) &&
        isPasswordValid(this.password) &&
        this.password === this.passwordCheck
      ) {
        this.isEmailValid =
          this.isPasswordValid =
          this.isPasswordVerified =
            true;
        signUp({ ...this.form })
          .then(() => {
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
          })
          .catch((error) => console.log(error));
      }

      this.isEmailValid = isEmailValid(this.email);
      this.isPasswordValid = isPasswordValid(this.password);
      this.isPasswordVerified = this.password === this.passwordCheck;
    },
  },
};
</script>
