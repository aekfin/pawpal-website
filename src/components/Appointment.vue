<template>
  <div class="appointment">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>สมุดนัดหมาย</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 white-card animated fadeIn">
      <div class="banner col-xs-12">
        <span>กรุณาใส่รหัสการนัดหมายของคนไข้ เพื่อความรวดเร็วในการบันทึกประวัติการฉีดวัคซีน</span>
      </div>
      <div class="card-content">
        <div class="col-xs-12">
          <div class="input-label">กรุณากรอกรหัสการนัดหมาย</div>
          <div class="col-xs-12 no-padding">
            <input type="text" class="form-control input-lg yellow" v-model="codeUrl">
            <span class="btn btn-warning btn-lg" @click="AcceptCode()">ยืนยัน</span>
          </div>
          <div class="alert alert-danger col-xs-12" v-if="alert[0].name" :class="alert[0].class">{{alert[0].name}}</div>
          <div class="input-label col-xs-12 or-label"><span>หรือ</span></div>
          <div>
            <div class="input-label">กรุณากรอกรหัสสมาชิกของคนไข้</div>
            <div class="col-xs-12 no-padding">
              <input type="text" class="form-control input-lg blue" v-model="searchText">
              <span class="btn btn-primary btn-lg" @click="SearchDogs()">ค้นหาคนไข้</span>
            </div>
          </div>
          <div class="alert alert-danger col-xs-12" v-if="alert[1].name" :class="alert[1].class">{{alert[1].name}}</div>
          <div v-if="dogList.length > 0" class="animated fadeIn">
            <div class="input-label m-t-10 col-xs-12 no-padding">กรุณาเลือกสุนัขที่จะฉีดวัคซีน</div>
            <div class="col-xs-12 no-padding">
              <select class="form-control input-lg green" v-model="dog.model">
                <option v-for="(dog, i) in dogList" :key="dog" :value="dog">{{dog}}</option>
              </select> 
              <span class="btn btn-default btn-lg" style="margin-top: -10px;">ดูรายละเอียด</span>
              <span class="btn btn-success btn-lg" style="margin-top: -10px;" @click="MakeAppointment()">ยืนยัน</span>
            </div>
          </div>
        </div>
      </div>
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
    MakeAppointment () {
      this.codeUrl = 0
      this.AcceptCode()
    },
    AcceptCode () {
      if (this.codeUrl) {
        this.$router.replace('/doctor/vaccination/' + this.codeUrl)
      } else {
        this.alert[0].name = 'ไม่พบการนัดหมายดังกล่าว'
        this.alert[0].class = 'animated fadeIn'
      }
    }
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}],
      codeUrl: null,
      noCodeUrl: '/doctor/vaccination/0',
      searchText: '',
      dog: {model: ''},
      dogList: []
    }
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  $theme-color: #487B5B;
  
  .appointment {
    .white-card {
      margin-top: 3%;
      padding: 0px 0px 50px 0px;
      .card-content {
        padding: 80px 50px 50px 50px;
      }
      .banner {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 16px;
        margin-bottom: 30px;
        color: white;
        padding: 30px 10%;
        background-color: $theme-color
      }
      .input-label {
        font-size: 20px;
        font-weight: bold;
        color: $brown-color;
        margin-bottom: 5px;
        span {
          font-size: 18px;
        }
      }
      .form-control {
        border: 1px solid $brown-color;
        color: $brown-color;
        width: 75%;
        display: inline-block;
      }
      .yellow {
        border: 1px solid #e4ba24;
      }
      .blue {
        border: 1px solid #69A5AD;
      }
      .green {
        border: 1px solid #84bf09;
        width: 55%;
      }
      .form-control:focus,.form-control:active {
        border: 0px solid $brown-color;
        box-shadow: 0px 0px 10px rgb(	105, 165, 173);
      }
      .btn{
        width: 20%;
        display: inline-block;
        margin-top: -5px;
        transition-duration: 0.5s;
      }
      .btn-default {
        border: 1px solid #84bf09;
      }
      .alert {
        margin-top: 5px;
        margin-bottom: 0px;
      }
      .or-label {
        font-weight: normal;
        margin: 30px 0px;
        text-align: center;
        span {
          font-size: 24px;
          padding: 5px 15px;
          color: white;
          background-color: $theme-color;
          border-radius: 50%;
        }
      }
      .router-link-active {
        font-size: 18px;
      }
    }
  }
</style>
