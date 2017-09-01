<template>
  <div id="app">
    <v-app toolbar>
      <v-toolbar class="blue" dark>
        <v-toolbar-title>Steam inventory enhancer</v-toolbar-title>
      </v-toolbar>
      <main>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
  .main-content {
    padding: 16px;
  }
</style>
