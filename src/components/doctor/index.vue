<template>
  <div class="doctor">
    <nav-bar :type = "'dark'"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  $theme-color: #487B5B;

  .doctor {
    .white-card {
      margin-top: 3%;
      padding: 0px 0px 50px 0px;
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
      .router-link-active {
        font-size: 18px;
      }
    }
  }
</style>
