<template>
  <div>
    <h1>Création de profil</h1>
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
      <button type="button" @click="formValidator">Continuer</button>
    </form>
  </div>
</template>

<script>
import { setProfil } from "../services/auth";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      job: "",
      isLastnameValid: true,
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
      if (this.lastname.length > 0) {
        this.isLastnameValid = true;
        this.createProfil();
      } else {
        this.isLastnameValid = false;
      }
    },
  },
};
</script>
