<template>
  <div id="app">
  
    <contenu></contenu>
  </div>
</template>

<script>
import Contenu from "./components/Contenu.vue";

export default {
  name: "App",
  components: {
    contenu: Contenu
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
