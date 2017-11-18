<template>
  <div id="login" @keyup.enter = "Login">
    <nav-bar :type = "'dark'"></nav-bar>
    <div class="router-view">
      <div class="title-blue-card">
        <div class="container">
          <h2>เข้าสู่ระบบ</h2>
        </div>
      </div>
      <div class="container col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 white-card animated fadeIn">
        <div class="banner col-xs-12">
          <div>หากท่านไม่สามารถเข้าสู่ระบบได้หรือเกิดปัญหาใดๆ กรุณาติดต่อผู้ดูแลระบบ</div>
        </div>
        <div class="card-content">
          <div class="col-xs-12">
            <div class="input-label">อีเมลล์</div>
            <input type="email" class="form-control input-lg" name="username" v-model="user.email">
          </div>
          <div class="col-xs-12 m-t-10">
            <div class="input-label">รหัสผ่าน</div>
            <input type="password" class="form-control input-lg" name="password" v-model="user.password">
          </div>
          <div class="col-xs-12 m-t-10">
            <div class="alert alert-danger" v-if="alert">{{alert}}</div>
          </div>
          <div class="col-xs-12 margin-t-20 text-right">
            <button class="btn btn-primary btn-lg" @click="Login">เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
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
  created () {
  },
  methods: {
    CheckRequired () {
      if (this.user.email && this.user.password) {
        this.alert = null
        return true
      } else {
        if (!this.user.email) {
          this.alert = 'กรุณากรอกอีเมลล์'
          return false
        } else {
          this.alert = 'กรุณากรอกรหัสผ่าน'
          return false
        }
      }
    },
    Login () {
      if (this.CheckRequired()) {
        this.$http.post('/api/login/', this.user)
          .then(function (response) {
            console.log(response)
            this.$store.commit('Login', response.body)
            this.isLoading = true
            window.location.href = '/doctor'
          })
          .catch(function (error) {
            if (error.body && error.body.detail === 'Please logout.') {
              this.$router.push('/logout')
            } else {
              this.alert = 'คุณกรอกอีเมลล์หรือรหัสผ่านไม่ถูกต้อง'
            }
            console.log(error)
          })
      }
    }
  },
  data () {
    return {
      alert: null,
      isLoading: false,
      user: {
        email: null, password: null
      }
    }
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  
  #login {
    .white-card {
      margin-top: 3%;
      padding: 0px 0px 30px 0px;
      input {
        border-radius: 3px;
      }
      .hospital-label {
        line-height: 30px;
        font-size: 24px;
      }
      .banner {
        height: 80px;
      }
      .card-content {
        padding: 0px 50px;
      }
      .input-label {
        font-size: 20px;
        font-weight: bold;
        color: $brown-color;
      }
      .form-control {
        border: 1px solid $brown-color;
        color: $brown-color;
      }
      .btn {
        width: 50%;
      }
      .btn-primary {
        background-color: #69A5AD;
        border: 1px solid #69A5AD;
        transition-duration: 0.5s;
      }
      .btn-primary:hover, .btn-primary:active, .btn-primary:focus {
        background-color: #477b82;
      }
      .alert {
        text-align: center;
        margin-bottom: 0px;
      }
    }
  }
</style>
