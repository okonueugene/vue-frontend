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

    <div
      style="position: absolute; left: 50%; font-size: 20px; font-style: italic"
    >
      Open-Lib
    </div>
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
          <a class="dropdown-item" href="/profile">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            {{ user.name }}
          </a>

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
      error: "",
      user: {},
      api: import.meta.env.VITE_APP_API_URL,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    async logout() {
      try {
        var url = this.api + "/logout";
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
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
<style scoped>
.topbar {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  transition: all 0.5s ease;
}

.topbar .navbar-nav {
  height: 80px;
  align-items: center;
}

.topbar .navbar-nav .nav-item {
  height: 80px;
}

.topbar .navbar-nav .nav-item .nav-link {
  height: 80px;
  padding: 0 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.5s ease;
}

.topbar .navbar-nav .nav-item .nav-link:hover {
  color: #fff;
}

.topbar .navbar-nav .nav-item .nav-link .img-profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.topbar .navbar-nav .nav-item .nav-link .img-profile:hover {
  opacity: 0.8;
}

.topbar .navbar-nav .nav-item .nav-link .badge-counter {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.1rem 0.35rem;
  border-radius: 50%;
  font-size: 0.75rem;
}
</style>
