import config from '../config/config';

export default {
  getImagePathForItem: function getImagePathForItem(itemSource) {
    return config.STEAM_IMAGES_URL + itemSource;
  },
};
