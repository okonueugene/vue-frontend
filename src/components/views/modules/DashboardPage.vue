<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}
.container {
  margin: 0 auto;
  max-width: 1200px;
}

.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 50vh;
}
.header {
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0;
}
#content-wrapper {
  flex: 1;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
}

.col {
  flex: 1;
  margin: 10px;
  min-width: 200px;
  max-width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card-img-top {
  width: 100%;
  height: 80%;
  object-fit: cover;
}

.card span {
  font-size: 12px;
  font-weight: bold;
  margin: 10px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
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
            <div class="col-md-6">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  v-model="search"
                  @input="onSubmit"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Begin Page Content -->
        <div class="container-fluid flex-grow-1">
          <div class="container text-center">
            <div
              v-if="loading"
              class="spinner-border text-primary"
              role="status"
            ></div>
            <div v-if="search.trim() !== ''">
              <div class="header">Search Results</div>
              <div class="row">
                <!-- Loop through the search results and render each book -->
                <div v-for="book in filteredBooks" :key="book.name" class="col">
                  <div class="card">
                    <img
                      :src="getImageUrl(book)"
                      class="card-img-top"
                      :alt="getMediaFileName(book)"
                    />
                    <span>
                      <a href="javascript:void(0)" @click="viewBook(book.id)">{{
                        book.name
                      }}</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="header">New Books</div>
            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in newBooks" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="getImageUrl(book)"
                    class="card-img-top"
                    :alt="getMediaFileName(book)"
                  />

                  <span>
                    <a href="javascript:void(0)" @click="viewBook(book.id)">{{
                      book.name
                    }}</a>
                  </span>
                </div>
              </div>
            </div>
            <div class="header">Recently Read Books</div>

            <div class="row">
              <!-- Loop through the new books data and render random 8 books -->
              <div
                v-for="book in recentlyReadBooks"
                :key="book.name"
                class="col"
              >
                <div class="card">
                  <img
                    :src="getImageUrl(book)"
                    class="card-img-top"
                    :alt="getMediaFileName(book)"
                  />
                  <span>
                    <a href="javascript:void(0)" @click="viewBook(book.id)">{{
                      book.name
                    }}</a>
                  </span>
                </div>
              </div>
            </div>
            <div class="header">Reccomended Books</div>

            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div
                v-for="book in reccomendedBooks"
                :key="book.name"
                class="col"
              >
                <div class="card">
                  <img
                    :src="getImageUrl(book)"
                    class="card-img-top"
                    :alt="getMediaFileName(book)"
                  />
                  <span>
                    <a href="javascript:void(0)" @click="viewBook(book.id)">{{
                      book.name
                    }}</a>
                  </span>
                </div>
              </div>
            </div>
            <div class="header">Favorite Books</div>
            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in favouriteBooks" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="getImageUrl(book)"
                    class="card-img-top"
                    :alt="getMediaFileName(book)"
                  />
                  <span>
                    <a href="javascript:void(0)" @click="viewBook(book.id)">{{
                      book.name
                    }}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <footer-view></footer-view>

  <!-- End of Page Wrapper -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      search: "",
      user: JSON.parse(localStorage.getItem("user")),
      filteredBooks: [],
      error: "",
      loading: false,
      errorMessage: "",
      api: import.meta.env.VITE_APP_API_URL,
      files: import.meta.env.VITE_APP_MEDIA_URL
    };
  },

  created() {
    this.fetchBooks();
    this.displayErrorMessage();
  },
  computed: {
    newBooks() {
      //sort by id from highest to lowest
      return this.books.sort((a, b) => b.id - a.id).slice(0, 4);
    },
    favouriteBooks() {
      //use fisher yates shuffle algorithm
      let books = this.books;
      let currentIndex = books.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = books[currentIndex];
        books[currentIndex] = books[randomIndex];
        books[randomIndex] = temporaryValue;
      }

      return books.slice(0, 4);
    },
    recentlyReadBooks() {
      //use fisher yates shuffle algorithm
      let books = this.books;
      let currentIndex = books.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = books[currentIndex];
        books[currentIndex] = books[randomIndex];
        books[randomIndex] = temporaryValue;
      }

      return books.slice(0, 4);
    },
    reccomendedBooks() {
      //use fisher yates shuffle algorithm
      let books = this.books;
      let currentIndex = books.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = books[currentIndex];
        books[currentIndex] = books[randomIndex];
        books[randomIndex] = temporaryValue;
      }

      return books.slice(0, 4);
    }
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue.length >= 4) {
        this.onSubmit();
      }
    }
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
    async onSubmit() {
      try {
        this.loading = true;

        const token = localStorage.getItem("token");

        if (this.search.length >= 4) {
          // If search is not empty, call the API to search for books
          const url = `${this.api}/books/search/${this.search}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            this.filteredBooks = response.data.data;
            iziToast.success({
              title: "Success",
              message: "Search results fetched successfully",
              position: "topRight",
              timeout: 2000
            });
          } else {
            console.error(
              `Fetch books failed with status code ${response.status}`
            );
            this.errorMessage = response.data.message;
          }
        }
      } catch (error) {
        console.error("Failed to fetch books:", error.message);
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Fetch the books data from the API
    async fetchBooks() {
      try {
        this.loading = true;

        const token = localStorage.getItem("token");

        var url = this.api + "/books";
        console.log(url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.books = response.data.data;
          iziToast.success({
            title: "Success",
            message: "Books fetched successfully",
            position: "topRight",
            timeout: 2000
          });
        } else {
          console.error(
            `Fetch books failed with status code ${response.status}`
          );
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        console.error("Failed to fetch books:", error.message);
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
        this.displayErrorMessage();
      }
    },
    async viewBook(id) {
      try {
        this.loading = true;
        this.$router.push({ name: "BookDetailsPage", params: { id: id } });
      } catch (error) {
        console.error("Failed to fetch books:", error.message);
        this.errorMessage = error.message;
        this.loading = false;
      } finally {
        this.loading = false;
        this.displayErrorMessage();
      }
    },
    // Display the error message using iziToast
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
    //pass the book id to the book details page
  }
};
</script>
