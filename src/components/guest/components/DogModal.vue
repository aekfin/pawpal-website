<template>
  <div id="DogModal" v-if="dog">
    <!-- Modal -->
    <div class="modal fade" id="detail_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><i class="material-icons">&#xE14C;</i></button>
            <h3>รายละเอียดสุนัข 
              <div class="btn btn-danger btn-sm" style="margin-left: 5px; margin-top: -5px;" data-toggle="modal" data-target="#password_modal" v-if="type === 'found'">ลบสุนัข</div>
              <div class="btn btn-info btn-sm" style="margin-left: 5px; margin-top: -5px;" data-toggle="modal" data-target="#password_modal" v-if="type === 'adopt'">รับอุปการะสุนัข</div>
            </h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-6 text-right">
                <ImagesView :images="dog.img"></ImagesView>
              </div>
              <div class="col-xs-12 col-sm-6 text-left">
                <div><div class="dog_bold">สายพันธุ์: </div><div class="dog_regular">{{dog.breed}}</div></div>
                <div><div class="dog_bold">สีหลัก: </div><div class="dog_regular">{{dog.color_primary}}</div></div>
                <div><div class="dog_bold">สีรอง: </div><div class="dog_regular"><span v-if="dog.color_secondary">{{dog.color_secondary}}</span><span v-else>ไม่มี</span></div></div>
                <div><div class="dog_bold">ลักษณะเด่น: </div><div class="dog_regular">{{dog.dominance}}</div></div>                
                <div class="dog_bold">สถานที่: </div><div class="dog_regular">
                  <span v-if="type === 'missing'">{{dog.location_lost}}</span>
                  <span v-else>{{dog.location}}</span>
                </div>
                <div style="margin-top: 15px;"><div class="dog_bold">ชื่อ: </div><div class="dog_regular">{{dog.finder.name}}</div></div>
                <div>
                  <div class="dog_bold">เบอร์ติดต่อ: </div>
                  <div class="dog_regular" v-if="type === 'missing'">{{dog.finder.tel_1}}<span v-if="dog.finder.tel_2"> ({{dog.finder.tel_2}})</span></div>
                  <div class="dog_regular" v-else>{{dog.finder.tel}}</div>
                </div>
                <div>
                  <div class="dog_bold">วันที่: </div>
                  <div class="dog_regular"><span v-if="type === 'missing'">{{DateFormat(dog.datetime_lost)}}</span><span v-else>{{DateFormat(dog.date_found)}}</span></div>
                </div>
                <div v-if="type === 'missing'"><div class="dog_bold">อีเมลล์: </div><div class="dog_regular">{{dog.finder.email}}</div></div>
                <div v-else><div class="dog_bold">หมายเหตุ: </div><div class="dog_regular">{{dog.finder.note}}</div></div>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="type === 'found'">
            <h4 style="color: white;">สุนัขที่มีลักษณะคล้ายคลึงกัน</h4>
            <loading :theme="'light'" :size="'normal'" v-if="isLoading"></loading>
            <div class="similar-dog" v-for="sd in similarDogs" :key="sd.name" v-else>
              <img class="img-rounded img-rounded-sm" :src="sd.image">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="password_modal" role="dialog">
      <div class="modal-dialog modal-md" style="top: 5vh;" role="document">
        <div class="modal-content" style="padding: 30px;">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="ResetInput()"><i class="material-icons">&#xE14C;</i></button>
            <h3 style="margin: 0px;">กรุณากรอกรหัสผ่าน</h3>
          </div>
          <div class="modal-body">
          <div class="input-group" style="width: 100%;">
            <div class="text-left" style="padding: 10px;">
              *กรุณากรอกรหัสผ่านที่ท่านได้ทำการตั้งเมื่อตอนที่เพิ่มหมาที่พบ
            </div>
            <div class="input-group" style="width: 100%;">
              <input class="form-control input-lg" style="border-radius: 3px;" v-model="password" v-if="!wrongPassword"/>
              <input class="form-control input-lg" style="border-radius: 3px; color: red;" @click="wrongPassword = false" v-model="password" v-else/>
            </div>
            <div style="height: 23px; color: red;" v-if="wrongPassword">รหัสผ่านไม่ถูกต้อง</div>
            <div style="height: 23px;" v-else></div>
            <div class="text-center" style="margin-top: 10px;">
              <div class="btn btn-success btn-lg" style="width: 100%;" @click="ConfirmPassword()">ยืนยันรหัสผ่าน</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImagesView from '@/components/common/ImagesView.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'DogModal',
  props: ['type', 'dog'],
  components: {
    ImagesView, Loading
  },
  updated () {
    if (this.dogID !== this.dog.id) {
      this.dogID = this.dog.id
      var type = this.type
      if (type === 'missing') {
        type = 'lost'
      }
      this.$http.get('/api/v2/' + type + '/' + this.dog.id + '/').then(response => {
        this.similarDogs = response.body.similar_dog
        this.dog.location = response.body.location
      }, error => {
        console.log(error)
      })
    }
  },
  methods: {
    DateFormat (date) {
      date = new Date(date)
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    ConfirmPassword () {
      switch (this.type) {
        case 'found':
          this.RemoveDog()
          break
        case 'adopt':
          this.AdoptDog()
          break
      }
    },
    AdoptDog () {
      this.$http.post('/api/v2/adopt/take/', { 'adopt_id': this.dogID, 'password': this.password }).then(response => {
        console.log(response.body)
        window.location.reload()
      }, error => {
        console.log(error)
        this.wrongPassword = true
      })
    },
    RemoveDog () {
      this.$http.post('/api/v2/found/delete/', { 'found_id': this.dogID, 'password': this.password }).then(response => {
        console.log(response.body)
        window.location.reload()
      }, error => {
        console.log(error)
        this.wrongPassword = true
      })
    },
    ResetInput () {
      this.password = ''
      this.wrongPassword = false
    }
  },
  data () {
    return {
      passwordModal: false,
      password: '',
      wrongPassword: false,
      dogID: null,
      similarDogs: [],
      isLoading: false
    }
  }
}
</script>

<style lang='scss'>
  #DogModal {
    h3 {
      margin-top: 10px;
      font-size: 28px;
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
      height: 300px;
      width: 300px;
      border-radius: 3px;
    }
    .img-rounded-sm {
      height: 150px;
      width: 150px;
      border-radius: 3px;
      border: 3px solid white;
    }
    .modal-content {
      border: none;
      padding-bottom: 0px !important;
    }
    .modal-header {
      border-bottom: none;
      padding-bottom: 0px;
    }
    .modal-body {
      padding-top: 20px;
      padding-bottom: 40px;
    }
    .modal-footer {
      text-align: left;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 30px;
      background-color: #49392C;
      min-height: 240px;
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
      height: 24px;
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .similar-dog {
      width: 20%;
      display: inline-block;
      padding-left: 5px;
      padding-right: 5px;
    }
    .dog_regular {
      width: 65%;
      height: 24px;
      display: inline-block;
      font-size: 18px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dog_bold_more {
      @extend .dog_bold;
      height: 20*2px;    
    }
    .dog_regular_more {
      @extend .dog_regular;
      height: 20*2px;    
    }
    .el-dialog__title {
      font-size: 24px;
    }
  }
</style>
