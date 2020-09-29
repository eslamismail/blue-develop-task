<template>
  <nav
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header align-items-center">
        <nuxt-link class="navbar-brand" to="/admins/dashboard">
          <img src="/admin/assets/img/brand/blue.png" class="navbar-brand-img" alt="..." />
        </nuxt-link>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link
                :class="`nav-link ${isActive('/admins/dashboard/students')}`"
                to="/admins/dashboard/students"
              >
                <i class="fas fa-user-graduate text-primary"></i>
                <span class="nav-link-text">students</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                :class="`nav-link ${isActive('/admins/dashboard/courses')}`"
                to="/admins/dashboard/courses"
              >
                <i class="fas fa-book text-primary"></i>
                <span class="nav-link-text">Courses</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  mounted() {
    this.isActive();
  },
  methods: {
    isActive: function (path) {
      if (this.$route.path == path) {
        return "active";
      } else {
        return "";
      }
    },
  },
};
</script>
