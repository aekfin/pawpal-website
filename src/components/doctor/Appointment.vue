<template>
  <div class="appointment">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>ค้นหาสมุดวัคซีน</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card text-center animated fadeIn">
      <div class="col-xs-12 no-padding">
        <input type="text" class="form-control input-lg" v-model="searchText" placeholder="รหัสการนัดหมาย, ชื่อเจ้าของสุนัข, ชื่อสุนัข, เบอร์โทร, ที่อยู่">
        <span class="btn btn-brown btn-lg" @click="Searching()">ค้นหา</span>
      </div>
      <div class="alert alert-danger col-xs-12" v-if="alert[0].name" :class="alert[0].class">{{alert[0].name}}</div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card m-t-20 animated fadeIn" v-if="searchResult">
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    Loading
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}],
      searchText: null,
      appointments: [],
      users: [],
      searchResult: false,
      isLoading: false
    }
  },
  methods: {
    SearchDogs () {
      this.alert[1].name = 'ไม่พบสมาชิกดังกล่าว'
      this.alert[1].class = 'animated fadeIn'
      this.dogList = ['A', 'B', 'C']
      this.dog.model = this.dogList[0]
    },
    Searching () {
      this.searchResult = true
      this.isLoading = true
      this.$http.post('/api/search-appointment/', { 'search': this.searchText, 'hospital_id': this.$store.getters.GetHospital.id }).then(response => {
        console.log(response)
        this.isLoading = false
      }, error => {
        console.log(error)
        this.isLoading = false
      })
    },
    AcceptCode () {
      if (this.codeUrl) {
        this.$router.push('/doctor/vaccination/' + this.codeUrl)
      } else {
        this.alert[0].name = 'ไม่พบการนัดหมายดังกล่าว'
        this.alert[0].class = 'animated fadeIn'
      }
    }
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  
  .appointment {
    .white-card {
      padding: 30px 15px;
    }
    .alert {
      margin-top: 5px;
      margin-bottom: 0px;
    } 
    .btn{
      width: 20%;
      display: inline-block;
      margin-top: -5px;
      transition-duration: 0.5s;
    }
    .spinner {
      margin: 30px auto;
    }
    .form-control:focus, .form-control:active {
      padding-left: 17px;
    }
  }
</style>
