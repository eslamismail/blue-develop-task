<template>
  <vue-good-table class="table" :columns="columns" :rows="data" compactMode>
    <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'is_featured'">
        <span class="badge badge-success" v-if="props.row.is_featured == 'y'">YES</span>
        <span class="badge badge-danger" v-if="props.row.is_featured == 'n'">NO</span>
      </span>
      <span v-else-if="props.column.field == 'action'">
        <button v-if="hasView" @click.prevent="view(props.row.id)" class="btn btn-sm btn-primary">
          <span class="fas fa-eye"></span>
        </button>
        <button class="btn btn-sm btn-warning" @click.prevent="editItem(props.row.id)">
          <span class="fas fa-edit"></span>
        </button>
        <button @click.prevent="deleteItem(props.row.id)" class="btn btn-sm btn-danger">
          <span class="far fa-trash-alt"></span>
        </button>
      </span>
      <span v-else-if="props.column.field == 'image'">
        <img class="img-thumbnail" width="50px" :src="props.row.image_data" alt />
      </span>
    </template>
  </vue-good-table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    hasView: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteItem: function (id) {
      this.$emit("deleteItem", id);
    },
    editItem: function (id) {
      this.$emit("editItem", id);
    },
    view: function (id) {
      this.$emit("view", id);
    },
  },
};
</script>
