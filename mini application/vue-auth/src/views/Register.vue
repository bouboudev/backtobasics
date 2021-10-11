<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Mot de passe" v-model="password" />
      <input type="submit" value="S'inscrire" />
      <p>
        Déjà un compte ?
        <router-link to="/login"> Connectez-vous ici</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(user => {alert(user.name)})
      .catch(err => alert(err.message));
    }
    return {
      Register,
      email,
      password
    }
  },
};
</script>
