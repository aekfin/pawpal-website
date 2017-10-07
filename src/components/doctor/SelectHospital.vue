<template>
  <div id="select-hospital" @keyup.enter = "SelectHospital">
    <div class="title-dark-blue-card">
      <div class="container">
        <h2>โปรดเลือกโรงพยาบาลของท่าน</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 white-card animated fadeIn">
      <div class="banner col-xs-12">
        <div>หากท่านไม่พบโรงพยาบาลของท่านหรือเกิดปัญหาใดๆ กรุณาติดต่อผู้ดูแลระบบ</div>
      </div>
      <div class="card-content animated fadeIn">
        <loading class="col-xs-12" v-if="isLoading"></loading>
        <div v-else>
          <div class="col-xs-12">
            <select class="form-control input-lg" v-model="hospital">
              <option v-for="(hospital, i) in hospitals" :key="hospital.name" :value="hospital">{{hospital.name}}</option>
            </select>
          </div>
          <div class="col-xs-12 m-t-20 text-right">
            <button input class="btn btn-success btn-lg" @click="SelectHospital">เลือกโรงพยาบาลนี้</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'
import Loading from '@/components/common/Loading.vue'
import appFooter from '@/components/common/Footer.vue'

export default {
  components: {
    NavBar, Loading, appFooter
  },
  data () {
    return {
      hospitals: [],
      hospital: null,
      alert: null,
      isLoading: true
    }
  },
  created () {
    this.fetchHospital()
  },
  methods: {
    fetchHospital () {
      this.$http.get('/api/hospital/')
        .then(function (response) {
          this.hospitals = response.body
          this.hospital = this.hospitals[0]
          this.isLoading = false
        })
        .catch(function (error) {
          this.alert = 'ระบบไม่สามารถเข้าถึงข้อมูลโรงพยาบาลได้'
          console.log(error)
        })
    },
    SelectHospital () {
      this.$store.commit('SelectHospital', this.hospital)
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss">
  #select-hospital {
    .white-card {
      padding-bottom: 30px;
      .form-control {
        width: 100%;
      }
      .card-content {
        padding: 0px 50px;
      }
    }
  }
</style>
