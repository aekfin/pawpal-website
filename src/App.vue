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
  background-color: white;
  color: #4c4c4c;
}

h1, h2, h3, h4, h5 {
  color: #4c4c4c;
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
</style>
