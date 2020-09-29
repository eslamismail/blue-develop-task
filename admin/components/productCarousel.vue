<template>
  <carousel-3d :autoplay="false">
    <slide v-for="(item, index) in images" :key="index " :index="index">
      <div
        @mouseover="viewBtns(`${item.id}`)"
        @mouseleave="hideBtns(`${item.id}`)"
        style="width:100%;height:100%;"
      >
        <div :id="`img-${item.id}`"></div>
        <div class="carsoul-center" :id="`carsoul-${item.id}`">
          <button type="button" class="btn btn-sm btn-warning" @click.prevent="editImage(item)">
            <span class="fas fa-edit"></span>
          </button>
          <button type="button" class="btn btn-sm btn-danger" @click.prevent="deleteImage(item)">
            <span class="far fa-trash-alt"></span>
          </button>
        </div>

        <img :src="item.image_data" alt class="img-thumbnail" />
      </div>
    </slide>
  </carousel-3d>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    viewBtns: function (id) {
      document.getElementById("carsoul-" + id).style.display = "block";
      document.getElementById("img-" + id).style.background =
        "rgba(255,255,255,0.3)";
      document.getElementById("img-" + id).style.width = "100%";
      document.getElementById("img-" + id).style.position = "absolute";
      document.getElementById("img-" + id).style.height = "100%";
    },
    hideBtns: function (id) {
      document.getElementById("carsoul-" + id).style.display = "none";
      document.getElementById("img-" + id).style.background =
        "rgba(255,255,255,0)";
      document.getElementById("img-" + id).style.width = "100%";
      document.getElementById("img-" + id).style.position = "absolute";
      document.getElementById("img-" + id).style.height = "100%";
    },
    editImage: function (image) {
      this.$emit("editImage", image);
    },
    deleteImage: function (image) {
      this.$emit("deleteImage", image);
    },
  },
};
</script>