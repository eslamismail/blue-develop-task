<template>
  <div>
    <dashboard-header
      title="Students"
      @redirect="
        () => {
          $router.push('/admins/dashboard/students/create');
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
                @editItem="editStudent"
                @deleteItem="deleteStudent"
                :data="students"
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
      title: "Admin - Students",
    };
  },
  data() {
    return {
      students: [],
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: "name",
          field: "name",
        },
        {
          label: "no of courses",
          field: "courses_count",
          type: "number",
        },
        {
          label: "email",
          field: "email",
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
    students(oldVal, value) {
      this.students.forEach((item) => {
        item.created_at = moment(item.created_at).format("YYYY-MM-DD hh:mm a");
      });
    },
  },

  methods: {
    async getStudents() {
      try {
        let response = await axios.get("/admin/students");
        this.students = response.data.students;
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
    async deleteStudent(id) {
      let conf = confirm("Are you sure ?");
      if (conf) {
        try {
          let response = await axios.delete(`/admin/students/${id}`);
          this.$notify({
            group: "foo",
            text: response.data.message,
            type: "success",
          });
          this.getStudents();
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
            this.getStudents();
          } else {
            this.$notify({
              group: "foo",
              text: error.response.statusText,
              type: "error",
            });
          }
        }
      }
    },
    editStudent: function (id) {
      this.$router.push("/admins/dashboard/students/" + id);
    },
  },
  mounted() {
    this.getStudents();
  },
};
</script>
