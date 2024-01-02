<template>
  <head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
  </head>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" @submit.prevent="register">
                <div class="form-group row">
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="exampleName"
                      placeholder="Name"
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <input
                      type="email"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group row">
                    <div class="col-sm-6">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        v-model="password"
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Repeat Password"
                        v-model="password_confirmed"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary btn-user btn-sm text-center">
                  Register Account
                </button>
                <hr />
              </form>
              <hr />

              <div class="text-center">
                <a class="small" href="/">Already have an account? Login!</a>
              </div>
              <div class="text-danger text-center" v-if="errorMessage">
                {{ errorMessage }}
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
axios.defaults.headers.common["X-CSRF-TOKEN"] = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmed: "",
      name: "",
      errorMessage: "",
      api: null
    };
  },
  mounted() {
    this.api = import.meta.env.VITE_APP_API_URL;
  },
  methods: {
    async register() {
      if (this.password !== this.password_confirmed) {
        this.errorMessage =
          "The password and confirmation password do not match.";
        return;
      }

      try {
        const url = `${this.api}/users/register`;
        const response = await axios.post(url, {
          //set headers
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmed: this.password_confirmed
        });
        this.$router.push("/");
      } catch (error) {
        if (error.response.data.email_address) {
          this.errorMessage = error.response.data.email[0];
        } else {
          this.errorMessage = error.response.data.message;
        }
      }
    }
  }
};
</script>
