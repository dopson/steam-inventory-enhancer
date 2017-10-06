<template>
  <v-flex xs3 class="elevation-1 pb-2">
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          {{selectedItem.name}}
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          {{selectedItem.type}}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-flex>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'itemDetails',
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'selectedItem',
      ]),
    },
  };
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
