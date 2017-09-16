<template>
  <div id="vaccicationLog">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>ประวัติการฉีดวัคซีนของ</h2>
      </div>
    </div>
    <div class="container">
      <div class="white-card">
        <h3>รายละเอียดของสุนัข</h3>
        <!-- <dog-information></dog-information> -->
      </div>
      <div class="white-card">
        <h3>ประวัติการฉีดวัคซีนของสุนัข</h3>
      </div>
    </div>
  </div>
</template>

<script>
import DogInformation from '@/components/doctor/components/DogInformation.vue'

export default {
  components: {
    DogInformation
  }
}
</script>

<style lang="scss">
  #vaccicationLog {
    .white-card {
      padding: 20px;
      h3 {
        margin-top: 0px;
        margin-bottom: 0px;
      }
    }
  }
</style>
