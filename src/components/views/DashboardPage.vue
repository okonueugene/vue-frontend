<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  font-size: 30px;
  font-weight: bold;
  margin: 25px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
}
.col {
  flex: 0 1 25%;
}

.card {
  height: 250px;

  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.card-text {
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  overflow-y: scroll;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card:hover .card-title {
  color: #007bff;
}

.card:hover .card-text {
  color: #007bff;
}

.card:hover .card-img-top {
  opacity: 0.8;
}

.is-long-content {
  /* Customize styles for cards with long text */
  .card-title {
    font-size: 18px;
  }
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
        <div class="container-fluid" style="height: 80%">
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
                  <div class="card-body">
                    <h5 class="card-title">{{ book.name }}</h5>
                    <p class="card-text">{{ book.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="header">Recent Books</div>

            <div class="row"></div>
            <div class="header">Reccomended Books</div>

            <div class="row"></div>
            <div class="header">Favorite Books</div>
            <div class="row"></div>
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

        if (response.status === 200) {
          this.books = response.data;
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
