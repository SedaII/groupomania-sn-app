<template>
  <div id="app">
    <nav
      v-if="
        $route.name !== 'login' &&
        $route.name !== 'signup' &&
        $route.name !== 'profil'
      "
    >
      <div v-if="$route.name !== 'home'">
        <router-link to="/home">Accueil</router-link> |
      </div>
      <router-link to="/setting">Paramètres</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
nav {
  display: flex;
  padding: 30px;
  justify-content: flex-end;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
