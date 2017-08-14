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
  import axios from 'axios'

  Vue.use(Bootstrap)
  Vue.use(Animate)
  Vue.use(ElementUI, { locale })

export default {
    name: 'app',
    created () {
      if (this.$store.getters.IsLogin) {
        var user = []
        this.$store.commit('Login', user)
      }
      axios.get('http://127.0.0.1:8000/api/?format=json')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Mitr:200,300,400,500,600,700&amp;subset=latin-ext,thai,vietnamese");
  $form-theme-color: #49392C;

  body, html {
    height: 100%;
  }

  #app {
    font-family: "Mitr", sans-serif;
    font-size: 16px;
    background-color: #CEBB94;
    color: #4c4c4c;
    min-height: 100%;
    overflow: hidden;
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

  .title-card {
    color: white;
    width: 100%;
    padding-top: 35px;
    height: 100px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.4);
    margin-bottom: 10px;
    h1, h2, h3, h4, h5 {
      color: white;
      margin: 0px;
    }
  }

  .title-brown-card {
    @extend .title-card;
    background-color: #524A40;
  }

  .title-green-card {
    @extend .title-card;
    background-color: #84bf09;
  }

  .title-blue-green-card {
    @extend .title-card;
    background-color: #62A87C;
  }

  .title-blue-card {
    @extend .title-card;
    background-color: #69A5AD;
  }

  .title-red-card {
    @extend .title-card;
    background-color: #EF3E36;
  }

  .title-yellow-card {
    @extend .title-card;
    background-color: #e4ba24;
  }

  .card-right-side {
    padding-left: 20px;
    padding-right: 0px;
  }

  .btn-dark {
    margin-bottom: 10px; 
    z-index: 10;
    background-color: $form-theme-color;
    color: white;
  }
  .btn-dark:hover, .btn-dark:active, .btn-dark:focus {
    margin-bottom: 10px; 
    z-index: 10;
    background-color: $form-theme-color;
    color: white;
  }

  .bottom-line {
    border-bottom: 3px solid #A58675;
    padding-bottom: 10px;
  }

  .no-padding {
    padding-left: 0px;
    padding-right: 0px;
  }

  .margin-t-10 {
    margin-top: 10px;
  }
  .margin-t-20 {
    margin-top: 20px;
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
    .card-right-side{
      padding-left: 0px;
    }
  }
</style>
