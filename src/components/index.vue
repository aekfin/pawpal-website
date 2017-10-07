<template>
  <div class="landing animated-t fadeInTo">
    <div class="router-view">
      <div class="cover">
        <div class="cover-black">
          <nav-bar :type = "'default'"></nav-bar>
          <div class="container text-box">
            <div class="col-xs-12 col-sm-12 text-center">
              <div class="col-xs-12 col-sm-10 col-sm-offset-1">
                <h1>The greatness of a nation can be judged by how its animals are treated.</h1>
                <h3> ~ Mahatma Gandhi ~ </h3>
                <div class="col-xs-2 col-sm-2 col-xs-offset-5 col-sm-offset-5 under-line"></div>
              </div>
              <div class="col-xs-12 col-sm-8 col-sm-offset-2 subtitle">
                <p>PawPal Friend of Best Friend พอว์เพาว์ เป็นมากกว่าเพื่อน ที่เข้าใจสุนัขของคุณ</p>
              </div>
              <div class="col-xs-12 col-sm-12 btn-section animated fadeIn" style="display: none;">
                <router-link to="/finder" class="btn-start">เพิ่มสุนัขที่พบ</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="white-card" style="margin: 5%; display: none;">
        <button class="btn btn-primary btn-lg">Test12345</button>
        <button class="btn btn-success btn-lg">Test12345</button>
        <button class="btn btn-info btn-lg">Test12345</button>
        <button class="btn btn-warning btn-lg">Test12345</button>
        <button class="btn btn-danger btn-lg">Test12345</button>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import navBar from '@/components/common/Navbar.vue'
import appFooter from '@/components/common/Footer.vue'

export default {
  name: 'landing',
  created () {
  },
  components: {
    navBar, appFooter
  }
}
</script>

<style lang="scss">
  .landing {
    height: 100%;
    h1, h3{
      color: white !important;
    }
    .cover {
      height: 550px;
      background-image: url("../assets/landing_background2.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      position: relative;
    }
    .cover-black{
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.4)
    } 
    .text-box {
      margin-top: 80px;
    }
    .under-line {
      margin-top: 5px;
      margin-bottom: 25px;
      border-bottom: 5px solid;
    }
    .subtitle {
      color: #c9c9c9;
    }
    .btn-section {
      margin-top: 50px;
      margin-bottom: 80px;
    }
    .btn-start {
      padding: 10px 50px 10px 50px;
      border-radius: 50px;
      background-color: #7C5139;
      color: #E1C4A5;
      font-size: 20px;
      transition-duration: 1s;
      box-shadow: 0 0 20px #4E3326;
    }
    .btn-start:hover {
      text-decoration: none;
      color: #7C5139;
      cursor: pointer;
      background-color: #E1C4A5;   
      box-shadow: 0 0 30px white;
    }
    h1 {
      color: white;
    }
    @media screen and (max-width: 992px) {
      .cover {
        height: 600px;
      }
    }
  }
</style>
