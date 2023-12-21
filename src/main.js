import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lodash from "lodash";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBarVue from "./components/views/commons/NavBar.vue";
import FooterVue from "./components/views/commons/Footer.vue";
import HeaderVue from "./components/views/commons/Header.vue";
import SideBarVue from "./components/views/commons/SideBar.vue";
import Pagination from "./components/views/commons/Pagination.vue";

const app = createApp(App);
// Set up Axios interceptors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle 401 error (unauthorized)
      iziToast.error({
        title: "Error",
        message: "You are not authorized to access this resource.",
        position: "topRight"
      });
      router.push({ name: "LoginPage" });
      //clear local storage
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

app.use(router);
app.use(lodash);

app.component("nav-bar", NavBarVue);
app.component("footer-view", FooterVue);
app.component("header-view", HeaderVue);
app.component("side-bar", SideBarVue);
app.component("pagination", Pagination);

app.mount("#app");
