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
          <div class="card d-block mx-auto">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="getImageUrl(book)"
                  class="img-fluid rounded-start"
                  :alt="getMediaFileName(book)"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="card-title">
                    <h5>{{ book.name }}</h5>
                  </div>
                  <div class="card-text">
                    <div class="publisher">Author: {{ book.publisher }}</div>
                    <div class="description">
                      Description: {{ book.description ?? placeholder }}
                    </div>
                    <div class="category">Category: {{ book.category }}</div>
                    <div class="subcategory">
                      Genre: {{ book.sub_category }}
                    </div>
                    <div class="pages">{{ book.pages }} pages, Paperback</div>
                  </div>
                </div>
                <div class="borrow">
                  <button
                    class="btn btn-success"
                    @click="borrowBook(book.id, user.id)"
                  >
                    Borrow
                  </button>
                </div>
                <div class="error">
                  <p>{{ errorMessage }}</p>
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
      book: {},
      api: import.meta.env.VITE_APP_API_URL,
      files: import.meta.env.VITE_APP_MEDIA_URL,
      user: JSON.parse(localStorage.getItem("user")),
      error: null,
      errorMessage: null,
      placeholder:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created() {
    // Fetch book details when the component is created
    this.fetchBookDetails();
  },
  methods: {
    getImageUrl(book) {
      // Check if the image property is null, use media property instead
      return (
        book.image ||
        (book.media.length > 0 ? this.cleanMediaUrl(book.media) : null)
      );
    },
    getMediaFileName(book) {
      // Check if the image property is null, use media file name property instead
      return book.image ? book.image : book.name;
    },
    cleanMediaUrl(mediaUrl) {
      // Define the regex pattern to match the part you want to replace
      let pattern = /http:\/\/localhost\/storage\//;

      // Define the replacement string (the part you want to replace it with)
      let replacement = this.files + "/storage/";

      // Use replace to replace the matched part with the replacement
      return mediaUrl.replace(pattern, replacement);
    },
    async fetchBookDetails() {
      try {
        const token = localStorage.getItem("token");
        const bookId = this.$route.params.id; // Access id from route parameters

        const response = await axios.get(`${this.api}/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.book = response.data.data;
          console.log("book", this.book);
        } else {
          console.error(
            `Fetch book details failed with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error.message);
        this.errorMessage = error.message;
      }
    },
    async borrowBook(id, user) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${this.api}/bookloans`,
          {
            user_id: user,
            book_id: id
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
            message: "Book borrowed successfully",
            position: "topRight"
          });

          this.$router.go(-1);
        } else {
          console.error(
            `Fetch book details failed with status code ${response.status}`
          );
          this.errorMessage = error.response.data.message;
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error.message);
        console.log(error.response.data.message);
        this.errorMessage = error.response.data.message;
      }
    }
  }
};
</script>
<style scoped>
.card {
  width: 100%;
  margin: 0 auto;
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  margin-bottom: 0.75rem;
}

.publisher {
  font-size: 1rem;
  color: #090b0c;
  margin-bottom: 2rem;
}
.description {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  font-style: italic;
}
.category {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  font-style: italic;
}
.subcategory {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  font-style: italic;
}
.pages {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  font-style: italic;
}
.borrow {
  margin-top: 1rem;
  padding: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.borrow button {
  margin-right: 1rem;
}
.borrow button:last-child {
  margin-right: 0;
}

.error {
  font-size: 15px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  flex-direction: column;
  position: relative;
  left: 6%;
}
</style>
