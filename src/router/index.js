import { createRouter, createWebHistory } from "vue-router";

import RegisterPage from "../components/views/RegisterPage.vue";
import LoginPage from "../components/views/LoginPage.vue";
import DashboardPage from "../components/views/DashboardPage.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      if (isAuthenticated) {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
