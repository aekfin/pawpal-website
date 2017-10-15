<template>
  <div id="loading">
    <div class="paw">
      <img class = "paw-left-1" :width = "width" :height = "height" :src="image" />
      <img class = "paw-right-1" :width = "width" :height = "height" :src="image" />
      <img class = "paw-left-2" :width = "width" :height = "height" :src="image" />
      <img class = "paw-right-2" :width = "width" :height = "height" :src="image" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['theme', 'size'],
  created () {
    switch (this.theme) {
      case 'light':
        this.image = require('../../assets/paw_print_white.png')
        break
      default:
        this.image = require('../../assets/paw_print_brown.png')
    }
    switch (this.sizes) {
      case 'small':
        this.width = 50
        this.height = 50
        break
      default:
        this.width = 100
        this.height = 100
    }
  },
  data () {
    return {
      image: null,
      width: null,
      height: null
    }
  }
}
</script>

<style lang="scss">
  #loading {
    width: 100%;
    height: 240px;
    text-align: center;
    .paw {
      height: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .paw > img {
      opacity: 0;
      margin: 20px;
      display: inline-block;
      transform: rotate(90deg);
      position: relative;
    }
    .paw > .paw-left-1 {
      animation: walking 5s 0s infinite;
    }
    .paw > .paw-right-1 {
      top: 100px;
      animation: walking 5s 1s infinite;
    }
    .paw > .paw-left-2 {
      animation: walking 5s 2s infinite;
    }
    .paw > .paw-right-2 {
      top: 100px;
      animation: walking 5s 3s infinite;
    }
    @keyframes walking {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 1.0;
      }
      60% {
        opacity: 0;
      }
    }
  }
</style>
