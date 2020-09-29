<template>
  <div>
    <form id="upload-image">
      <input
        type="file"
        @change="upload"
        name="image"
        accept="image/*"
        style="display:none;"
        id="change-image"
      />
    </form>
    <img
      class="img-thumbnail"
      width="100%"
      height="100%"
      @click.prevent="changeImage"
      :src="image"
      alt
    />
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    upload: function () {
      let form = document.getElementById("upload-image");
      let formData = new FormData(form);
      this.$emit("upload", formData);
    },
    changeImage: function () {
      document.getElementById("change-image").click();
    },
  },
};
</script>
