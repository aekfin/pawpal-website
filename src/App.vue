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
  import 'font-awesome/css/font-awesome.min.css'
  import locale from 'element-ui/lib/locale/lang/en'

  Vue.use(Bootstrap)
  Vue.use(Animate)
  Vue.use(ElementUI, { locale })

export default {
    name: 'app'
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Mitr:200,300,400,500,600,700&amp;subset=latin-ext,thai,vietnamese");

  #app {
    font-family: "Mitr", sans-serif;
    font-size: 16px;
    background-color: #E0CDBA;
    color: #4c4c4c;
  }

  .btn {
    transition-duration: 0.5s;
  }

  h1, h2, h3, h4, h5 {
    color: #4c4c4c;
  }

  .white-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .dark-brown-card {
    background-color: #8F6853;
    color: white;
    width: 100%;
    padding-top: 35px;
    height: 100px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin-bottom: 10px;
    h1, h2, h3, h4, h5 {
      color: white;
      margin: 0px;
    }
  }

  .card-right-side {
    padding-left: 20px;
    padding-right: 0px;
  }

  .bottom-line {
    border-bottom: 3px solid #A58675;
    padding-bottom: 20px;
  }

  .no-padding {
    padding-left: 0px;
    padding-right: 0px;
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
    .card-right-side{
      padding-left: 0px;
    }
  }
</style>
