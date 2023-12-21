<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/views/commons/Header.vue";
import NavBar from "./components/views/commons/NavBar.vue";
import Footer from "./components/views/commons/Footer.vue";
import SideBar from "./components/views/commons/SideBar.vue";
import Pagination from "./components/views/commons/Pagination.vue";

export default {
  name: "App",
  components: {
    Header,
    NavBar,
    Footer,
    SideBar,
    Pagination
  }
};
</script>
