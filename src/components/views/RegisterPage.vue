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
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="First Name"
                      v-model="firstName"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="exampleLastName"
                      placeholder="Last Name"
                      v-model="lastName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    id="exampleInputEmail"
                    placeholder="Email Address"
                    v-model="email"
                  />
                </div>
                <div class="form-group row">
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Repeat Password"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary btn-user btn-block">
                  Register Account
                </button>
                <hr />
              </form>
              <hr />

              <div class="text-center">
                <a class="small" href="/">Already have an account? Login!</a>
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmed: "",
      error: ""
    };
  },
  methods: {
    async register() {
      try {
        const ip = window.location.hostname;
        const url = `http://${ip}:8000/api/register`;
        const response = await axios.post(url, {
          name: this.firstName + " " + this.lastName,
          email_address: this.email,
          password: this.password,
          password_confirmed: this.passwordConfirmed
        });
        this.$router.push("/");
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
};
</script>
