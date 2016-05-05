<template>
  <div id="wrapper">
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<style lang="postcss">
@import './reset.css';

#wrapper {
  height: 100%;
  padding: 20px;
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}
</style>
