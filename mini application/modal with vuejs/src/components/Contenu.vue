<template>
  <div class="container my-5">
    <h1> Modale avec Vue JS ! 😊</h1>
    <h3 class="mb-5">(et un peu de Bootstrap...)</h3>
    <h2  class="mb-5">↕</h2>

    <modale :revele="revele" :toggleModale="toggleModale"/>
    <div @click="toggleModale" class="btn btn-dark">Clique...</div>
  </div>
</template>


<script>
import Modale from "./Modale";

export default {
  name: "Contenu",
  data() {
    return {
      revele: false
    };
  },
  components: {
    modale: Modale
  },
  methods: {
    toggleModale: function() {
      this.revele = !this.revele;
    }
  }
};
</script>


<style>
</style>