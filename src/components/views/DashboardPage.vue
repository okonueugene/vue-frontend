<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <side-bar></side-bar>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav-bar></nav-bar>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header text-center">
                  Welcome To Free Online Library
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer-view></footer-view>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [], // array of tasks
      perPage: 10, // number of tasks per page
      currentPage: 1, // current page number
      error: null // error message
    };
  },
  computed: {
    totalRows() {
      return this.tasks.length;
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tasks.slice(start, end);
    }
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "/api/user-tasks";

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.tasks = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;

        const url = `http://${ip}:8000/api/v1/logout`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.removeItem("token");

        if (response.status === 200) {
          window.location.href = "/";
        } else {
          console.error(`Logout failed with status code ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to logout:", error.message);
      }
    }
  }
};
</script>
