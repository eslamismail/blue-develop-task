<template>
  <div class="bg-gradient-primary h-100 w-100" style="position: fixed; overflow: scroll">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-12 col-sm-10">
          <div class="card mt-6">
            <div class="card-body shadow">
              <form role="form" autocomplete="off" @submit.prevent="reset">
                <h1 class="text-muted">Reset password</h1>
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

                <div class="text-center">
                  <div class="alert alert-danger" v-if="error">
                    {{message}} if you want to request for new email
                    <nuxt-link to="/forgetpassword">click here</nuxt-link>or if you want to login normally
                    <nuxt-link to="/login">click here</nuxt-link>
                  </div>
                  <button :disabled="loading" class="btn btn-primary text-capitalize">reset</button>
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
  data() {
    return {
      email: this.$route.query.email,
      token: this.$route.params.id,
      errors: {},
      loading: false,
      error: false,
      message: "",
    };
  },
  methods: {
    async reset() {
      let form = new FormData(event.target);
      form.append("token", this.token);
      form.append("email", this.email);
      this.loading = true;
      this.error = false;
      try {
        let response = await axios.post("resetPassword", form);
        this.loading = false;
        this.errors = {};
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.$router.push("/login");
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
        } else if (error.response.status == 400) {
          this.errors = {};
          this.error = true;
          this.message = error.response.data.error;
          this.$notify({
            group: "foo",
            text: error.response.data.error,
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
