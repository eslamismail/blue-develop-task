<template>
  <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Search form -->
        <ul class="navbar-nav align-items-center ml-md-auto"></ul>
        <!-- Navbar links -->
        <ul class="navbar-nav align-items-center ml-auto ml-md-0">
          <li class="nav-item d-xl-none">
            <!-- Sidenav toggler -->
            <div
              class="pr-3 sidenav-toggler sidenav-toggler-dark"
              data-action="sidenav-pin"
              data-target="#sidenav-main"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link pr-0"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle" v-if="admin">
                  <img alt="Image placeholder" :src="admin.avatar" />
                </span>
                <div v-if="admin" class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold">
                    {{
                    admin.name
                    }}
                  </span>
                </div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" @click.prevent="logout">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    admin() {
      return this.$store.state.admin.admin;
    },
  },
  methods: {
    alertAdmin: function () {
      alert(this.admin.email);
    },
    logout: function () {
      axios
        .post("/admin/logout")
        .then((response) => {
          this.$store.commit("admin/logout", this.admin);
        })
        .catch((error) => {
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
            this.$store.commit("admin/logout", {});
          } else {
            this.$notify({
              group: "foo",
              text: error.response.statusText,
              type: "error",
            });
          }
        });
    },
  },
};
</script>
