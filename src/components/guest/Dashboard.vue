<template>
  <div id="dashboard">
    <div class="container white-card" style="margin-top: 30px; margin-bottom: 30px;">
      <thailand-map></thailand-map>
    </div>
  </div>
</template>

<script>
  import ThailandMap from '@/components/guest/components/ThailandMap.vue'
  export default {
    components: {
      ThailandMap
    }
  }
</script>

<style lang="scss">

</style>