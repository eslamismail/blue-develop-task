import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Notifications from "vue-notification";
import VueGoodTablePlugin from "vue-good-table";
import Carousel3d from "vue-carousel-3d";

// import the styles
import "vue-good-table/dist/vue-good-table.css";
export default () => {
  Vue.use(Antd);
  Vue.use(Notifications);
  Vue.component("pagination", require("laravel-vue-pagination"));
  Vue.use(VueGoodTablePlugin);
  Vue.use(Carousel3d);
};
