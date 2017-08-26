<template>
  <div class="doctor">
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
  
</style>
