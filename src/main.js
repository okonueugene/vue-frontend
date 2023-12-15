import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";
import NavBarVue from "./components/views/NavBar.vue";
import FooterVue from "./components/views/Footer.vue";
import HeaderVue from "./components/views/Header.vue";
import SideBarVue from "./components/views/SideBar.vue";

const app = createApp(App);

app.use(router);

app.component("nav-bar", NavBarVue);
app.component("footer-view", FooterVue);
app.component("header-view", HeaderVue);
app.component("side-bar", SideBarVue);

app.mount("#app");
