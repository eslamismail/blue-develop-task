<template>
  <div>
    <a-modal
      v-model="show"
      centered
      @ok="setModal1Visible (  false)"
      @cancel="setModal1Visible (  false)"
      :zIndex="1500"
      okText="Save"
      :footer="null"
    >
      <image-input :image="image.image_data" @upload="upload" />
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    modal1Visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.$emit("setModal1Visible", modal1Visible);
    },

    upload: async function (formData) {
      try {
        let response = await axios.post(
          "/admin/products/image/" + this.image.id,
          formData
        );

        document.getElementById("change-image").value = null;
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        this.$emit("change", response.data.image);
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 422) {
          this.$notify({
            group: "foo",
            text: error.response.data.errors.image[0],
            type: "error",
          });
          this.errors = error.response.data.errors;
        } else if (error.response.status == 404) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          setTimeout(() => {
            this.$emit("change", this.image);
          }, 2000);
        } else if (error.response.status == 401) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.$store.commit("admin/logout", this.admin);
        } else {
          this.$notify({
            group: "foo",
            text: error.response.statusText,
            type: "error",
          });
        }
      }
    },
  },
  watch: {
    modal1Visible(val, oldval) {
      this.show = val;
    },
  },
};
</script>
