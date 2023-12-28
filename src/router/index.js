import { createRouter, createWebHistory } from "vue-router";

import RegisterPage from "../components/views/auth/RegisterPage.vue";
import LoginPage from "../components/views/auth/LoginPage.vue";
import DashboardPage from "../components/views/modules/DashboardPage.vue";
import CategoriesPage from "../components/views/modules/Categories.vue";
import SubCategoriesPage from "../components/views/modules/SubCategories.vue";
import BooksPage from "../components/views/modules/Books.vue";
import BookDetailsPage from "../components/views/modules/BookDetails.vue";
import LoanBookPage from "../components/views/modules/LoanBooks.vue";
import UserDetailsPage from "../components/views/modules/UserDetails.vue";
import RolesPage from "../components/views/modules/Roles.vue";
import PermissionsPage from "../components/views/modules/Permissions.vue";

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
    path: "/userdetails",
    name: "UserDetailsPage",
    component: UserDetailsPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/roles",
    name: "RolesPage",
    component: RolesPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/permissions",
    name: "PermissionsPage",
    component: PermissionsPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },

  {
    path: "/categories",
    name: "CategoriesPage",
    component: CategoriesPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/subcategories",
    name: "SubCategoriesPage",
    component: SubCategoriesPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/books",
    name: "BooksPage",
    component: BooksPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/books/:id",
    name: "BookDetailsPage",
    component: BookDetailsPage,
    props: (route) => ({ id: parseInt(route.params.id) }),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/loanbooks",
    name: "LoanBookPage",
    component: LoanBookPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;

      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else if (isAuthenticated && role == "user") {
        // Proceed to the route if the user is authenticated
        next("/dashboard");
        //izitoast
        iziToast.error({
          title: "Error",
          message: "You are not authorized to access this resource.",
          position: "topRight"
        });
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
