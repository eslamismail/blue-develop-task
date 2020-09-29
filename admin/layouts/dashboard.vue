<template>
  <div>
    <notifications class="m-3" group="foo" />
    <admin-nav />

    <div class="main-content" id="panel">
      <admin-header></admin-header>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  mounted() {},
};
</script>
