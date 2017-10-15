<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Bootstrap from 'bootstrap-vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  import Animate from 'animate.css/animate.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap/dist/js/bootstrap.js'
  import locale from 'element-ui/lib/locale/lang/en'
  import VueResource from 'vue-resource'
  import Cookie from 'js-cookie'
  import MeterialIcons from 'material-design-icons'
  import 'material-design-icons/iconfont/material-icons.css'

  Vue.use(Bootstrap)
  Vue.use(Animate)
  Vue.use(ElementUI, { locale })
  Vue.use(VueResource)
  Vue.use(MeterialIcons)
  Vue.http.headers.common['X-CSRFToken'] = Cookie.get('csrftoken')
  
export default {
    name: 'app',
    created () {
    }
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Mitr:400,700&amp;subset=latin-ext,thai,vietnamese");
  $form-theme-color: #49392C;

  body, html {
    height: 100%;
  }

  #app {
    @import "../static/theme.scss";
    font-family: "Mitr", sans-serif;
    font-size: 16px;
    background-color: darken(#E0CDBA, 25%);
    color: #4c4c4c;
    min-height: 100%;
    overflow: hidden;

    .router-view {
      min-height: 100vh;
    }

    h1, h2, h3, h4, h5 {
      color: #4c4c4c;
    }

    .card-right-side {
      padding-left: 20px;
      padding-right: 0px;
    }

    .no-padding {
      padding-left: 0px;
      padding-right: 0px;
    }
    .btn-lg {
      height: 47px;
    }
    .input-lg {
      height: 47px !important;
    }
    .m-t-10 {
      margin-top: 10px !important;
    }
    .m-t-15 {
      margin-top: 15px !important;
    }
    .m-t-20 {
      margin-top: 20px !important;
    }
    .m-t-25 {
      margin-top: 25px !important;
    }
    .m-t-30 {
      margin-top: 30px !important;
    }

    .input-group {
      input {
        color: $form-theme-color;
      }
      select {
        color: $form-theme-color;
      }
      .form-control {
        border: 1px solid $form-theme-color;
      }
      .input-group-addon {
        background-color: $form-theme-color;
        border: 1px solid $form-theme-color;
        color: white;
      }
      .form-control:focus {
        border: 1px solid black;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 74, 64, 0.6);
      }
    }

    @keyframes fadeInTo {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    .animated-t {
      animation-duration: 1s;
    }

    .fadeInTo {
      animation-name: fadeInTo;
    }

    // bootstrap grid sm
    @media only screen and (max-width: 992px) {
      #app {
        background-color: darken(#E0CDBA, 10%);
      }
      .card-right-side{
        padding-left: 0px;
      }
    }
  }
</style>
