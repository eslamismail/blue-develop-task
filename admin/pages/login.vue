<template>
  <div class="bg-gradient-primary h-100 w-100" style="position: fixed; overflow: scroll">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-12 col-sm-10">
          <div class="card mt-6">
            <div class="card-body shadow">
              <form role="form" @submit.prevent="login">
                <h1 class="text-muted">Login</h1>
                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-email-83"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      type="email"
                    />
                  </div>
                  <error v-for="(item, index) in errors.email" :key="index" :error="item" />
                </div>
                <div class="form-group">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-lock-circle-open"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Password"
                      name="password"
                      id="password"
                      type="password"
                    />
                  </div>
                  <error v-for="(item, index) in errors.password" :key="index" :error="item" />
                </div>
                <div class="custom-control custom-control-alternative custom-checkbox">
                  <input
                    class="custom-control-input"
                    id="customCheckLogin"
                    type="checkbox"
                    name="remember_me"
                  />
                </div>
                <div>
                  <div class="justify-content-between align-items-center d-flex">
                    <div>
                      <button type="submit" :disabled="loading" class="btn btn-primary my-4">Sign in</button>
                    </div>
                    <div>
                      <router-link to="/register" class="btn btn-default">Sign up</router-link>
                    </div>
                  </div>
                  <p class="text-capitalize">
                    <nuxt-link to="/forgetpassword">forget password</nuxt-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "User - Login",
    };
  },
  data() {
    return {
      loading: false,
      errors: {},
    };
  },
  methods: {
    async login() {
      let form = new FormData(event.target);
      try {
        let response = await axios.post("/login", form);
        this.$store.commit("user/login", response.data.user);
        this.errors = {};
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 422) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.errors = error.response.data.errors;
          if (this.errors.email) {
            document.getElementById("email").focus();
          } else if (this.errors.password) {
            document.getElementById("password").focus();
          }
        } else if (error.response.status == 401) {
          this.errors = {};
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
        } else {
          this.errors = {};
          this.$notify({
            group: "foo",
            text: error.response.statusText,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
