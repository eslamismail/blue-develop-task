<template>
  <div class="bg-gradient-primary h-100 w-100" style="position: fixed; overflow: scroll">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-12 col-sm-10">
          <div class="card mt-6">
            <div class="card-body shadow">
              <form role="form" autocomplete="off" @submit.prevent="resetPassword">
                <h1 class="text-muted">Reset password</h1>
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
                      :disabled="message ? true : false"
                    />
                  </div>
                  <error v-for="(item, index) in errors.email" :key="index" :error="item" />
                </div>
                <div class="alert alert-success" v-if="message">{{message}}</div>
                <div class="justify-content-between align-items-center d-flex">
                  <div>
                    <button
                      type="submit"
                      :disabled="loading"
                      class="btn btn-primary my-4"
                    >Reset password</button>
                  </div>
                  <div>
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
      title: "Forget password",
    };
  },
  data() {
    return {
      errors: {},
      loading: false,
      message: null,
    };
  },
  methods: {
    async resetPassword() {
      let form = new FormData(event.target);
      try {
        this.loading = true;
        let response = await axios.post("/forgetpassword", form);
        this.loading = false;
        this.message = response.data.message;
        this.errors = {};
      } catch (error) {
        console.log(error);
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
