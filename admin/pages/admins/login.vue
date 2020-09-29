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
                <div class="text-center">
                  <button type="submit" :disabled="loading" class="btn btn-primary my-4">Sign in</button>
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
  head: {
    title: "Admin Login",
  },
  data() {
    return {
      errors: {
        email: [],
        password: [],
      },
      loading: false,
    };
  },
  methods: {
    login: async function () {
      const form = new FormData(event.target);

      this.loading = true;
      try {
        let response = await axios.post("/admin/login", form);
        this.$store.commit("admin/login", response.data.admin);
        this.errors = {};
        this.loading = false;
      } catch (error) {
        this.loading = false;
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
          if (this.errors.email && this.errors.email.length > 0) {
            document.getElementById("email").focus();
          } else if (this.errors.password && this.errors.password.length > 0) {
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
