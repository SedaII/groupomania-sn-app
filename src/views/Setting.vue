<template>
  <div v-if="!isLoading">
    Paramètres
    <form class="Form">
      <div class="Form__group">
        <label for="firstname">Prénom</label>
        <input id="firstname" type="text" v-model="firstname" />
      </div>
      <div class="Form__group">
        <label for="lastname">Nom</label>
        <input id="lastname" type="text" v-model="lastname" />
      </div>
      <div v-if="!isLastnameValid">Veuillez indiquer votre nom.</div>
      <div class="Form__group">
        <label for="job">Métier</label>
        <input id="job" type="text" v-model="job" />
      </div>
      <div v-if="!isJobValid">Veuillez indiquer votre métier.</div>
      <button
        class="Button Button--primary"
        type="button"
        @click="formValidator"
      >
        Sauvegarder votre profil
      </button>
    </form>

    <div class="setting-item">
      <button class="Button Button--primary" type="button" @click="logout">
        Déconnexion
      </button>
    </div>

    <div class="setting-item">
      <button
        class="Button Button--secondary"
        type="button"
        @click="deleteAccount"
      >
        Supprimer mon compte
      </button>
    </div>
  </div>
</template>

<script>
import { setProfil, getProfil, deleteAccount, logout } from "../services/auth";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      job: "",
      isLastnameValid: true,
      isJobValid: true,
      isLoading: false,
    };
  },
  computed: {
    form() {
      return {
        firstname: this.firstname,
        lastname: this.lastname,
        job: this.job,
      };
    },
  },
  methods: {
    createProfil() {
      setProfil({ ...this.form })
        .then(() => {
          this.$router.replace({ name: "home" });
        })
        .catch((error) => console.log(error));
    },
    formValidator() {
      if (this.lastname.length > 0 && this.job.length > 0) {
        this.createProfil();
        this.isLastnameValid = this.isJobValid = true;
      }

      this.isLastnameValid = this.lastname.length > 0;

      this.isJobValid = this.job.length > 0;
    },
    deleteAccount() {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
        deleteAccount()
          .then(() => this.$router.replace({ name: "login" }))
          .catch((error) => console.log(error));
      }
    },
    logout() {
      logout()
        .then(() => this.$router.replace({ name: "login" }))
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.isLoading = true;
    getProfil()
      .then(({ data }) => {
        this.firstname = data.profil.firstname;
        this.lastname = data.profil.lastname;
        this.job = data.profil.job;

        this.isLoading = false;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  margin-top: 1em;
}
</style>
