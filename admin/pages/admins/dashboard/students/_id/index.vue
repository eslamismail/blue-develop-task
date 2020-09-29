<template>
  <div>
    <dashboard-header :title="title" :hasBtn="false" />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <form class="p-5" autocomplete="off" @submit.prevent="updatedUser">
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
                    <img
                      v-if="user"
                      class="img-thumbnail"
                      width="100px"
                      height="100px"
                      :src="user.avatar"
                      alt
                    />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="checked"
                    id="defaultCheck1"
                    @change="()=> {   !checked ? checked = true : checked = false}"
                  />
                  <label class="form-check-label" for="defaultCheck1">Change password</label>
                </div>
                <hr />
                <div class="form-group row">
                  <label for="password" class="col-form-label col-md-2 col-12">Password</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      :disabled="!checked"
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
                      :disabled="!checked"
                    />
                    <error
                      v-for="(item, index) in errors.password_confirmation"
                      :error="item"
                      :key="index"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <button :disabled="loading" class="btn btn-primary" type="submit">Update</button>
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
      title: "Admin - Update user",
    };
  },
  data() {
    return {
      title: "Updated User",
      errors: {},
      loading: false,
      user: {},
      checked: false,
    };
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    async getUser(id) {
      try {
        let response = await axios.get(`/admin/students/${id}`);
        this.user = response.data.user;
        this.fillData();
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 404) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$router.go(-1);
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
    fillData() {
      document.getElementById("name").value = this.user.name;
      document.getElementById("email").value = this.user.email;
    },
    async updatedUser() {
      let form = new FormData(event.target);
      try {
        let response = await axios.post(
          `/admin/students/${this.user.id}`,
          form
        );
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.$router.push("/admins/dashboard/students");
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 404) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$router.go(-1);
        } else if (error.response.status == 401) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$store.commit("admin/logout", this.admin);
        } else if (error.response.status == 422) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.errors = error.response.data.errors;
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
