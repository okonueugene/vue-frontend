<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <button
      id="sidebarToggleTop"
      class="btn btn-link d-md-none rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>

    <div style="position: absolute; left: 50%">Library</div>
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
          <img
            class="img-profile rounded-circle"
            src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
          />
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href=""
            data-toggle="modal"
            data-target="#logoutModal"
            @click.prevent="logout"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      error: ""
    };
  },
  methods: {
    async logout() {
      try {
        const ip = window.location.hostname;
        let url = "http://" + ip + ":" + 8000 + "/api/v1/logout";
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );
        console.log(response);

        if (response.status === 200) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      }
    },
    Authenticated() {
      if (!localStorage.getItem("isAuthenticated")) {
        this.$router.push("/");
      }
    }
  },
  //check if user is authenticated
  mounted() {
    this.Authenticated();
  }
};
</script>
