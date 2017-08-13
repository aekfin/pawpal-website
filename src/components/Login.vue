<template>
  <div class="login" @keyup.enter = "Login">
    <nav-bar :type = "'dark'"></nav-bar>
    <div class="dark-purple-card">
      <div class="container">
        <h2>เข้าสู่ระบบ</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 white-card animated fadeIn">
      <div class="banner col-xs-12">
        <span>หากท่านไม่สามารถเข้าสู่ระบบได้หรือต้องการสมัครใช้งาน กรุณาติดต่อผู้ดูแลระบบ</span>
      </div>
      <div class="card-content">
        <div class="col-xs-12">
          <div class="input-label">อีเมลล์</div>
          <input type="email" class="form-control input-lg" v-model="user.email">
        </div>
        <div class="col-xs-12 margin-t-10">
          <div class="input-label">รหัสผ่าน</div>
          <input type="password" class="form-control input-lg" v-model="user.password">
        </div>
        <div class="alert alert-danger margin-t-10" v-if="alert">คุณกรอกอีเมลล์หรือรหัสผ่านไม่ถูกต้อง</div>
        <div class="col-xs-12 margin-t-20 text-right">
          <input class="btn btn-primary btn-lg" @click="Login" value="เข้าสู่ระบบ" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'

export default {
  components: {
    NavBar
  },
  created () {
  },
  methods: {
    Login () {
      this.$store.commit('Login', this.user)
      this.$router.replace('/')
    }
  },
  data () {
    return {
      alert: false,
      user: {
        email: '', password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $brown-color: #524A40;
  
  .login {
    .white-card {
      margin-top: 3%;
      padding: 0px 0px 30px 0px;
      .card-content {
        padding: 80px 50px 50px 50px;
      }
      .banner {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        min-height: 80px;
        font-size: 16px;
        margin-bottom: 30px;
        color: white;
        padding: 30px 10%;
        background-color: $brown-color;
      }
      .input-label {
        font-size: 20px;
        font-weight: 500;
        color: $brown-color;
      }
      .form-control {
        border: 1px solid $brown-color;
        color: $brown-color;
      }
      .form-control:focus,.form-control:active {
        border: 0px solid $brown-color;
        box-shadow: 0px 0px 10px rgb(115,104,90);
      }
      .btn-primary {
        background-color: #735a65;
        border: 1px solid #735a65;
        min-width: 200px;
        transition-duration: 0.5s;
      }
      .btn-primary:hover, .btn-primary:active, .btn-primary:focus {
        background-color: #524048;
      }
      .alert {
        margin-bottom: 0px;
      }
    }
  }
</style>
