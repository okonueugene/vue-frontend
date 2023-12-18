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
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: space-evenly;
}

.col {
  flex: 1;
  margin: 10px;
  min-width: 200px;
  max-width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <side-bar></side-bar>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav-bar></nav-bar>
        <!-- End of Topbar -->
        <div class="container mt-4 mb-4">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <!-- Your search bar code goes here -->
              <!-- Example: -->
              <input type="text" class="form-control" placeholder="Search..." />
            </div>
          </div>
        </div>
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class="container text-center">
            <div class="header">New Books</div>
            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in books" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="book.image"
                    class="card-img-top"
                    alt="Book Cover"
                  />
                  <span>{{ book.name }}</span>
                </div>
              </div>
            </div>
            <div class="header">Recently Read Books</div>

            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in books" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="book.image"
                    class="card-img-top"
                    alt="Book Cover"
                  />
                  <span>{{ book.name }}</span>
                </div>
              </div>
            </div>
            <div class="header">Reccomended Books</div>

            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in books" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="book.image"
                    class="card-img-top"
                    alt="Book Cover"
                  />
                  <span>{{ book.name }}</span>
                </div>
              </div>
            </div>
            <div class="header">Favorite Books</div>
            <div class="row">
              <!-- Loop through the new books data and render each book -->
              <div v-for="book in books" :key="book.name" class="col">
                <div class="card">
                  <img
                    :src="book.image"
                    class="card-img-top"
                    alt="Book Cover"
                  />
                  <span>{{ book.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer-view></footer-view>
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
      books: [],
      search: ""
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    // Fetch the books data from the API
    async fetchBooks() {
      try {
        const token = localStorage.getItem("token");
        const ip = window.location.hostname;

        let url = `http://${ip}:8000/api/v1/books`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("API Response:", response.data);

        if (response.status === 200) {
          this.books = response.data.data;
        } else {
          console.error(
            `Fetch books failed with status code ${response.status}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch books:", error.message);
      }
    }
  }
};
</script>
