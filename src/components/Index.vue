<template>
  <div>
    <v-layout>
      <v-flex xs2 class="elevation-1 pb-2">
        <v-flex xs10 offset-xs1>
          <v-text-field label="Your steam ID" v-model="steamId"></v-text-field>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-select
                  v-bind:items="games"
                  v-model="selectedGame"
                  class="input-group--focused"
                  item-text="name"
                  item-value="id"
                  label="Game"></v-select>
        </v-flex>
        <v-btn flat primary v-on:click="getSteamData">Search</v-btn>
      </v-flex>

      <v-flex xs7 class="elevation-1 pb-2">
        <v-data-table
          v-bind:headers="inventoryHeaders"
          :items="steamInventory"
          :rows-per-page-items="[20]">
          <template slot="items" scope="props">
            <td><img v-bind:src="thumbnailPath(props.icon_url)"/></td>
            <td class="item-name" v-on:click="setSelectedItem(props.item)">{{props.item.name}}</td>
            <td>{{props.item.type}}</td>
            <td><div class="rarity-indicator" v-bind:style="{ background: '#' + props.item.name_color }"></div></td>
          </template>
        </v-data-table>
      </v-flex>

      <item-details></item-details>
    </v-layout>
  </div>
</template>

<script>
import ItemDetails from '@/components/ItemDetails';
import { mapGetters, mapActions } from 'vuex';
import helpers from '../store/helpers';

export default {
  components: { ItemDetails },
  name: 'index',
  data() {
    return {
      selectedGame: 0,
      steamId: null,
      inventoryHeaders: [
        { text: 'Image', sortable: false, align: 'left' },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Description', sortable: false, align: 'left' },
        { text: 'Rarity', sortable: false, align: 'left' },
      ],
      thumbnailPath: function thumbnailPath(iconSource) {
        return helpers.getImagePathForItem(iconSource);
      },
    };
  },
  methods: {
    getSteamData: function getSteamData() {
      this.getSteamInventory({ steamId: this.steamId, gameId: this.selectedGame });
      this.getSteamAssetsForGame({ gameId: this.selectedGame });
    },
    ...mapActions([
      'getSteamInventory',
      'getSteamAssetsForGame',
      'setSelectedItem',
    ]),
  },
  computed: {
    ...mapGetters([
      'steamInventory',
      'games',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rarity-indicator {
  height: 15px;
  width: 15px;
}

.item-name {
  cursor: pointer;
}

.item-name:hover {
  text-decoration: underline;
}
</style>
