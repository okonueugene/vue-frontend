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
              <div class="header">User Details</div>
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
                              <th>Email</th>
                              <th>Role</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(user, index) in pagedUsers"
                              :key="user.id"
                            >
                              <td>{{ user.id }}</td>
                              <td>{{ user.name }}</td>
                              <td>{{ user.email }}</td>
                              <td>{{ user.role }}</td>
                              <td>
                                <button
                                  class="btn btn-danger btn-sm"
                                  @click="deleteUser(user.id)"
                                >
                                  Delete
                                </button>
                              </td>
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
  name: "UserDetails",
  data() {
    return {
      name: "",
      email: "",
      role: "",
      error: "",
      errorMessage: "",
      users: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 8,
      api: import.meta.env.VITE_APP_API_URL
    };
  },
  computed: {
    pagedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.users.slice(start, end);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchUsers();
      }
    },

    async fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        let url = `${this.api}/users`;
        console.log("url", url);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.users = response.data.data;
          this.totalPages = Math.ceil(this.users.length / this.pageSize);
        } else {
          this.error = response.data.message;
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteUser(id) {
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);
        let url = `${this.api}/users/${id}`;

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.users = response.data.data;

          this.fetchUsers();
        } else {
          this.error = response.data.message;
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
        this.errorMessage = error.response.data.message;
      }
    },
    displayErrorMessage() {
      if (this.errorMessage) {
        iziToast.error({
          title: "Error",
          message: this.errorMessage,
          position: "topRight",
          timeout: 2000
        });

        // Reset the error message after displaying
        this.errorMessage = "";
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
