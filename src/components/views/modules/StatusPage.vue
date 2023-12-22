<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Task <sup>2</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a
        >
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Heading -->
      <div class="sidebar-heading">Modules</div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="/tasks">
          <i class="fas fa-fw fa-cog"></i>
          <span>Tasks</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="/status">
          <i class="fas fa-fw fa-wrench"></i>
          <span>Status</span>
        </a>
      </li>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
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

          <div class="header text-center h3 mb-0 text-gray-800">Dashboard</div>
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
                <span
                  class="mr-2 d-none d-lg-inline text-gray-600 small"
                ></span>
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
                  <i
                    class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                  ></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <h2>Status</h2>
          <hr />
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <button
                    class="btn btn-primary mb-3"
                    @click="showAddStatusModal()"
                  >
                    Add Status
                  </button>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="statusList.length === 0">
                          <td colspan="3" class="text-center">
                            No statuses added yet.
                          </td>
                        </tr>
                        <tr
                          v-else
                          v-for="(status, index) in displayedStatusList"
                          :key="status.id"
                        >
                          <td>
                            {{ (currentPage - 1) * pageSize + index + 1 }}
                          </td>
                          <td>{{ status.name }}</td>
                          <td>
                            <button
                              class="btn btn-danger btn-sm"
                              @click="deleteStatus(status.id)"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                      <ul class="pagination justify-content-center">
                        <li
                          class="page-item"
                          :class="{ disabled: currentPage === 1 }"
                        >
                          <a
                            class="page-link"
                            href="#"
                            aria-label="Previous"
                            @click.prevent="goToPreviousPage()"
                          >
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                          </a>
                        </li>
                        <li
                          v-for="page in totalPages"
                          :key="page"
                          class="page-item"
                          :class="{ active: currentPage === page }"
                        >
                          <a
                            class="page-link"
                            href="#"
                            @click.prevent="goToPage(page)"
                            >{{ page }}</a
                          >
                        </li>
                        <li
                          class="page-item"
                          :class="{ disabled: currentPage === totalPages }"
                        >
                          <a
                            class="page-link"
                            href="#"
                            aria-label="Next"
                            @click.prevent="goToNextPage()"
                          >
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal to add a status -->
          <div class="modal" id="addStatusModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add Status</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="closeAddStatusModal()"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="statusName">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="statusName"
                        v-model="newStatus.name"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="closeAddStatusModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addStatus()"
                  >
                    Add Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Tasks 2023</span>
          </div>
        </div>
      </footer>
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
      statusList: [], // array of statuses
      pageSize: 5, // number of statuses per page
      currentPage: 1, // current page number
      newStatus: { name: "" }, // new status object
      error: null // error message
    };
  },
  computed: {
    displayedStatusList() {
      // return the statuses that should be displayed on the current page
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.statusList.slice(start, end);
    },
    totalPages() {
      // return the total number of pages
      return Math.ceil(this.statusList.length / this.pageSize);
    }
  },
  mounted() {
    this.fetchStatuses();
  },
  methods: {
    async fetchStatuses() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/status`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });

        this.statusList = response.data.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async addStatus() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/status`;

        const response = await axios.post(
          url,
          { name: this.newStatus.name },
          {
            headers: {
              Authorization: `Bearer ${token}` // Set the token in the Authorization header
            }
          }
        );
        this.statusList.push(response.data);
        this.newStatus.name = "";
        $("#addStatusModal").modal("hide");
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteStatus(statusId) {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/status/${statusId}`;

        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.statusList = this.statusList.filter(
          (status) => status.id !== statusId
        );
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/user/logout`;

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
    },
    goToPage(page) {
      this.currentPage = page;
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    showAddStatusModal() {
      $("#addStatusModal").modal("show");
    },
    closeAddStatusModal() {
      $("#addStatusModal").modal("hide");
    }
  }
};
</script>
