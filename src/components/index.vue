<template>
  <div class="landing animated-t fadeInTo">
    <div class="router-view">
      <div class="cover">
        <div class="cover-black">
          <nav-bar :type = "'default'"></nav-bar>
          <div class="container text-box">
            <div class="col-xs-12 col-sm-12 text-center">
              <div class="col-xs-12 col-sm-10 col-sm-offset-1">
                <h1>PawPal Friend of Best Friend</h1>
                <h3>พอว์เพาว์ เป็นมากกว่าเพื่อน ที่เข้าใจสุนัขของคุณ</h3>
                <div class="col-xs-2 col-md-2 col-xs-offset-5 col-sm-offset-5 under-line"></div>
              </div>
              <div class="col-xs-12 col-md-8 col-md-offset-2 subtitle">
                <p>The greatness of a nation can be judged by how its animals are treated.<br>
                  (ความยิ่งใหญ่ของชาติหนึ่งชาติใดสามารถตัดสินได้ที่วิธีการที่ปฏิบัติต่อสัตว์ในชาตินั้นๆ)
                </p>
              </div>
              <div class="col-xs-12 col-sm-12 btn-section animated fadeIn">
                <router-link v-for="(btn, i) in btnList" :key="btn.url" :to="btn.url" class="btn btn-tranparent btn-lg hidden-xs hidden-sm">{{btn.name}}</router-link>
                <router-link v-for="(btn, i) in btnList" :key="btn.url" :to="btn.url" class="btn btn-tranparent hidden-md hidden-lg">{{btn.name}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 5% 0%;">
        <div class="container white-card" style="min-height: 800px;">
          <h1 class="header">
            ข้อมูลสถิติ
            <a class="btn btn-lg btn-success pull-right" style="margin: 0px;" @click="DownloadTable()" href="/api/v2/dashboard/export/">ดาวน์โหลดข้อมูล</a>
          </h1>
          <loading style="margin-top: 100px;" :theme="'dark'" :size="'normal'" v-if="isLoading"></loading>
          <dashboard v-else></dashboard>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import NavBar from '@/components/common/Navbar.vue'
  import AppFooter from '@/components/common/Footer.vue'
  import Loading from '@/components/common/Loading.vue'
  const Dashboard = () => import('@/components/guest/Dashboard.vue')
  
  export default {
    name: 'landing',
    created () {
      document.title = 'Pawpal - Friend of Best Friend'
      if (this.$store.getters.IsLogin) {
        if (this.$store.getters.IsSelectHospital) {
          this.btnList.push({ name: 'สมุดการนัดหมาย', url: '/doctor/appointment' })
          this.btnList.push({ name: 'ค้นหาสมุดวัคซีน', url: '/doctor/vaccination' })
        }
      } else {
        this.btnList = [
          { name: 'เพิ่มสุนัขที่พบ', url: '/finder' },
          { name: 'ประกาศสุนัขที่พบ', url: '/found-dog' },
          { name: 'ประกาศสุนัขรออุปการะ', url: '/adoptable-dog' },
          { name: 'ประกาศสุนัขสูญหาย', url: '/missing-dog' }
        ]
      }
      this.isLoading = false
    },
    components: {
      NavBar, AppFooter, Dashboard, Loading
    },
    data () {
      return {
        btnList: [],
        isLoading: true
      }
    }
  }
</script>

<style lang="scss">
  .landing {
    height: 100%;
    h1, h3{
      color: white !important;
    }
    .cover {
      height: 550px;
      background-image: url("../assets/landing_background2.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      color: white;
      position: relative;
    }
    .cover-black{
      background-color: rgba(0, 0, 0, 0.55);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.4)
    }
    .modal-footer {
      padding: 15px 30px;
    }
    .text-box {
      margin-top: 80px;
    }
    .under-line {
      margin-top: 5px;
      margin-bottom: 25px;
      border-bottom: 5px solid;
    }
    .subtitle {
      color: #c9c9c9;
    }
    .btn-section {
      margin-top: 50px;
      margin-bottom: 80px;
    }
    .btn {
      margin: 0px 5px;
    }
    .btn-tranparent {
      font-size: 18px !important;
    }
    h1 {
      color: white;
    }
    .container {
      .header {
        border-bottom: 5px solid #4c4c4c;
        margin-left: 30px;
        margin-right: 30px;
        padding-bottom: 15px;
        color: #4c4c4c !important;
      }
    }
    @media screen and (max-width: 992px) {
      .cover {
        height: 480px;
      }
      .text-box {
        margin-top: 25px;
      }
    }
  }
</style>
