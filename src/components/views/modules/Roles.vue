<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <side-bar></side-bar>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column flex-grow-1">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav-bar></nav-bar>
        <!-- End of Topbar -->
        <div class="container mt-4 mb-4">
          <div class="row justify-content-center">
            <div class="col-md-6 float-end">
              <div class="input-group mb-3 float-end"></div>
            </div>
          </div>
          <div
            class="container-fluid flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <div class="container text-center">
              <div class="header">Roles</div>
              <br /><br />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="table-responsive">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(role, index) in roles" :key="role.id">
                              <td>{{ role.id }}</td>
                              <td>{{ role.name }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <pagination
                      :totalPages="totalPages"
                      :currentPage="currentPage"
                      @changePage="changePage"
                      @previousPage="previousPage"
                      @nextPage="nextPage"
                    ></pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Roles",
  data() {
    return {
      roles: [],
      api: import.meta.env.VITE_APP_API_URL,
      error: "",
      pageSize: 2, // number of tasks to display per page
      currentPage: 1 // current page number
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.roles.length / this.pageSize);
    },
    pagedRoles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.roles.slice(start, end);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async getRoles() {
      try {
        const token = localStorage.getItem("token");
        let url = `${this.api}/roles`;
        console.log(url);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.roles = response.data.data;
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getRoles();
  }
};
</script>
