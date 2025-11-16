<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="height: 100vh;">
      <v-btn color="primary">Hello Vuetify!</v-btn>
    </v-main>
  </v-app>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
