import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Utilisateur non trouvé.");
            break;
          case "auth/wrong-password":
            alert("Mot de passe incorrect.");
            break;
          default:
            alert("Quelques choses est incorecte.");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email déjà utilisé");
            break;
          case "auth/invalid-email":
            alert("Email invalide");
            break;
          case "auth/operation-not-allowed":
            alert("Opération non autorisée");
            break;
          case "auth/weak-password":
            alert("Mot de passe faible");
            break;
          default:
            alert("Quelques choses est incorecte");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        // si l'user est egale a null on le deconnecte
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          // si l'utilisateur est connecté l'empecher d'aller dans la page de login
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});
