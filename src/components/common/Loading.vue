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
    @import '../../../static/loading.css'
  }
</style>
