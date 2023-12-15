<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/views/Header.vue";
import NavBar from "./components/views/NavBar.vue";
import Footer from "./components/views/Footer.vue";
import SideBar from "./components/views/SideBar.vue";

export default {
  name: "App",
  components: {
    Header,
    NavBar,
    Footer,
    SideBar
  }
};
</script>
