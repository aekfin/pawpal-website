<template>
  <div class="app-navbar">
    <nav class="navbar" :class="navbar">
      <div class="container-fluid">
          <div class="navbar-header">
            <router-link class="navbar-brand leftLink" to="/">
                <span :class="brandTitle">PawPal</span>
            </router-link>
          </div>          
          <ul class="nav navbar-nav navbar-left">
            <li v-for="ll in leftList" :key="ll.name"><router-link :class="rightLink" :to="ll.url" >{{ll.name}}</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-for="rl in rightList" :key="rl.name"><router-link :class="rightLink" :to="rl.url">{{rl.name}}</router-link></li>
          </ul>
      </div>
    </nav>      
  </div>
</template>

<script>
export default {
  name: 'navbar',
  created () {
    if (this.type === 'dark') {
      this.navbar = 'navbar-dark'
      this.brandTitle = 'brand-title-dark'
      this.rightLink = 'right-link-dark'
    }
  },
  mounted () {
    this.rightList = []
    if (this.$store.getters.IsLogin) {
      this.rightList.push({ name: 'สมุดวัคซีน', url: '/doctor/vaccination' })
      this.rightList.push({ name: 'สมุดนัดหมาย', url: '/doctor/appointment' })
      this.rightList.push({ name: 'ออกจากระบบ', url: '/logout', action: 'logout' })
    } else {
      this.rightList.push({ name: 'เข้าสู่ระบบ', url: '/login' })
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
      rightList: [],
      leftList: [
        { name: 'เพิ่มหมาที่พบ', url: '/finder' },
        { name: 'ประกาศหมาที่พบ', url: '/found-dog' },
        { name: 'ประกาศหมาสูญหาย', url: '/missing-dog' }
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
</style>
