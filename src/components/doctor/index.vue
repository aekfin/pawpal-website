<template>
  <div id="doctor">
    <nav-bar :type = "'dark'"></nav-bar>
    <router-view class="router-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'
import appFooter from '@/components/common/Footer.vue'

export default {
  components: {
    NavBar, appFooter
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  $theme-color: #487B5B;

  #doctor {
    .white-card {
      margin-top: 3%;
      padding: 0px 0px 50px 0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
        border-radius: 3px;
        height: 44px;
        width: 75%;
        display: inline-block;
      }
      .btn-brown {
        color: white;
        background-color: #6e5642;
      }
      .btn-brown:hover, .btn-brown:focus, .btn-brown:active {
        background-color: $brown-color;
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
      .form-control:focus, .form-control:active {
        border: 0px solid $brown-color;
        box-shadow: 0px 0px 10px rgb(97,76,59);
      }
      .router-link-active {
        font-size: 18px;
      }
    }
    .not-found {
      font-size: 30px;
      font-weight: bold;
      margin: 30px 0px;
    }
    .dog-sm-view {
      font-size: 30px;
      font-weight: bold;
      display: inline-block;
      cursor: pointer;
      color: lighten(yellow, 10%);
      transition-duration: 0.5s;
      .img-dog {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 2px solid lighten(yellow, 10%);
        margin-top: -15px;
        margin-left: 10px;
        position: absolute;
      }
    }
    .dog-sm-view:hover {
      color:lighten(yellow, 30%);
      .img-dog {
        border: 2px solid lighten(yellow, 30%);
        filter: brightness(120%);
      }
    }
  }
</style>
