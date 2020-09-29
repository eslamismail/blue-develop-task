// import { message } from "ant-design-vue";

export const state = () => ({
  admin: null,
  token: window.localStorage.getItem("token") || null
});

export const mutations = {
  login(state, admin) {
    $nuxt.$notify({
      group: "foo",
      text: "Welcome back !" + admin.name,
      type: "success"
    });

    state.admin = admin;
    state.token = admin.accessToken;
    window.localStorage.setItem("token", state.token);
    if (admin.accessToken) {
      axios.defaults.headers.authorization = `Bearer ${admin.accessToken}`;
    }
    setTimeout(() => {
      this.$router.push("/admins");
    }, 3000);
  },
  logout(state, admin) {
    window.localStorage.removeItem("admin");
    this.$router.push("/admins/login");
    state.admin = null;
    state.token = null;
    window.localStorage.removeItem("token");
    axios.defaults.headers.authorization = null;
  },
  refresh(state, admin) {
    state.admin = admin;
  }
};
