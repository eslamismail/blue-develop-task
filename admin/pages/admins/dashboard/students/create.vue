<template>
  <div>
    <dashboard-header :title="title" :hasBtn="false" />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <form class="p-5" @submit.prevent="saveUser" autocomplete="off">
                <div class="form-group row">
                  <label for="name" class="col-form-label col-md-2 col-12">Name</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="form-control"
                      placeholder="Eslam Ismail"
                    />
                    <error v-for="(item, index) in errors.name" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="image" class="col-form-label col-md-2 col-12">Image</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="image"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.image" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-form-label col-md-2 col-12">Email</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="email@example.com"
                    />
                    <error v-for="(item, index) in errors.email" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="password" class="col-form-label col-md-2 col-12">Password</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.password" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="password_confirmation"
                    class="col-form-label col-md-2 col-12"
                  >Confirm Password</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      class="form-control"
                      placeholder="Confirm password"
                    />
                    <error
                      v-for="(item, index) in errors.password_confirmation"
                      :error="item"
                      :key="index"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <button :disabled="loading" class="btn btn-primary" type="submit">Save</button>
                  <a
                    :disabled="loading"
                    class="btn btn-default"
                    href="#"
                    @click.prevent="$router.go(-1)"
                  >Cancel</a>
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
  layout: "dashboard",
  middleware: "admin",
  head() {
    return {
      title: "Admin - Create user",
    };
  },
  data() {
    return {
      title: "Create User",
      errors: {},
      loading: false,
    };
  },
  methods: {
    async saveUser() {
      let form = event.target;
      let formData = new FormData(form);
      try {
        let response = await axios.post("/admin/students", formData);
        this.$router.push("/admins/dashboard/students");
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 422) {
          this.errors = error.response.data.errors;
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          if (this.errors.name) {
            document.getElementById("name").focus();
          } else if (this.errors.email) {
            document.getElementById("email").focus();
          } else if (this.errors.password) {
            document.getElementById("password").focus();
          } else if (this.errors.password_confirmation) {
            document.getElementById("password_confirmation").focus();
          }
        } else if (error.response.status == 401) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$store.commit("admin/logout", this.admin);
        } else {
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
