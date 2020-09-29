<template>
  <div>
    <dashboard-header
      title="Courses"
      @redirect="
        () => {
          $router.push('/admins/dashboard/courses/create');
        }
      "
    />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <data-table
                :columns="columns"
                @editItem="(id) => {$router.push(`/admins/dashboard/courses/${id}`)}"
                @deleteItem="deleteCourse"
                :data="courses"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const moment = require("moment");
export default {
  layout: "dashboard",
  middleware: "admin",
  head() {
    return {
      title: "Admin - Courses",
    };
  },
  data() {
    return {
      courses: [],
      columns: [
        {
          label: "id",
          field: "id",
          type: "number",
        },
        {
          label: "name",
          field: "name",
        },
        {
          label: "no of users",
          field: "users_count",
          type: "number",
        },
        {
          label: "created on",
          field: "created_at",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  watch: {
    courses(oldVal, val) {
      this.courses.forEach((item) => {
        item.created_at = moment(item.created_at).format("YYYY-MM-DD hh:mm a");
      });
    },
  },
  created() {
    this.getCourses();
  },
  methods: {
    async getCourses() {
      try {
        let response = await axios.get("/admin/courses");
        this.courses = response.data.courses;
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
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
    async deleteCourse(id) {
      let conf = confirm("Are you sure ?");
      if (!conf) {
        return false;
      }

      try {
        let response = await axios.delete(`/admin/courses/${id}`);
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.getCourses();
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 401) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$store.commit("admin/logout", this.admin);
        } else if (error.response.status == 404) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.getCourses();
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
