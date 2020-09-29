<template>
  <div>
    <dashboard-header :title="title" :hasBtn="false" />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <form class="p-5" @submit.prevent="createCourse">
                <div class="form-group row">
                  <label for="name" class="col-form-label col-md-2 col-12">Name</label>
                  <div class="col-md-9 col-12">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="form-control"
                      placeholder="Course name"
                    />
                    <error v-for="(item, index) in errors.name" :error="item" :key="index" />
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
      title: "Admin - Create course",
    };
  },
  data() {
    return {
      title: "Create course",
      errors: {},
      loading: false,
    };
  },
  methods: {
    async createCourse() {
      let form = new FormData(event.target);
      this.loading = true;
      try {
        let response = await axios.post("/admin/courses", form);
        this.loading = false;
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.errors = {};
        this.$router.push("/admins/dashboard/courses");
      } catch (error) {
        this.loading = false;
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
