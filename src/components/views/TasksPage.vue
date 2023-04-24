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
                      <div class="form-group">
                        <label for="status">Status</label>
                        <select
                          class="form-control"
                          id="status"
                          v-model="newTask.status_id"
                        >
                          <option
                            v-for="status in statuses"
                            :key="status.id"
                            :value="status.id"
                          >
                            {{ status.name }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="assignedTo">Due Date</label>
                        <input
                          type="date"
                          class="form-control"
                          id="dueDate"
                          v-model="newTask.due_date"
                        />
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
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="pagedTasks.length">
                  <tr v-for="(task, index) in pagedTasks" :key="task.id">
                    <th scope="row">
                      {{ (currentPage - 1) * pageSize + index + 1 }}
                    </th>
                    <td>{{ task.name }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.status.name }}</td>
                    <td>{{ task.due_date }}</td>
                    <td>
                      <button
                        class="btn btn-info"
                        @click="showEditTaskModal(task)"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-success"
                        @click="showAssignTaskModal(task)"
                      >
                        Assign
                      </button>
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
            <div class="modal" id="editTaskModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Edit Task</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      @click="closeEditTaskModal"
                    >
                      &times;
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="editTaskById">
                      <div class="form-group">
                        <label for="edit-task-name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="edit-task-name"
                          v-model="editedTask.name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="edit-task-description">Description</label>
                        <textarea
                          class="form-control"
                          id="edit-task-description"
                          v-model="editedTask.description"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="edit-task-due-date">Due Date</label>
                        <input
                          type="date"
                          class="form-control"
                          id="edit-task-due-date"
                          v-model="editedTask.due_date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="edit-task-status">Status</label>
                        <select
                          class="form-control"
                          id="edit-task-status"
                          v-model="editedTask.status"
                        >
                          <option
                            v-for="status in statuses"
                            :key="status.id"
                            :value="status.id"
                          >
                            {{ status.name }}
                          </option>
                        </select>
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        @click="editTaskById(id)"
                      >
                        Edit
                      </button>
                    </form>
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
                        <select
                          class="form-control"
                          id="taskName"
                          v-model="newTask.task_id"
                        >
                          <option
                            v-for="task in tasks"
                            :key="task.id"
                            :value="task.id"
                          >
                            {{ task.name }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="userName">User Name </label>
                        <select
                          class="form-control"
                          id="userName"
                          v-model="newTask.user_id"
                        >
                          <option
                            v-for="user in users"
                            :key="user.id"
                            :value="user.id"
                          >
                            {{ user.name }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="status">Status</label>
                        <select
                          class="form-control"
                          id="status"
                          v-model="newTask.status_id"
                        >
                          <option
                            v-for="status in statuses"
                            :key="status.id"
                            :value="status.id"
                          >
                            {{ status.name }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="dueDate">Due Date</label>
                        <input
                          type="date"
                          class="form-control"
                          id="dueDate"
                          v-model="newTask.due_date"
                        />
                      </div>
                      <div class="form-group">
                        <label for="startTime">Start Time</label>
                        <input
                          type="time"
                          class="form-control"
                          id="startTime"
                          v-model="newTask.start_time"
                        />
                      </div>
                      <div class="form-group">
                        <label for="endTime">End Time</label>
                        <input
                          type="time"
                          class="form-control"
                          id="endTime"
                          v-model="newTask.end_time"
                        />
                      </div>
                      <div class="form-group">
                        <label for="remarks">Remarks</label>
                        <textarea
                          class="form-control"
                          id="remarks"
                          rows="3"
                          v-model="newTask.remarks"
                        ></textarea>
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
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="previousPage()"
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
                  @click.prevent="changePage(page)"
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
                  @click.prevent="nextPage()"
                  ><span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span></a
                >
              </li>
            </ul>
          </nav>
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
      pageSize: 10, // number of tasks to display per page
      currentPage: 1, // current page number
      error: null, // error message
      users: [], // array of users
      statuses: [], // array of statuses
      newTask: {
        // new task object
        name: "",
        description: "",
        assignedTo: ""
      },
      editedTask: {
        // task being edited
        id: "",
        name: "",
        description: "",
        due_date: "",
        status: ""
      },
      selectedStatus: "", // selected status for filtering tasks
      selectedTask: {
        name: "",
        description: "",
        status_id: "",
        due_date: ""
      }
    };
  },
  computed: {
    pagedTasks() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.tasks.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.tasks.length / this.pageSize);
    }
  },
  mounted() {
    this.fetchTasks();
    this.fetchUsers();
    this.fetchStatuses();
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
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "/api/tasks";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.tasks = response.data.data;
        console.log(response.data.data[0]);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async addTask() {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/tasks`;
        const response = await axios.post(url, this.newTask, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tasks.push(response.data);
        this.newTask = {
          name: "",
          description: ""
        };
        location.reload();
        $("#addTaskModal").modal("hide");
      } catch (error) {
        console.error("Failed to add task:", error.message);
        console.error(error.response.data);
      }
    },
    async editTaskById(id) {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/tasks/${id}`;
        const response = await axios.put(url, this.editedTask, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Find the index of the task being edited
        const index = this.tasks.findIndex((task) => task.id === id);

        // Update the task at the found index with the updated task
        this.tasks.splice(index, 1, response.data);

        // Reset the editedTask data property
        this.editedTask = {
          name: "",
          description: "",
          assignedTo: "",
          status: ""
        };

        $("#editTaskModal").modal("hide");
      } catch (error) {
        console.error("Failed to edit task:", error.message);
        console.error(error.response.data);
      }
    },

    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = `http://${ip}:8000/api/tasks/${taskId}`;

        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}` // Set the token in the Authorization header
          }
        });
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },

    async fetchUsers() {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const ip = window.location.hostname;
        var url = "http://" + ip + ":" + 8000 + "/api/user/getusers";

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
    async fetchStatuses() {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/status`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.statuses = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        console.log(error.response.data);
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
      this.editedTask = {
        id: task.id,
        name: task.name,
        description: task.description,
        due_date: new Date(task.due_date).toISOString().substr(0, 10), // convert due_date to ISO format
        status: task.status,
        assignedTo: task.assignedTo
      };
      $("#editTaskModal").modal("show");
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
    async assignTask() {}
  }
};
</script>
