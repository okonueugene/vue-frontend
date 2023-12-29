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
                My Book Loans
                <div class="search">
                  <div class="input-group mb-3 float-end">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      v-model="search"
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
                              <th>Book</th>
                              <th>User</th>
                              <th>Loan Date</th>
                              <th>Return Date</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(bookLoan, index) in pagedBookLoans"
                              :key="bookLoan.id"
                            >
                              <td>{{ bookLoan.id }}</td>
                              <td>{{ bookLoan.book_name }}</td>
                              <td>{{ bookLoan.borrower }}</td>
                              <td>{{ bookLoan.can_date }}</td>
                              <td>{{ bookLoan.return_date }}</td>
                              <td>{{ bookLoan.status }}</td>
                              <td class="action">
                                <button
                                  class="btn btn-success btn-sm"
                                  @click="extendBookLoan(bookLoan.id)"
                                >
                                  Extend
                                </button>
                                <button
                                  class="btn btn-warning btn-sm"
                                  @click="returnBook(bookLoan.id)"
                                >
                                  Return
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
  <footer-view></footer-view>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      bookLoans: [],
      search: "",
      name: "",
      description: "",
      error: "",
      currentPage: 1,
      pageSize: 5,
      api: import.meta.env.VITE_APP_API_URL
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.bookLoans.length / this.pageSize);
    },
    pagedBookLoans() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.bookLoans.slice(start, end);
    }
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
      this.fetchBookLoans();
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
    async fetchBookLoans() {
      try {
        const token = localStorage.getItem("token");
        let user = JSON.parse(localStorage.getItem("user"));
        var id = user.id;
        const response = await axios.get(
          `${this.api}/bookloans/user/loans/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.bookLoans = response.data.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async returnBook(id) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${this.api}/bookloans/return/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response);

        this.fetchBookLoans();
        iziToast.success({
          title: "Success",
          message: response.data.message,
          position: "topRight",
          timeout: 2000
        });
      } catch (error) {
        this.error = error.response.data.message;
        iziToast.error({
          title: "Error",
          message: error.response.data.message,
          position: "topRight",
          timeout: 2000
        });
      }
    },
    async extendBookLoan(id) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${this.api}/bookloans/extend/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.fetchBookLoans();
        iziToast.success({
          title: "Success",
          message: response.data.message,
          position: "topRight",
          timeout: 2000
        });
      } catch (error) {
        this.error = error.response.data.message;
        iziToast.error({
          title: "Error",
          message: error.response.data.message,
          position: "topRight",
          timeout: 2000
        });
      }
    }
  },

  mounted() {
    this.fetchBookLoans();
  }
};
</script>
<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card {
  width: 100%;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
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
