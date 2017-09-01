<template>
  <div>
    <v-layout>
      <v-navigation-drawer class=""
                           persistent
                           absolute
                           clipped
                           right
                           v-model="detailViewOpen"
                           height="100%"
                           light>

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
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'itemDetails',
    data() {
      return {
        detailViewOpen: true,
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
</style>
