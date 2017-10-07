<template>
  <div id="appointment">
    <div class="title-light-green-card">
      <div class="container">
        <h2>สมุดการนัดหมาย</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import Simplert from 'vue2-simplert'

export default {
  components: {
    Loading, Simplert
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  
  #appointment {

  }
</style>
