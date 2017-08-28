<template>
  <div class="appointment">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>สมุดวัคซีน</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card animated fadeIn">
      <div class="col-xs-12 no-padding text-center">
        <input type="text" class="form-control input-lg" v-model="searchText" placeholder="รหัสการนัดหมาย, ชื่อเจ้าของสุนัข, เบอร์โทร, ที่อยู่">
        <span class="btn btn-brown btn-lg" @click="Searching()">ค้นหา</span>
      </div>
      <div class="alert alert-danger col-xs-12" v-if="alert[0].name" :class="alert[0].class">{{alert[0].name}}</div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card animated fadeIn" style="margin-top: 20px;">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    SearchDogs () {
      this.alert[1].name = 'ไม่พบสมาชิกดังกล่าว'
      this.alert[1].class = 'animated fadeIn'
      this.dogList = ['A', 'B', 'C']
      this.dog.model = this.dogList[0]
    },
    Searching () {
    },
    AcceptCode () {
      if (this.codeUrl) {
        this.$router.push('/doctor/vaccination/' + this.codeUrl)
      } else {
        this.alert[0].name = 'ไม่พบการนัดหมายดังกล่าว'
        this.alert[0].class = 'animated fadeIn'
      }
    }
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}],
      searchText: null,
      appointments: [],
      users: []
    }
  }
}
</script>

<style lang="scss">
  
  .appointment {
    .white-card {
      padding: 25px 15px;
    }
    .alert {
      margin-top: 5px;
      margin-bottom: 0px;
    }
    .form-control {
      width: 80%;
    }
    .btn{
      width: 20%;
      display: inline-block;
      margin-top: -5px;
      transition-duration: 0.5s;
    }
  }
</style>
