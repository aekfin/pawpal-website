<template>
  <div class="SelectHospital">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>เลือกโรงพยาบาลของคุณ</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 white-card animated fadeIn">
      <div class="banner col-xs-12">
        <span>กรุณาใส่รหัสการนัดหมายของคนไข้ เพื่อความรวดเร็วในการบันทึกประวัติการฉีดวัคซีน</span>
      </div>
      <div class="card-content">
        <div class="col-xs-12">
          <div class="col-xs-12 no-padding">
            <input type="text" class="form-control input-lg yellow" v-model="searchText" placeholder="รหัสการนัดหมาย, ชื่อเจ้าของสุนัข, เบอร์โทร, ที่อยู่">
            <span class="btn btn-warning btn-lg" @click="Searching()">ค้นหา</span>
          </div>
          <div class="alert alert-danger col-xs-12" v-if="alert[0].name" :class="alert[0].class">{{alert[0].name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    fetchHospital () {
      this.$http.get('/api/hospital/')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">

</style>
