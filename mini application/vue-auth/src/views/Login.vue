<template>
  <div class="login">
    <h1>Authentification simple avec Vue Js et Firebase</h1>
    <h2>Se connecter</h2>
    <form @submit.prevent="Login">
      <input type="text" placeholder="Email" v-model='email'/>
      <input type="password" placeholder="Mot de passe" v-model='password' />
      <input type="submit" value="Se connecter" />
      <p>
        Besoin d'un compte ?
        <router-link to="/register"> Inscription ici</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import firebase from 'firebase';

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(data => console.log(data))
      .catch(err => alert(err.message));
    }

    return {
      Login,
      email,
      password,
    }
  },
};
</script>

<style></style>
