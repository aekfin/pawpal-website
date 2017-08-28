<template>
  <div class="app-navbar">
    <nav class="navbar" :class="navbar">
      <div class="container-fluid">
          <div class="navbar-header">
            <router-link class="navbar-brand leftLink" to="/">
                <span :class="brandTitle">PawPal</span>
            </router-link>
          </div>          
          <ul class="nav navbar-nav navbar-left hidden-xs hidden-sm">
            <li v-for="ll in leftList" :key="ll.name"><router-link :class="rightLink" :to="ll.url" >{{ll.name}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-xs hidden-sm">
            <li v-for="rl in rightList" :key="rl.name"><router-link :class="rightLink" :to="rl.url">{{rl.name}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-md hidden-lg">
            <div class="slide-icon" data-toggle="collapse" data-target="#collapse-nav"><i class="fa fa-bars" aria-hidden="true"></i></div>
          </ul>
      </div>
    </nav>
    <div class="collapse" id="collapse-nav">
      <ul :class="collapse">
        <li v-for="ml in mobileList" :key="ml.name"><router-link :to="ml.url">{{ml.name}}</router-link></li>
      </ul>
    </div>      
  </div>
</template>

<script>
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
    if (this.$store.getters.IsLogin) {
      this.rightList.push({ name: 'สมุดวัคซีน', url: '/doctor/vaccination' })
      this.rightList.push({ name: 'ออกจากระบบ', url: '/logout' })
    } else {
      this.rightList.push({ name: 'เข้าสู่ระบบ', url: '/login' })
    }
    for (var i = 0; i < this.leftList.length; i++) {
      this.mobileList.push(this.leftList[i])
    }
    for (var j = 0; j < this.rightList.length; j++) {
      this.mobileList.push(this.rightList[j])
    }
  },
  methods: {
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
        { name: 'เพิ่มสุนัขที่พบ', url: '/finder' },
        { name: 'ประกาศสุนัขที่พบ', url: '/found-dog' },
        { name: 'ประกาศสุนัขสูญหาย', url: '/missing-dog' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .navbar {
    margin-bottom: 0px;
  }
  .navbar-dark {
    background-color: #49392C; 
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.3);
    border-radius: 0px;
  }
  .brand-title {
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    padding-left: 15px;
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
  @media only screen and (max-width: 770px) {
    .navbar-header {
      float: left;
    }
    .navbar-right {
      float: right;
    }
  }
</style>
