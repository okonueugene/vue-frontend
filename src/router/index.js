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
import ApprovedLoansPage from "../components/views/modules/ApprovedLoans.vue";
import ReturnedBooksPage from "../components/views/modules/ReturnedBooks.vue";
import PendingLoansPage from "../components/views/modules/PendingLoans.vue";
import RejectedLoansPage from "../components/views/modules/RejectedLoans.vue";
import OverdueLoansPage from "../components/views/modules/OverdueLoans.vue";
import NotFoundPage from "../components/views/commons/NotFound.vue";
import ProfilePage from "../components/views/modules/Profile.vue";
import MyBooksPage from "../components/views/modules/MyBookLoans.vue";

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
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
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
  },

  {
    path: "/approvedloans",
    name: "ApprovedLoansPage",
    component: ApprovedLoansPage,
    // props: (route) => ({ id: parseInt(route.params.id) }),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },

  {
    path: "/returnedbooks",
    name: "ReturnedBooksPage",
    component: ReturnedBooksPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },

  {
    path: "/pendingloans",
    name: "PendingLoansPage",
    component: PendingLoansPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },

  {
    path: "/rejectedloans",
    name: "RejectedLoansPage",
    component: RejectedLoansPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },

  {
    path: "/overdueloans",
    name: "OverdueLoansPage",
    component: OverdueLoansPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated && role == "admin") {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/mybookloans",
    name: "MyBooksPage",
    component: MyBooksPage,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user.role;
      if (isAuthenticated) {
        // Proceed to the route if the user is authenticated
        next();
      } else {
        // Redirect to the login page if the user is not authenticated
        next("/");
      }
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundPage",
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
