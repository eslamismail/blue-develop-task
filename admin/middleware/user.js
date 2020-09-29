import { mutations } from "../store/admin";

export default async function({ store, redirect }) {
  if (!store.state.user.user) {
    try {
      let response = await axios.get("/user");
      $nuxt.$store.commit("user/refresh", response.data.user);
    } catch (error) {
      if (!error.response) {
        $nuxt.$notify({
          group: "foo",
          text: "No internet",
          type: "error"
        });
      } else if (error.response.status == 401) {
        $nuxt.$store.commit("user/logout", {});
        axios.defaults.headers.authorization = null;
      } else {
        $nuxt.$notify({
          group: "foo",
          text: error.response.statusText,
          type: "error"
        });
      }
    }
  }
}
