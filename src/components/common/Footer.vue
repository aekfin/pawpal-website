<template>
  <div id="app-footer">
    <footer class="col-xs-12">
      <div class="col-xs-12 col-sm-12 col-md-6 text-right no-padding">
        <div class="title">เกี่ยวกับ</div>
        <div class="content" style="margin-bottom: 3px;">สนับสนุนโดย</div>
        <div class="content">ที่ประชุมอธิการบดีแห่งประเทศไทย (ทปอ.)</div>
        <div class="content">และ สำนักงานคณะกรรมการการอุดมศึกษา (สกว)</div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-5 col-md-offset-1 text-right no-padding">
        <div class="title">ข้อมูลติดต่อ</div>
        <div class="content" style="margin-bottom: 3px;">pawpal.dog@gmail.com</div>
        <div class="content" style="margin-bottom: 3px;">SAIG : software and application interest group</div>
        <div class="content">King Mongkut's Institute of Technology Ladkrabang</div>
      </div>
      <div class="pull-right" style="margin-top: 10px; color: lightgray; font-size: 12px;">
        Copyright @ PawPal 2017 by SAIG
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  #app-footer {
    footer {
      height: 100%;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 20px 5% 10px 5%;
      background-color: #49392C;
      color: white;
      .title {
        font-size: 18px;
        border-bottom: 2px solid lightgray;
        padding-bottom: 5px;
        margin-bottom: 10px;
      }
      .content {
        font-size: 14px;
      }
    }
  }
</style>
