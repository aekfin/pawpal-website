<template>
  <div id="app">
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
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
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        this.$Progress.start()
        next()
      })
      this.$router.afterEach((to, from) => {
        this.$Progress.finish()
      })
      setTimeout(() => {
        $('#paw-loading').css('display', 'none')
      }, 1000)
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
    @import "../static/component.scss";
    font-family: "Mitr", sans-serif;
    font-size: 16px;
    background-color: #cbb78e;
    color: #4c4c4c;
    min-height: 100%;
    overflow: hidden;

    .router-view {
      min-height: 100vh;
    }

    h1, h2, h3, h4, h5 {
      color: #4c4c4c;
    }

    .not-found {
      font-weight: bold;
      margin: 30px 0px;
      padding: 40px;
      padding-bottom: 50px;
      height: 100%;
      color: #49392C;
      img {
        width: 150px;
        height: 150px;
        cursor: default;
      }
      img:hover {
        box-shadow: none;
      }
      h3 {
        color: #49392C;
        margin-top: 10px;
        font-size: 40px;
      }
      h5 {
        color: lighten(#49392C, 10%);
        font-size: 20px;
      }
    }
    
    .card-right-side {
      padding-left: 20px;
      padding-right: 0px;
    }

    .no-padding {
      padding-left: 0px;
      padding-right: 0px;
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
    .form-control {
      border: 1px solid lighten($form-theme-color, 20%);
    }
    .form-control:focus, .form-control:active {
      border: 1px solid $form-theme-color;
      box-shadow: 0 0 7px lighten($form-theme-color, 20%);
    }
    .input-group {
      input {
        color: lighten($form-theme-color, 10%);
      }
      select {
        color: lighten($form-theme-color, 10%);
      }
      .input-group-addon {
        background-color: $form-theme-color;
        border: 1px solid $form-theme-color;
        color: white;
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
  }
  // bootstrap grid sm
  @media only screen and (max-width: 992px) {
    #app {
      .card-right-side{
        padding-left: 0px;
      }
    }
  }
</style>
