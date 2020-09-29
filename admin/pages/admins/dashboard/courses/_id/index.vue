<template>
  <div>
    <dashboard-header :title="title" :hasBtn="false" />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <form class="p-5" @submit.prevent="updateCourse">
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
  data() {
    return {
      title: "Edit Course",
      errors: {},
      loading: false,
      course: {},
    };
  },
  created() {
    this.getCourse(this.$route.params.id);
  },
  methods: {
    async getCourse(id) {
      try {
        let response = await axios.get(`/admin/courses/${id}`);
        this.course = response.data.course;
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
      document.getElementById("name").value = this.course.name;
    },
    async updateCourse() {
      let form = $(event.target).serialize();
      try {
        let response = await axios.put(
          `/admin/courses/${this.course.id}?${form}`
        );
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.errors = {};
        this.$router.push("/admins/dashboard/courses");
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
