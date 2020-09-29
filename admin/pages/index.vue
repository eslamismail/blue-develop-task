<template>
  <div>
    <dashboard-header :title="title" :hasBtn="false" />
    <div class="container-fluid mt--6 animate__animated animate__fadeIn">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="table-responsive">
              <vue-good-table class="table" :columns="columns" :rows="courses" compactMode>
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'action'">
                    <button
                      @click.prevent="subscribe(props.row.id)"
                      class="btn btn-outline-primary"
                    >
                      <i class="fas fa-shopping-cart"></i>
                    </button>
                  </span>
                </template>
              </vue-good-table>
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
  middleware: "user",
  layout: "user",
  head() {
    return {
      title: "User - Courses",
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  data() {
    return {
      title: "Courses",
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
          label: "subscrbe",
          field: "action",
        },
      ],
      courses: [],
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
        let response = await axios.get("/courses");
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
          this.$store.commit("user/logout", {});
        } else {
          this.$notify({
            group: "foo",
            text: error.response.statusText,
            type: "error",
          });
        }
      }
    },
    async subscribe(id) {
      try {
        let response = await axios.post(`/courses/${id}`);
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
          this.$store.commit("user/logout", {});
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
