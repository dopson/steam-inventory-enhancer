<template>
  <div>
    <md-layout md-row>
        <md-card>
          <md-card-content>
            <md-input-container>
              <label for="steam-id">Steam Id</label>
              <md-input id="steam-id" name="steam-id" placehodler="Your steam ID" v-model="steamId"></md-input>
            </md-input-container>

            <md-input-container>
              <label for="selected-game">Game </label>
              <md-select id="selected-game" name="selected-game" v-model="selectedGame">
                <md-option v-for="game in games" :key="game.id" v-bind:value="game.id">{{game.name}}</md-option>
              </md-select>
            </md-input-container>

            <md-button class="md-raised md-primary" v-on:click.native="getSteamData()">Get my inventory</md-button>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-content>
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
                  <md-table-cell></md-table-cell>
                  <md-table-cell>{{item.name}}</md-table-cell>
                  <md-table-cell>{{item.type}}</md-table-cell>
                  <md-table-cell><div class="rarity-indicator" v-bind:style="{ background: '#' + item.name_color }"></div></md-table-cell>
                </md-table-row>
              </md-table-body>
            </md-table>
          </md-card-content>
        </md-card>
    </md-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import config from '../config/config';

export default {
  name: 'index',
  data() {
    return {
      selectedGame: 0,
      steamId: null,
    };
  },
  methods: {
    getImageSrc: function getImageSrc(imagePath) {
      return config.STEAM_IMAGES_URL + imagePath;
    },
    getSteamData: function getSteamData() {
      this.getSteamInventory({ steamId: this.steamId, gameId: this.selectedGame });
      this.getSteamAssetsForGame({ gameId: this.selectedGame });
    },
    ...mapActions([
      'getSteamInventory',
      'getSteamAssetsForGame',
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
</style>
