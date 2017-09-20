<template>
  <div id="guest">
    <nav-bar :type = "'dark'"></nav-bar>
    <router-view class="router-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'
import appFooter from '@/components/common/Footer.vue'

export default {
  components: {
    NavBar, appFooter
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
