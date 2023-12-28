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
              <div class="header">Book Loans</div>

              <br /><br />
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <div class="header">Categories</div>
                    <div class="row">
                      <div class="table-responsive">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <!-- <tr v-if="pagedCategories.length === 0">
                                <td colspan="3">No categories found</td>
                              </tr>
                              <tr
                                v-else
                                v-for="(category, index) in pagedCategories"
                              >
                                <td>{{ category.id }}</td>
                                <td>{{ category.name }}</td>
                                <td>{{ category.description }}</td>
                              </tr> -->
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <pagination
                        :totalPages="totalPages"
                        :currentPage="currentPage"
                        @changePage="changePage"
                        @previousPage="previousPage"
                        @nextPage="nextPage"
                      ></pagination> -->
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
