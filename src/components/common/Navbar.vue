<template>
  <div id="app-navbar">
    <nav class="navbar" :class="navbar">
      <div class="container-fluid">
          <div class="navbar-header">
            <router-link class="navbar-brand leftLink" to="/">
                <div :class="brandTitle">
                  <img :src="require('@/assets/logopawpal_text2.png')" v-if="this.type === 'dark'"/>
                  <img :src="require('@/assets/logopawpal_text.png')" v-else/>
                </div>
            </router-link>
          </div>          
          <ul class="nav navbar-nav navbar-left hidden-xs hidden-sm">
            <li v-for="ll in leftList" :key="ll.name" @click="ShowInfomation(ll.action)"><router-link :class="rightLink" :to="ll.url">{{ll.name}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-xs hidden-sm">
            <li v-for="rl in rightList" :key="rl.name" @click="ShowInfomation(rl.action)"><router-link :class="rightLink" :to="rl.url">{{rl.name}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-md hidden-lg">
            <div class="slide-icon" data-toggle="collapse" data-target="#collapse-nav"><i class="fa fa-bars" aria-hidden="true"></i></div>
          </ul>
      </div>
    </nav>
    <div class="collapse" id="collapse-nav">
      <ul :class="collapse">
        <li v-for="ml in mobileList" :key="ml.name" @click="ShowInfomation(ml.action)"><router-link :to="ml.url">{{ml.name}}</router-link></li>
      </ul>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="infoModal"></simplert>      
  </div>
</template>

<script>
import Simplert from 'vue2-simplert'

export default {
  name: 'navbarVue',
  created () {
    if (this.type === 'dark') {
      this.navbar = 'navbar-dark'
      this.brandTitle = 'brand-title-dark'
      this.rightLink = 'right-link-dark'
    } else {
      this.collapse = 'collapse-nav tranparent'
    }
  },
  mounted () {
    this.rightList = []
    this.leftList = []
    if (this.$store.getters.IsLogin) {
      this.leftList.push({ name: 'ค้นหาสมุดวัคซีน', url: '/doctor/vaccination' })
      var name = this.$store.getters.GetUser.first_name + ' ' + this.$store.getters.GetUser.last_name
      if (this.$store.getters.GetUser.license) {
        name = this.$store.getters.GetUser.license
      }
      this.rightList.push({ name: name, url: '', action: 'user' })
      this.rightList.push({ name: 'ออกจากระบบ', url: '/logout', action: null })
    } else {
      this.leftList = [
        { name: 'เพิ่มสุนัขที่พบ', url: '/finder', action: null },
        { name: 'ประกาศสุนัขที่พบ', url: '/found-dog', action: null },
        { name: 'ประกาศสุนัขสูญหาย', url: '/missing-dog', action: null }
      ]
      this.rightList.push({ name: 'เข้าสู่ระบบ', url: '/login', action: null })
    }
    for (var i = 0; i < this.leftList.length; i++) {
      this.mobileList.push(this.leftList[i])
    }
    for (var j = 0; j < this.rightList.length; j++) {
      this.mobileList.push(this.rightList[j])
    }
  },
  components: {
    Simplert
  },
  methods: {
    ShowInfomation (info) {
      if (info === 'user') {
        var obj = {
          isShown: true,
          message: '<div class="doctor-info-text"><b>ลายเซ็น: </b>' + this.$store.getters.GetUser.license + '</div><div class="doctor-info-text"><b>ชื่อ: </b>' + this.$store.getters.GetUser.first_name + ' ' + this.$store.getters.GetUser.last_name + '</div><div class="doctor-info-text"><b>เบอร์ติดต่อ: </b>' + this.$store.getters.GetUser.tel_1 + '</div><div class="doctor-info-text"><b>โรงพยาบาล: </b>' + this.$store.getters.GetHospital.name + '</div>',
          customClass: 'info-modal',
          type: 'info',
          customIconUrl: require('@/assets/doctor/doctor-placeholder.png'),
          customCloseBtnText: 'ปิดหน้าต่าง',
          onClose: this.onClose
        }
        this.$refs.infoModal.openSimplert(obj)
      }
    }
  },
  props: ['type'],
  data () {
    return {
      navbar: '',
      brandTitle: 'brand-title',
      rightLink: 'right-link',
      collapse: 'collapse-nav',
      mobileList: [],
      rightList: [],
      leftList: [
        { name: 'เพิ่มสุนัขที่พบ', url: '/finder', action: null },
        { name: 'ประกาศสุนัขที่พบ', url: '/found-dog', action: null },
        { name: 'ประกาศสุนัขสูญหาย', url: '/missing-dog', action: null }
      ]
    }
  }
}
</script>

<style lang="scss">
    #app-navbar {
    .navbar {
      margin-bottom: 0px;
    }
    .navbar-dark {
      background-color: #49392C; 
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.3);
      border-radius: 0px;
    }
    .info-modal {
      color: black;
      margin-bottom: auto;
    }
    .brand-title {
      color: #ffffff;
      font-size: 30px;
      font-weight: bold;
      padding-left: 15px;
      margin-top: -7px;
      img {
        width: 120px;
      }
    }
    .brand-title-dark {
      @extend .brand-title;
      color: white;
    }
    .brand-title:hover {
      color: #441002;
    }
    .brand-title-dark:hover {
      color: white;
    }
    .left-link {
      display: inline-block;
      cursor: pointer;
      font-size: 16px;
      color: #b1b1b1;
    }
    .left-link:hover {
      color: #441002;
    }
    .left-link:focus {
      color: #441002;
    }
    .right-link {
      display: inline-block;
      cursor: pointer;
      font-size: 16px;
      color: #b1b1b1;
    }
    .right-link:hover {
      color: #441002;
    }
    .right-link-dark {
      @extend .right-link;
      color: white;
    }
    .right-link-dark:hover {
      color: #441002;
      background-color: white;
    }
    .right-link-dark:focus {
      color: #441002;
      background-color: white;
    }
    .navbar-nav > li > a {
      padding-top: 18px;
      padding-bottom: 15px;
    }
    .slide-icon {
      color: white;
      margin-top: 3px;
      font-size: 30px;
      margin-right: 20px;
      padding-left: 10px;
      padding-right: 10px;    
      cursor: pointer;
    }
    .slide-icon:hover, .slide-icon:active, .slide-icon:focus {
      color: white;
    }
    .collapse-nav {
      background-color: white;
      padding-top: 10px;
      padding-left: 0px;
      margin-bottom: 0px;
      list-style-type: none;
      background-color: #594536;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.3);
      li {
        border-bottom: 1px solid white;
        padding-left: 40px;
        a {
          color: white;
        }
        a:hover, a:active, a:focus {
          text-decoration: none;
        }
      }
      li:hover, li:active, li:focus {
        background-color: #795e49;
      }
    }
    .tranparent {
      background-color: transparent;
    }
    .simplert__content {
      margin: 50px auto auto auto;
    }
    .simplert__header {
      padding-bottom: 10px;
    }
    .simplert__icon {
      height: 125px;
      width: 125px;
      img {
        height: 125px;
        width: 125px;
      }
    }
    .doctor-info-text {
      width: 80%;
      overflow: hidden;
      margin: 0px auto;
      text-align: left;
    }
    @media only screen and (max-width: 770px) {
      .navbar-header {
        float: left;
      }
      .navbar-right {
        float: right;
      }
    }
  }
</style>
