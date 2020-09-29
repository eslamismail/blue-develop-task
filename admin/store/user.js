export const state = () => ({
  user: null,
  token: window.localStorage.getItem("token") || null
});

export const mutations = {
  login: (state, data) => {
    console.log(data);
    state.user = data;
    window.localStorage.setItem("token", data.accessToken);
    $nuxt.$notify({
      group: "foo",
      text: "Welcome back !" + data.name,
      type: "success"
    });
    if (data.accessToken) {
      axios.defaults.headers.authorization = `Bearer ${data.accessToken}`;
    }
    setTimeout(() => {
      $nuxt.$router.push("/");
    }, 3000);
  },
  refresh(state, user) {
    state.user = user;
  },
  logout(state, {}) {
    window.localStorage.removeItem("admin");
    this.$router.push("/login");
    state.user = null;
    state.token = null;
    window.localStorage.removeItem("token");
    axios.defaults.headers.authorization = null;
  }
};
