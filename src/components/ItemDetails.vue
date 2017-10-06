<template>
  <v-flex xs3 class="elevation-1 pb-2">
    <v-card dark>
      <v-card-media v-bind:src="imagePath(selectedItem.icon_url_large)" height="300px">
        <v-layout column class="media">
        </v-layout>
      </v-card-media>
    </v-card>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            {{selectedItem.name}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            {{selectedItem.type}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-expansion-panel focusable>
        <v-expansion-panel-content>
          <div slot="header">Descriptions</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <span v-for="description in selectedItem.descriptions">
                <v-list-tile v-if="description.value.length > 1">
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      {{description.value}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </span>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Tags</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <span v-for="tag in selectedItem.tags">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      {{tag.localized_category_name}}: {{tag.localized_tag_name}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </span>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-list>
  </v-flex>
</template>

<script>
  import { mapGetters } from 'vuex';
  import helpers from '../store/helpers';

  export default {
    name: 'itemDetails',
    data() {
      return {
        imagePath: function imagePath(iconSource) {
          return helpers.getImagePathForItem(iconSource);
        },
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
