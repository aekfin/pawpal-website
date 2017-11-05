<template>
  <div id="loading">
    <div :class="paw">
      <img class = "paw-left-1" :src="image" />
      <img class = "paw-right-1" :src="image" />
      <img class = "paw-left-2" :src="image" />
      <img class = "paw-right-2" :src="image" />
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
    switch (this.size) {
      case 'small':
        this.paw = 'paw paw-sm'
        break
      default:
        this.paw = 'paw'
    }
  },
  data () {
    return {
      paw: '',
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
    text-align: center;
    @import '../../../static/loading.css'
  }
</style>
