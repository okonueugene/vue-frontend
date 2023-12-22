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
              <div class="header">Add Sub-Category</div>
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <form @submit.prevent="onSubmit">
                        <div class="mb-3">
                          <label for="category_id" class="form-label"
                            >Category</label
                          >
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            v-model="category_id"
                          >
                            <option
                              v-for="category in categories"
                              :key="category.id"
                              :value="category.id"
                            >
                              {{ category.name }}
                            </option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="name" class="form-label">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            v-model="name"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="description" class="form-label"
                            >Description</label
                          >
                          <textarea
                            class="form-control"
                            id="description"
                            rows="3"
                            v-model="description"
                          ></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <br /><br />
              <div class="error">
                <span class="text-danger" v-if="error">{{ error }}</span>
              </div>

              <br /><br />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <div class="header">Sub-Categories</div>
                    <div class="row">
                      <div class="table-responsive">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="pagedSubCategories.length === 0">
                              <td colspan="3">No Sub-Categories found</td>
                            </tr>
                            <tr
                              v-else
                              v-for="(category, index) in pagedSubCategories"
                            >
                              <td>{{ category.id }}</td>
                              <td>{{ category.name }}</td>
                              <td>{{ category.description }}</td>
                              <td>
                                <button
                                  class="btn btn-danger"
                                  @click="deleteSubCategory(category.id)"
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
  data() {
    return {
      sub_categories: [],
      categories: [],
      name: "",
      category_id: "",
      description: "",
      error: null,
      pageSize: 5, // number of tasks to display per page
      currentPage: 1, // current page number
      api: import.meta.env.VITE_APP_API_URL
    };
  },
  created() {
    // Fetch categories when the component is created
    this.fetchCategories();
    this.fetchSubCategories();
  },
  computed: {
    // Compute the total number of pages
    pagedSubCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sub_categories.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sub_categories.length / this.pageSize);
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
    async onSubmit() {
      // Handle form submission
      try {
        const token = localStorage.getItem("token");

        let url = `${this.api}/subcategories`;

        const response = await axios.post(
          url,
          {
            name: this.name,
            category_id: this.category_id,
            description: this.description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 201) {
          iziToast.success({
            title: "Success",
            message: "Sub-Category added successfully",
            position: "topRight"
          });
          //reset the form
          this.name = "";
          this.category_id = "";
          this.description = "";
          // Fetch sub-categories again to refresh the list
          this.fetchSubCategories();
        } else {
          console.error(
            `Failed to add category with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to add category:", error.message);
        this.error = error.response.data.message;
      }
    },

    async fetchCategories() {
      // Fetch categories from the API
      try {
        const token = localStorage.getItem("token");

        let url = `${this.api}/categories`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.categories = response.data.data;
        } else {
          console.error(
            `Failed to fetch categories with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    },

    async fetchSubCategories() {
      // Fetch categories from the API
      try {
        const token = localStorage.getItem("token");

        let url = `${this.api}/subcategories`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.sub_categories = response.data.data;
          iziToast.success({
            title: "Success",
            message: "Sub-Categories fetched successfully",
            position: "topRight"
          });
        } else {
          console.error(
            `Failed to fetch categories with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    },
    async deleteSubCategory(id) {
      // Delete a category from the API
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        let url = `${this.api}/subcategories/${id}`;

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          iziToast.success({
            title: "Success",
            message: "Sub-Category deleted successfully",
            position: "topRight"
          });

          // Fetch categories again to refresh the list
          this.fetchSubCategories();
        } else {
          console.error(
            `Failed to delete category with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to delete category:", error.message);
      }
    }
  }
};
</script>
<style scoped>
.error {
  position: relative;
  left: 45%;
  margin-top: 10px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
}
#option {
  text-align: center;
}
</style>
