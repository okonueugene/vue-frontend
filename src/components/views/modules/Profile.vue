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
            <div class="col-md-6 float-end"></div>
          </div>
          <div
            class="container-fluid flex-grow-1 d-flex align-items-center justify-content-center"
          >
            <div class="container text-center">
              <div class="header">Profile</div>
              <br /><br />

              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          id="name"
                          :value="user.name"
                          disabled
                        />
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          id="email"
                          :value="user.email"
                          disabled
                        />
                      </div>
                      <div class="mb-3">
                        <label for="phone" class="form-label">Role</label>
                        <input
                          type="text"
                          class="form-control text-center"
                          id="phone"
                          :value="user.role"
                          disabled
                        />
                      </div>
                    </div>
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
export default {
  name: "Profile",
  data() {
    return {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {}
    };
  }
};
</script>
<style scoped>
.header {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.error {
  margin-top: 20px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 30px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.card-text {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
}

.card-text:last-child {
  margin-bottom: 0;
}
</style>
