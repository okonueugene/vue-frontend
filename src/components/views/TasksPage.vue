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
        href="/dashboard"
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
        <a class="nav-link collapsed" href="#">
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

          <div class="header text-center h3 mb-0 text-gray-800">Tasks</div>
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
                  src="img/undraw_profile.svg"
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
          <div class="task-list">
            <!-- Button to add a new task -->
            <button class="btn btn-primary" @click="showAddTaskModal">
              Add Task
            </button>

            <!-- Modal to add a new task -->
            <div
              class="modal fade"
              id="addTaskModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="addTaskModal"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addTaskModalLabel">
                      Add New Task
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="closeAddTaskModal"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Form to add a new task -->
                    <form>
                      <div class="form-group">
                        <label for="taskName">Task Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="taskName"
                          v-model="newTask.name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="taskDescription">Task Description</label>
                        <textarea
                          class="form-control"
                          id="taskDescription"
                          rows="3"
                          v-model="newTask.description"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="closeAddTaskModal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addTask"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table to show tasks -->
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="tasks.length">
                  <tr v-for="(task, index) in tasks" :key="task.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ task.name }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.assignedTo }}</td>
                    <td>
                      <!-- Button to edit a task -->
                      <button
                        class="btn btn-primary"
                        @click="showEditTaskModal(task)"
                      >
                        Edit
                      </button>

                      <!-- Button to assign a task -->
                      <button
                        class="btn btn-success"
                        @click="showAssignTaskModal(task)"
                      >
                        Assign
                      </button>

                      <!-- Button to delete a task -->
                      <button
                        class="btn btn-danger"
                        @click="deleteTask(task.id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5" class="text-center">No Tasks Added</td>
                  </tr>
                </template>
              </tbody>
            </table>

            <!-- Modal to edit a task -->
            <div
              class="modal fade"
              id="editTaskModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="editTaskModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editTaskModalLabel">
                      Edit Task
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="closeEditTaskModal"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Form to edit a task -->

                    <form>
                      <div class="form-group">
                        <label for="taskName">Task Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="taskName"
                          v-model="newTask.name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="taskDescription">Task Description</label>
                        <textarea
                          class="form-control"
                          id="taskDescription"
                          rows="3"
                          v-model="newTask.description"
                        ></textarea>
                      </div>
                    </form>
                  </div>

                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="closeEditTaskModal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="editTask"
                    >
                      Edit Task
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal to assign a task -->

            <div
              class="modal fade"
              id="assignTaskModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="assignTaskModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="editTaskModalLabel">
                      Assign Task
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="closeAssignTaskModal"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Form to assign a task -->

                    <form>
                      <div class="form-group">
                        <label for="taskName">Task Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="taskName"
                          v-model="newTask.name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="userName">User Name </label>
                        <select
                          class="form-control"
                          id="userName"
                          v-model="newTask.userName"
                        >
                          <option v-for="user in users" :key="user.id">
                            {{ user.name }}
                          </option>
                        </select>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          @click="closeAssignTaskModal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="assignTask"
                        >
                          Assign Task
                        </button>
                      </div>
                    </form>
                  </div>
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
      tasks: [], // array of tasks
      perPage: 10, // number of tasks per page
      currentPage: 1, // current page number
      error: null, // error message
      users: [], // array of users
      newTask: {
        // new task object
        name: "",
        description: "",
        assignedTo: ""
      }
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
    this.fetchUsers();
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "api/task/tasks";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.tasks = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "api/user/getusers";

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
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
    showEditTaskModal(task) {
      this.editTask = { ...task }; // make a copy of the task
      $("#editTaskModal").modal("show"); // show the modal
    },
    showAssignTaskModal() {
      this.newTask = {
        name: "",
        description: "",
        assignedTo: ""
      };
      $("#assignTaskModal").modal("show"); // show the modal
    },
    showAddTaskModal() {
      this.newTask = {
        name: "",
        description: "",
        assignedTo: ""
      };
      $("#addTaskModal").modal("show"); // show the modal
    },
    closeEditTaskModal() {
      $("#editTaskModal").modal("hide"); // hide the modal
    },
    closeAddTaskModal() {
      $("#addTaskModal").modal("hide"); // hide the modal
    },
    closeAssignTaskModal() {
      $("#assignTaskModal").modal("hide"); // hide the modal
    },
    async assignTask() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "/api/tasks";

        const response = await axios.post(
          url,
          {
            name: this.newTask.name,
            description: this.newTask.description,
            assignedTo: this.newTask.assignedTo
          },
          {
            headers: {
              Authorization: `Bearer ${token}` // Set the token in the Authorization header
            }
          }
        );
        this.tasks.push(response.data);
        $("#assignTaskModal").modal("hide"); // hide the modal
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
};
</script>
