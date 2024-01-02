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
              <div class="header">Add A Book</div>
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <form
                        @submit.prevent="onSubmit"
                        enctype="multipart/form-data"
                      >
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
                          <label for="publisher" class="form-label"
                            >Publisher</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="publisher"
                            v-model="publisher"
                          />
                        </div>

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
                        <div v-if="category_id">
                          <div class="mb-3">
                            <label for="sub_category_id" class="form-label"
                              >Sub-Category</label
                            >
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              v-model="sub_category_id"
                            >
                              <option
                                v-for="subcategory in subcategories"
                                :key="subcategory.id"
                                :value="subcategory.id"
                              >
                                {{ subcategory.name }}
                              </option>
                            </select>
                          </div>
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
                        <div class="mb-3">
                          <label for="pages" class="form-label">Pages</label>
                          <input
                            type="number"
                            class="form-control"
                            id="pages"
                            v-model="pages"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="copies" class="form-label">Copies</label>
                          <input
                            type="number"
                            class="form-control"
                            id="copies"
                            v-model="copies"
                          />
                        </div>

                        <div class="mb-3">
                          <label for="image" class="form-label">Image</label>
                          <input
                            type="file"
                            class="form-control"
                            id="image"
                            ref="imageInput"
                            @change="onFileChange"
                          />
                        </div>
                        <input
                          type="hidden"
                          name="added_by"
                          id="added_by"
                          v-model="user.id"
                        />
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
      user: JSON.parse(localStorage.getItem("user")),
      categories: [],
      subcategories: [],
      name: "",
      publisher: "",
      category_id: "",
      sub_category_id: "",
      description: "",
      pages: "",
      image: null,
      added_by: null,
      copies: null,
      description: "",
      error: null,
      pageSize: 2, // number of tasks to display per page
      currentPage: 1, // current page number
      api: import.meta.env.VITE_APP_API_URL
    };
  },
  created() {
    // Fetch categories when the component is created
    this.fetchCategories();
  },
  watch: {
    // Watch for changes in the category_id and fetch subcategories
    category_id(newValue, oldValue) {
      this.fetchSubcategories(newValue);
    }
  },
  computed: {
    // Compute the total number of pages
    pagedCategories() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.categories.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.categories.length / this.pageSize);
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
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    async onSubmit() {
      try {
        const token = localStorage.getItem("token");

        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("publisher", this.publisher);
        formData.append("category_id", this.category_id);
        formData.append("sub_category_id", this.sub_category_id);
        formData.append("pages", this.pages);
        formData.append("copies", this.copies);
        formData.append("image", this.image);
        formData.append("added_by", this.user.id); // Use this.user.id directly

        const response = await axios.post(`${this.api}/books`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 201) {
          iziToast.success({
            title: "Success",
            message: "Book added successfully",
            position: "topRight"
          });
          // Reset the form
          this.name = "";
          this.description = "";
          this.publisher = "";
          this.category_id = "";
          this.sub_category_id = "";
          this.pages = "";
          this.copies = "";
          this.$refs.imageInput.value = null;
          this.error = null;
        } else {
          console.error(
            `Failed to add book with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to add book:", error.message);
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
    async fetchSubcategories(categoryId) {
      // Fetch subcategories from the API
      try {
        const token = localStorage.getItem("token");

        let url = `${this.api}/categories/${categoryId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.subcategories = response.data.data.subcategories;
        } else {
          console.error(
            `Failed to fetch subcategories with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch subcategories:", error.message);
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
.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
