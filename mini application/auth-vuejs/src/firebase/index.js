
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBpoHtp-HWmnKNQbAmwC4SUCd9WsYBzRJ8",
  authDomain: "vue-fire-auth-ea148.firebaseapp.com",
  projectId: "vue-fire-auth-ea148",
  storageBucket: "vue-fire-auth-ea148.appspot.com",
  messagingSenderId: "940777662090",
  appId: "1:940777662090:web:160496075ab56afa84af73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}