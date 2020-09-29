import { mutations } from "../store/admin";

export default async function({ store, redirect }) {
  if (!store.state.admin.admin) {
    try {
      let response = await axios.get("/admin");
      $nuxt.$store.commit("admin/refresh", response.data.admin);
    } catch (error) {
      if (!error.response) {
        $nuxt.$notify({
          group: "foo",
          text: "No internet",
          type: "error"
        });
      } else if (error.response.status == 401) {
        $nuxt.$store.commit("admin/logout", {});
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
