import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config/config';

Vue.use(Vuex);

const state = {
  apiUrl: config.API_URL,
  steamInventoryRequestError: '',
  steamInventory: [],
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
};

const mutations = {
  removeAllFromSteamInventory: (vuexState) => {
    const actualState = vuexState;

    actualState.steamInventory = [];
  },
  setAllItemsToSteamInventory: (vuexState, newItems) => {
    const actualState = vuexState;

    Object.assign(actualState.steamInventory, newItems);
  },
  setSteamInventoryRequestError: (vuexState, newError) => {
    const actualState = vuexState;

    Object.assign(actualState.steamInventoryRequestError, newError);
  },
};

const actions = {
  getSteamInventory(context, params) {
    const steamApiUrl = `http://steamcommunity.com/inventory/${params.steamId}/${params.gameId}/2?l=english&count=5000`;
    const requestUrl = config.API_URL + steamApiUrl;

    axios.get(requestUrl)
    .then((response) => {
      context.commit('setAllItemsToSteamInventory', response.data.descriptions);
    })
    .catch((error) => {
      context.commit('setSteamInventoryRequestError', error);
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
