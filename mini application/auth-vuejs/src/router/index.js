import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { auth } from '../firebase'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      // être authentifié pour acceder à home
      requireAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      // être authentifié pour acceder à home
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// verifier si l'utilisateur est connecté puis l'envoyer à home
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  // verifier si l'utilisateur est connecté sinon l'envoyé à login
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router;
