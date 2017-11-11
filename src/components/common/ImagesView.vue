<template>
  <div id="image-view">
    <el-carousel height="224px" :autoplay="false" indicator-position="none" type="card" :interval="10000000" arrow="always">
      <el-carousel-item v-for="image in images" :key="image.id">
        <img class="img-rounded" :src="image.image"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'imageView',
  props: ['images'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  #image-view {
    .img-rounded {
      width: 220px;
      height: 220px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: none;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: none;
    }
    .el-carousel__arrow {
      background-color: lighten(#49392C, 30%);
    }
    .el-carousel__arrow:hover {
      background-color: lighten(#49392C, 15%);
    }
  }
</style>
