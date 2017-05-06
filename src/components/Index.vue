<template>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Image</md-table-head>
          <md-table-head md-sort-by="item_name">Name</md-table-head>
          <md-table-head md-sort-by="item_description">Description</md-table-head>
          <md-table-head md-sort-by="item_rarity">Rarity</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="item in steamInventory" :key="item.id">
          <md-table-cell><img :src="getImageSrc(item.image_path)" /></md-table-cell>
          <md-table-cell>{{item.item_name}}</md-table-cell>
          <md-table-cell>{{item.item_description}}</md-table-cell>
          <md-table-cell>{{item.item_rarity}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      steamInventory: [
        { item_name: 'Testi1', item_description: 'Testikuvaus', item_rarity: 'Rarity' },
      ],
    };
  },
  methods: {
    getImageSrc: function getImageSrc(imagePath) {
      return imagePath;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
