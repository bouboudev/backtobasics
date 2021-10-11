<template>
  <div class="home">
    <h1>Bienvenue , {{name}}</h1>
    <router-link to="/about"> à propos</router-link>
    <br>
    <button class="logout" @click="Logout">Se déconnecter</button>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";

export default {
  setup() {
    

    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split('@')[0];
      }
    });

    const Logout = () => {
      firebase
      .auth()
      .signOut()
      .then(()=> console.log("Déconnexion"))
      .catch(err => console.log(err.message))

    }
    return {
      Logout,
      name
    };
  },
};
</script>
