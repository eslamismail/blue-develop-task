<template>
  <div class="bg-gradient-primary h-100 w-100" style="position: fixed; overflow: scroll">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-12 col-sm-10">
          <div class="card mt-6">
            <div class="card-body shadow">
              <form role="form" @submit.prevent="register">
                <h1 class="text-muted">Register</h1>
                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-signature"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      id="name"
                      placeholder="Name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <error v-for="(item, index) in errors.name" :key="index" :error="item" />
                </div>

                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-signature"></i>
                      </span>
                    </div>
                    <input
                      type="file"
                      class="form-control"
                      placeholder="Image"
                      accept="image/*"
                      id="image"
                      name="image"
                    />
                  </div>
                  <error v-for="(item, index) in errors.image" :key="index" :error="item" />
                </div>

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

                <div class="form-group">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-lock-circle-open"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Password confirmation"
                      name="password_confirmation"
                      id="password_confirmation"
                      type="password"
                    />
                  </div>
                  <error
                    v-for="(item, index) in errors.password_confirmation"
                    :key="index"
                    :error="item"
                  />
                </div>

                <div>
                  <small>
                    <router-link to="/login">Has account</router-link>
                  </small>
                  <div class="justify-content-between align-items-center d-flex">
                    <button type="submit" :disabled="loading" class="btn btn-primary my-4">Sign up</button>
                    <router-link to="/login" class="btn btn-default">Login</router-link>
                  </div>
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
      title: "User - Register",
    };
  },
  data() {
    return {
      errors: {},
      loading: false,
    };
  },
  methods: {
    async register() {
      let form = new FormData(event.target);
      this.loading = true;
      try {
        let response = await axios.post("/register", form);
        this.$store.commit("user/login", response.data.user);
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
