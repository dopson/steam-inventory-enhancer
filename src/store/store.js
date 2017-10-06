import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config/config';

Vue.use(Vuex);

const state = {
  apiUrl: config.API_URL,
  steamInventoryRequestError: '',
  steamAssetsRequestError: '',
  steamInventory: [],
  steamAssets: [],
  selectedItem: {
    name: 'Click on an item name to see its details',
  },
  selectedItemPrices: {
    lowest_price: 'Not available',
    median_price: 'Not available',
  },
  games: [
    { name: 'No game selected', id: 0 },
    { name: 'Team Fortress 2', id: 440 },
    { name: 'Dota 2', id: 570 },
  ],
};

const getters = {
  steamInventory: (vuexState) => {
    const inventory = vuexState.steamInventory;

    return inventory;
  },
  games: (vuexState) => {
    const games = vuexState.games;

    return games;
  },
  steamAssets: (vuexState) => {
    const assets = vuexState.steamAssets;

    return assets;
  },
  selectedItem: (vuexState) => {
    const item = vuexState.selectedItem;

    return item;
  },
  selectedItemPrices: (vuexState) => {
    const item = vuexState.selectedItemPrices;

    return item;
  },
  getImagePathForItem: (vuexState, imagePath) => config.STEAM_IMAGES_URL + imagePath,
};

const mutations = {
  removeAllFromSteamInventory: (vuexState) => {
    vuexState.steamInventory.splice(0, vuexState.steamInventory.length);
  },
  addNewItemsToSteamInventory: (vuexState, newItems) => {
    vuexState.steamInventory.push(...newItems);
  },
  setSteamInventoryRequestError: (vuexState, newError) => {
    const stateObject = vuexState;

    stateObject.steamInventoryRequestError = { ...newError };
  },
  removeAllFromSteamAssets: (vuexState) => {
    vuexState.steamAssets.splice(0, vuexState.steamAssets.length);
  },
  addNewItemsToSteamAssets: (vuexState, newItems) => {
    vuexState.steamAssets.push(...newItems);
  },
  setSteamAssetsRequestError: (vuexState, newError) => {
    const stateObject = vuexState;

    stateObject.steamAssetsRequestError = { ...newError };
  },
  setSelectedItem: (vuexState, newItem) => {
    const stateObject = vuexState;

    stateObject.selectedItem = { ...newItem };
  },
  setSelectedItemPrices: (vuexState, newItem) => {
    const stateObject = vuexState;
    let newItemObject = newItem;

    if (!newItemObject.lowest_price) {
      newItemObject = {
        lowest_price: 'Not available',
        median_price: 'Not available',
      };
    }

    stateObject.selectedItemPrices = { ...newItemObject };
  },
};

const actions = {
  getSteamInventory(context, params) {
    const steamApiUrl = `http://steamcommunity.com/inventory/${params.steamId}/${params.gameId}/2?l=english&count=5000`;
    const requestUrl = config.API_URL + encodeURIComponent(steamApiUrl);

    axios.get(requestUrl)
    .then((response) => {
      context.commit('removeAllFromSteamInventory');
      context.commit('addNewItemsToSteamInventory', response.data.descriptions);
    })
    .catch((error) => {
      context.commit('setSteamInventoryRequestError', error);
    });
  },
  getSteamAssetsForGame(context, params) {
    const steamApiUrl = `https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/?appid=${params.gameId}&key=${config.STEAM_API_KEY}`;
    const requestUrl = config.API_URL + encodeURIComponent(steamApiUrl);

    axios.get(requestUrl)
    .then((response) => {
      context.commit('removeAllFromSteamAssets');
      context.commit('addNewItemsToSteamAssets', response.data.result.assets);
    })
    .catch((error) => {
      context.commit('setSteamAssetsRequestError', error);
    });
  },
  setSelectedItem(context, params) {
    const steamPricesApiUrl = `http://steamcommunity.com/market/priceoverview/?currency=3&appid=${params.appid}&market_hash_name=${params.market_hash_name}`;
    const requestUrl = config.API_URL + encodeURIComponent(steamPricesApiUrl);
    context.commit('setSelectedItem', params);

    axios.get(requestUrl)
    .then((response) => {
      context.commit('setSelectedItemPrices', response.data);
    })
    .catch((error) => {
      context.commit('setSteamAssetsRequestError', error);
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
