<template>
  <div class="header bg-primary pb-6">
    <div class="container-fluid">
      <div class="header-body">
        <div class="row align-items-center py-4">
          <div class="col-lg-6 col-7">
            <h6 class="h2 text-white d-inline-block mb-0">{{title}}</h6>
            <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4"></nav> -->
          </div>
          <div class="col-lg-6 col-5 text-right" v-if="hasBtn">
            <button class="btn btn-sm btn-neutral" @click.prevent="redirect()">
              <span class="fas fa-plus-square"></span>
              New
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    hasBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    redirect: function () {
      this.$emit("redirect", event);
    },
  },
};
</script>