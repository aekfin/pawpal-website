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
            <input type="text" class="form-control input-lg" v-model="codeUrl">
            <span class="btn btn-warning btn-lg" @click="AcceptCode()">ยืนยัน</span>
          </div>
          <div class="input-label col-xs-12 or-label"><span>หรือ</span></div>
          <router-link :to="noCodeUrl" class="col-xs-12 no-padding btn btn-lg btn-success m-t-10">เข้าสู่สมุดวัคซีนโดยไม่ใช้รหัสการนัดหมาย</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    AcceptCode () {
      if (this.codeUrl) {
        this.$router.replace('/doctor/vaccination/' + this.codeUrl)
      }
    }
  },
  data () {
    return {
      codeUrl: null,
      noCodeUrl: '/doctor/vaccination/0'
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
      padding: 0px 0px 30px 0px;
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
      .form-control:focus,.form-control:active {
        border: 0px solid $brown-color;
        box-shadow: 0px 0px 10px rgb(	105, 165, 173);
      }
      .manual {
        width: 100%;
      }
      .btn-warning{
        width: 20%;
        display: inline-block;
        margin-top: -5px;
        transition-duration: 0.5s;
      }
      .alert {
        margin-bottom: 0px;
      }
      .or-label {
        font-weight: normal;
        margin: 30px 0px 20px 0px;
        text-align: center;
        span {
          font-size: 24px;
          padding: 5px 15px;
          color: white;
          background-color: $brown-color;
          border-radius: 50%;
        }
      }
      .router-link-active {
        font-size: 18px;
      }
    }
  }
</style>
