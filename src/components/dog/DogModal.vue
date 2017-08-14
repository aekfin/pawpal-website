<template>
  <div class="Dogmodal">
    <!-- Modal -->
    <div class="modal fade" id="detail_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h3>รายละเอียดสุนัข</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-6 text-center">
                <img class="img-rounded" :src="dog.img">
              </div>
              <div class="col-xs-6 text-left">
                <div><div class="dog_bold">สายพันธุ์: </div><div class="dog_regular">{{dog.breed}}</div></div>
                <div><div class="dog_bold">สีหลัก: </div><div class="dog_regular">{{dog.color_primary}}</div></div>
                <div><div class="dog_bold">สีรอง: </div><div class="dog_regular"><span v-if="dog.color_secondary">{{dog.color_secondary}}</span><span v-else>ไม่มี</span></div></div>
                <div><div class="dog_bold_more">ลักษณะเด่น: </div><div class="dog_regular_more">{{dog.dominance}}</div></div>
                <div style="margin-top: 10px;"><div class="dog_bold">ชื่อผู้พบ: </div><div class="dog_regular">{{dog.finder.name}}</div></div>
                <div><div class="dog_bold">เบอร์ติดต่อ: </div><div class="dog_regular">{{dog.finder.tel}}</div></div>
                <div><div class="dog_bold">สถานที่ที่เจอ: </div><div class="dog_regular">{{dog.finder.place}}</div></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <h4>สุนัขที่มีลักษณะคล้ายๆคลึงกัน</h4>
            <div v-for="sd in similar_dog" :key="sd.name" style="width: 20%; display: inline-block; padding-left: 5px; padding-right: 5px;">
              <img class="img-rounded img-rounded-sm" :src="sd.img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'dog'],
  created () {
    console.log(this.dog)
  },
  data () {
    return {
      similar_dog: [
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/1.jpg'), owner: {name: 'นาย AA', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets//missing/2.jpg'), owner: {name: 'นาย AB', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลอ่อน', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets//missing/3.jpg'), owner: {name: 'นาย AC', tel: '080-000-0000', place: ''} },
        { breed: 'Malamute', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets//missing/4.jpg'), owner: {name: 'นาย AD', tel: '080-000-0000', place: ''} },
        { breed: 'Pekines', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets//missing/5.jpg'), owner: {name: 'นาย AE', tel: '080-000-0000', place: ''} }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
  h3 {
    margin-top: 10px;
  }
  h4 {
    font-size: 22px;
    font-weight: 400;
  }
  .modal-header {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .no-padding {
    padding-left: 0px;
    padding-right: 0px;
  }
  .img-rounded {
    height: 297.5px;
    width: 300px;
  }
  .img-rounded-sm {
    height: 160px;
    width: 100%;
  }
  .modal-header, .modal-body, .modal-footer {
  }
  .modal-footer {
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
  }
  .width-100 {
    width: 100%;
    display: inline-block;    
  }
  .width-50 {
    width: 50%;
    display: inline-block;
  }
  .dog_bold {
    width: 25%;
    height: 26px;
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dog_regular {
    width: 65%;
    height: 23px;
    display: inline-block;
    font-size: 16px;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dog_bold_more {
    @extend .dog_bold;
    height: 26*2px;    
  }
  .dog_regular_more {
    @extend .dog_regular;
    height: 26*2px;    
  }
</style>
