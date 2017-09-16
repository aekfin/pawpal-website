<template>
  <div id="guest">
    <nav-bar :type = "'dark'"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  #guest {
    .white-card {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
  }
</style>
