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
          <div
            class="container-fluid flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <div class="container text-center">
              <div class="header">
                Manage users
                <div class="search">
                  <div class="input-group mb-3 float-end">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      v-model="search"
                      @input="applyFilter"
                    />
                    <span class="input-group-text" id="basic-addon2"
                      ><i class="fas fa-search"></i
                    ></span>
                  </div>
                </div>
              </div>
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
                            <tr v-if="users.length === 0">
                              <td colspan="5" class="text-center">
                                No users found
                              </td>
                            </tr>
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

  <div
    class="modal fade"
    id="addUserModal"
    tabindex="-1"
    aria-labelledby="addUserModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                v-model="formData.name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                class="form-control"
                v-model="formData.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                v-model="formData.password"
              />
            </div>
            <div class="form-group">
              <label for="password_confirmation">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                class="form-control"
                v-model="formData.password_confirmation"
              />
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <select
                v-model="formData.role"
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Role</option>
                <option
                  v-for="(role, index) in roles"
                  :key="role.id"
                  :value="role.id"
                >
                  {{ role.name }}
                </option>
              </select>
              <div class="error">
                <span class="text-danger text-center" v-if="error">{{
                  error
                }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer-view></footer-view>
</template>
<script>
import axios from "axios";

export default {
  name: "UserDetails",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
      },
      roles: [],
      error: "",
      search: "",
      filteredUsers: [],
      errorMessage: "",
      users: [],
      currentPage: 1,
      pageSize: 8,
      api: import.meta.env.VITE_APP_API_URL
    };
  },
  computed: {
    pagedUsers() {
      if (this.filteredUsers.length > 0) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredUsers.slice(start, end);
      } else {
        return [];
      }
    },
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
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
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.users = response.data.data;
          this.applyFilter();
        } else {
          this.error = response.data.message;
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
        this.errorMessage = error.response.data.message;
      }
    },
    async deleteUser(id) {
      try {
        const token = localStorage.getItem("token");
        let url = `${this.api}/users/${id}`;

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          // Remove the deleted user from the users array
          this.users = this.users.filter((user) => user.id !== id);

          // Display success message
          iziToast.success({
            title: "Success",
            message: response.data.message,
            position: "topRight",
            timeout: 2000
          });
        } else {
          this.error = response.data.message;
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.error = error.response.data.message;
        this.errorMessage = error.response.data.message;
      }
    },

    async onSubmit() {
      try {
        const token = localStorage.getItem("token");
        let url = `${this.api}/users`;
        const response = await axios.post(url, this.formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 201) {
          //reset the form
          this.formData = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: ""
          };
          //close modal
          $("#addUserModal").modal("hide");
          // Fetch users again to refresh the list
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

    async fetchRoles() {
      try {
        const token = localStorage.getItem("token");
        let url = `${this.api}/roles`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.roles = response.data.data;
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
    },
    applyFilter() {
      this.filteredUsers = this.users.filter((user) => {
        const searchTerm = this.search.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchRoles();
  }
};
</script>
<style scoped>
.header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.error {
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  width: fit-content;
  flex-direction: column;
}

.error span {
  color: red;
}

.error p {
  color: red;
}
.add-user {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row-reverse;
}
.action {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.search {
  position: relative;
  left: 70%;
  width: 30%;
}
</style>
