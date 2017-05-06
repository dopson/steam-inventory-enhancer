import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../config/config';

Vue.use(Vuex);

const state = {
  apiUrl: config.API_URL,
  steamInventoryRequestError: '',
  steamInventory: [],
};

const getters = {
  steamInventory: (vuexState) => {
    const inventory = vuexState.steamInventory;

    return inventory;
  },
};

const mutations = {
  removeAllFromSteamInventory: (vuexState) => {
    const actualState = vuexState;

    actualState.steamInventory = [];
  },
  setAllItemsToSteamInventory: (vuexState, newItems) => {
    const actualState = vuexState;

    actualState.steamInventory = newItems;
  },
  setSteamInventoryRequestError: (vuexState, newError) => {
    const actualState = vuexState;

    actualState.steamInventoryRequestError = newError;
  },
};

const actions = {
  getSteamInventory({ commit, vuexState }, steamId, gameId) {
    const steamApiUrl = `http://steamcommunity.com/inventory/${steamId}/${gameId}/2`;
    const requestUrl = vuexState.apiUrl + steamApiUrl;

    axios.get(requestUrl)
    .then((response) => {
      commit('setAllItemsToSteamInventory', response.descriptions);
    })
    .catch((error) => {
      commit('setSteamInventoryRequestError', error);
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
