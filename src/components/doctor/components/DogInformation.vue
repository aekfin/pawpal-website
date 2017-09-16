<template>
  <div id = "dog-information">
    <div class="img-dog">
      <images-view :images="dog.image"></images-view>
    </div>
    <div class="dog-info">
      <div><b>ชื่อสุนัข: </b>{{dog.name}}</div>
      <div><b>พันธุ์: </b>{{dog.breed}}</div>
      <div><b>สีขน: </b>{{dog.color_primary}}, {{dog.color_secondary}}</div>
      <div><b>ลักษณะเด่น: </b>{{dog.dominance}}</div>
      <div><b>เพศ: </b>{{dog.gender === 1 ? 'ผู้' : 'เมีย'}}</div>
      <div><b>อายุ: </b>{{dog.age}} ปี</div>
      <div><b>กรุ๊ปเลือด: </b>{{dog.blood_type}}</div>
      <div><b>น้ำหนัก: </b>{{dog.current_weight}} กิโลกรัม</div>
      <div><b>เกิดเมื่อ: </b>{{new Date(dog.birth_day).toDateString()}}</div>
      <div><b>เจ้าของสุนัข: </b>{{account.first_name}} {{account.last_name}}</div>
    </div>
  </div>
</template>

<script>
import ImagesView from '@/components/common/ImagesView.vue'

export default {
  components: {
    ImagesView
  },
  props: ['dog', 'account'],
  created () {
    console.log(this.dog)
    console.log(this.account)
  }
}
</script>

<style lang="scss">
  #dog-information {
    text-align: center;
    .img-dog {
      width: 50%;
      vertical-align: top;
      margin-left: auto;
      padding-right: 10px;
      text-align: right;
      overflow: hidden;
      display: inline-block;
    }
    .dog-info {
      font-size: 16px;
      margin-left: 20px;
      width: 40%;
      text-align: left;
      padding-left: 10px;
      display: inline-block;
    }
  }
</style>
