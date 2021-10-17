import { initializeApp } from "firebase/app";


const config = {

  apiKey: process.env.CONFIGAPIKEY,
  authDomain: "vue-auth-bk.firebaseapp.com",
  projectId: "vue-auth-bk",
  storageBucket: "vue-auth-bk.appspot.com",
  messagingSenderId: "644122889309",
  appId: "1:644122889309:web:e537c074a37404beb511b4"
    }
  



const db  = initializeApp(config);
export default db;
  