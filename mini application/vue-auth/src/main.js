import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAujxr-br7liLuVsLm1x_EaGxhwyOV1aVw",
  authDomain: "vue-auth-bk.firebaseapp.com",
  projectId: "vue-auth-bk",
  storageBucket: "vue-auth-bk.appspot.com",
  messagingSenderId: "644122889309",
  appId: "1:644122889309:web:e537c074a37404beb511b4",
};

firebase.initializeApp(config);

createApp(App)
  .use(router)
  .mount("#app");
