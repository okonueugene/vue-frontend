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
              <div class="header">Rejected Book Loans</div>
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
                            <tr v-if="!pagedBookLoans.length">
                              <td colspan="7" class="text-center">
                                No Book Loans
                              </td>
                            </tr>
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
                                  class="btn btn-danger btn-sm"
                                  @click="deleteBookLoan(bookLoan.id)"
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
  <footer-view></footer-view>
</template>
<script>
import axios from "axios";

export default {
  name: "RejectedLoans",
  data() {
    return {
      rejectedBookLoans: [],
      currentPage: 1,
      errorMessage: "",
      pageSize: 6,
      api: import.meta.env.VITE_APP_API_URL
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rejectedBookLoans.length / this.pageSize);
    },
    pagedBookLoans() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.rejectedBookLoans.slice(start, end);
    }
  },
  methods: {
    async getBookLoans() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${this.api}/bookloans/rejected/loans`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.rejectedBookLoans = response.data.data;
      } catch (error) {
        console.log(error);
        this.errorMessage = error.response.data.message;
      }
    },
    async deleteBookLoan(id) {
      try {
        const token = localStorage.getItem("token");

        let response = await axios.delete(`${this.api}/bookloans/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.successMessage = "Book Loan deleted successfully";
          iziToast.success({
            title: "Success",
            message: this.successMessage,
            position: "topRight",
            timeout: 2000
          });
          this.getBookLoans();
        }
      } catch (error) {
        console.log(error);
        iziToast.error({
          title: "Error",
          message: error.response.data.message,
          position: "topRight",
          timeout: 2000
        });
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.getBookLoans();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getBookLoans();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getBookLoans();
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
    this.getBookLoans();
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

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
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
