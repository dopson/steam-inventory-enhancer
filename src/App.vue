<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">Steam Inventory Enhancer</h1>
    </md-toolbar>

    <div class="main-content">
      <router-view></router-view>
    </div>
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
