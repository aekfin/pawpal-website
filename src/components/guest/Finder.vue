<template>
  <div id="finder">
    <div class="title-red-purple-card">
      <div class="container">
        <h2> เพิ่มข้อมูลสุนัขที่พบ</h2>
      </div>
    </div>
    <div class="container animated fadeIn">
      <!-- Top Side -->
      <div class="col-xs-12 white-card">
        <h3>อัพโหลดรูปภาพสุนัข*</h3>
        <div class="alert alert-danger hide">รูปควรมีขนาดเป็นสี่เหลี่ยมจตุรัส</div>
        <input class="form-control input-lg" style="display: none;" type="file" name="pic" accept="image/*" id="input-img" @change="SelectImage"> 
        <div class="text-center" style="padding-top: 10px;">
          <div class="img-container" v-for="(image, i) in images" :key="i">
            <img :src="image.modified_src" :id="'img'+i" class="img-preview animated fadeIn" alt="preview-image" @click="CroppingImage(image.original_src)" />
            <span class="btn btn-danger" @click="RemoveImage(image)">ลบรูปภาพ</span>
          </div>
          <div class="img-container">
            <img id="select_picture" :src="imgPlaceholder" class="img-placeholder" @click="BrowseFile" />
            <span class="btn btn-primary" @click="BrowseFile">เลือกรูปภาพ</span>
          </div>
        </div>
      </div>
      <!-- Left Side -->
      <div class="col-sm-12 col-md-6 no-padding">
        <div class="col-xs-12 white-card">
          <h3>ข้อมูลสุนัข</h3>
          <app-form :form="dogForm"></app-form>
        </div> 
        <div class="col-xs-12 white-card">
          <h3>ข้อมูลติดต่อ</h3>
          <app-form :form="finderForm"></app-form> 
        </div>
      </div>
      <!-- Right Side -->
      <div class="col-sm-12 col-md-6 card-right-side">
        <div class="col-xs-12 white-card" style="min-height: 585px;">
          <div class="col-xs-12">
            <h3>สถานที่ที่พบ</h3>
          </div>
          <div class="col-xs-12">
            <gmap-map ref="maps" :center="center" :zoom="zoom" style="width: 500px; height: 300px; margin-bottom: 20px;">
              <gmap-marker ref="theMarker" :position="position" :clickable="true" :draggable="true" @dragend="DragEnd">
              </gmap-marker>
            </gmap-map>
          </div>
          <div class="col-xs-12">
            <div class="input-group width-100" style="padding-bottom: 10px">
              <div class="input-group-addon input-lg" style="width: 120px">สถานที่</div>
              <gmap-place-input :default-place="location" :selectFirstOnEnter="true" :className="'form-control input-lg input-place'"
                @place_changed="setPlace">
              </gmap-place-input>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="input-group" style="width: 100%; padding-bottom: 10px" v-for="(date, i) in dateForm" :key="i">
              <div class="input-group-addon input-lg" style="width: 120px">{{date.name}}<span v-if="date.require">*</span></div>
              <datepicker v-if="date.type === 'date'" v-model="date.model" :bootstrapStyling="false" :input-class="'date-input width-100'" :wrapper-class="'width-100'"></datepicker>
              <input v-if="date.type === 'time'" class="form-control input-lg" type="time" v-model = "date.model">
            </div>
          </div>
        </div>
      </div>
      <loading :theme="'light'" :size="'normal'" v-if="isLoading" class="col-xs-12" style="margin-top: 30px;"></loading>
      <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4" style="margin-top: 20px;" v-else>
        <div class="btn btn-success btn-lg" @click="AddFoundDog()">เพิ่มสุนัขที่พบ</div>
      </div>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="errorModal"></simplert>
    <el-dialog
      title = "กรุณาตั้งรหัสผ่าน"
      :visible.sync="passwordModal"
      :close-on-click-modal = "false"
      :show-close="true"
      size="tiny">
      <div class="text-left" style="padding: 10px;">
        *รหัสผ่านนี้จะใช้สำหรับการลบประกาศสุนัขที่ท่านแจ้งพบ เมื่อท่านไม่ต้องการแจ้งสุนัขที่พบแล้วหรือสุนัขที่ท่านพบได้คืนสู่เจ้าของแล้ว
      </div>
      <loading :theme="'dark'" :size="'small'" v-if="isLoading"></loading>
      <div v-else>
        <div class="input-group" style="width: 100%;">
          <input class="form-control input-lg" style="border-radius: 3px;" v-model="confirmPassword" @keyup.enter="Adding()"/>
        </div>
        <div class="text-center" style="padding-top: 20px;">
          <div class="btn btn-success btn-lg" :disabled="confirmPassword.length < 4" @click="Adding()">ยืนยันรหัสผ่าน</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title = "แก้ไขรูปภาพ"
      :visible.sync="cropModal"
      :close-on-click-modal = "false"
      :show-close="false"
      top="5%"
      size="large">
      <div class="text-center">
        <vue-croppie 
            ref="croppieRef" 
            :viewport="{ width: 300, height: 300, type: 'square' }"
            :enableOrientation="true">
        </vue-croppie>
        <button class="btn btn-primary btn-lg" @click="Rotate(90)"> หมุนรูปภาพ</button>
        <button class="btn btn-success btn-lg" style="width: auto" @click="Crop">ยืนยันการแก้ไข</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import appForm from '@/components/guest/components/Form.vue'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import EXIF from 'exif-js/exif.js'
  import Datepicker from 'vuejs-datepicker'
  import VueCroppie from 'vue-croppie'
  import Simplert from 'vue2-simplert'
  import Loading from '@/components/common/Loading.vue'

  var key = 'AIzaSyCgh_Mj91pf2vXMF2GYVNG5-V-etzaBggg'
  Vue.use(VueCroppie)
  Vue.use(VueGoogleMaps, {
    load: {
      key: key,
      v: '3',
      libraries: 'places'
    }
  })

  export default {
    name: 'finder',
    components: {
      appForm, Datepicker, Simplert, Loading
    },
    created () {
      this.dogForm[0].model = this.dogForm[0].options[0]
    },
    methods: {
      showPosition (position) {
        this.latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.MoveToLocation()
      },
      MoveToLocation () {
        this.center = this.latLng
        this.position = this.latLng
        this.zoom = 14
        this.GetGoogleLocation()
      },
      DragEnd (place) {
        this.latLng = {
          lat: place.latLng.lat(),
          lng: place.latLng.lng()
        }
        this.MoveToLocation()
      },
      setPlace (place) {
        console.log(place)
        this.latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.MoveToLocation()
      },
      GetGoogleLocation () {
        this.$http.get('/geocode/json?latlng=' + this.latLng.lat + ',' + this.latLng.lng + '&key=' + key).then(response => {
          this.location = response.body.results[0].formatted_address
          console.log(response.body.results)
        }, error => {
          console.log(error)
        })
      },
      BrowseFile () {
        $('#input-img').click()
      },
      SelectImage (event) {
        var self = this
        var file = event.target.files[0]
        var imagefile = file.type
        var match = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
        this.cropModal = true
        if (match.indexOf(imagefile) === -1) {
          alert('Please select image file (.jpg .png .gif)')
          return false
        } else if (file.size > 100000 * 1024) {
          alert('Limit file size at 100 mb')
          return false
        } else {
          var reader = new FileReader()
          var image = new Image()
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            image.src = e.target.result
            image.onload = function () {
              EXIF.getData(image, function () {
                var allMetaData = EXIF.getAllTags(this)
                self.images.push({type: file, exif: allMetaData, original_src: image.src, modified_src: image.src})
                self.CheckImageExif()
                self.CroppingImage(image.src)
              })
            }
          }
        }
      },
      FindImage () {
        for (var i = 0; i < this.images.length; i++) {
          if (this.images[i].original_src === this.cropImage) {
            return i
          }
        }
        return -1
      },
      CroppingImage (imageSrc) {
        this.cropModal = true
        this.cropImage = imageSrc
        var options = {
          url: this.cropImage
        }
        var index = this.FindImage()
        if (this.images[index].crop) {
          options.points = this.images[index].crop.points
          options.zoom = this.images[index].crop.zoom
        }
        this.$refs.croppieRef.bind(options)
      },
      Crop () {
        let options = {
          type: 'base64',
          format: 'jpeg',
          size: { width: 300, height: 300 }
        }
        var index = this.FindImage()
        this.$refs.croppieRef.result(options, (output) => {
          this.images[index].modified_src = output
        })
        this.$refs.croppieRef.get((data) => {
          this.images[index].crop = data
        })
        this.$refs.croppieRef.setZoom(1.5)
        this.cropModal = false
      },
      RemoveImage (image) {
        for (var i = 0; i < this.images.length; i++) {
          if (image === this.images[i]) {
            this.images.splice(i, 1)
            break
          }
        }
      },
      Rotate (rotationAngle) {
        this.$refs.croppieRef.rotate(rotationAngle)
      },
      ConvertDMSToDD (degrees, minutes, seconds, direction) {
        var dd = degrees + minutes / 60 + seconds / (60 * 60)
        if (direction === 'S' || direction === 'W') {
          dd = dd * -1
        } // Don't do anything for N or E
        return dd
      },
      CheckImageExif () {
        for (var i = 0; i < this.images.length; i++) {
          if (this.images[i].exif.ExifVersion) {
            this.AutoFill(this.images[i])
            break
          }
        }
      },
      AutoFill (image) {
        if (image.exif.DateTimeOriginal) {
          var stringDate = image.exif.DateTimeOriginal.substring(0, 10)
          stringDate = stringDate.replace(/:/g, '/')
          this.dateForm.model = new Date(stringDate)
        }
        if (image.exif.GPSLatitude && image.exif.GPSLongitude) {
          var lat = []
          var lng = []
          for (var i = 0; i < image.exif.GPSLatitude.length; i++) {
            lat.push(image.exif.GPSLatitude[i].numerator / image.exif.GPSLatitude[i].denominator)
            lng.push(image.exif.GPSLongitude[i].numerator / image.exif.GPSLongitude[i].denominator)
          }
          this.latLng = {
            lat: this.ConvertDMSToDD(lat[0], lat[1], lat[2], image.exif.GPSLatitudeRef),
            lng: this.ConvertDMSToDD(lng[0], lng[1], lng[2], image.exif.GPSLongitudeRef)
          }
          this.MoveToLocation()
        }
      },
      RequireForm () {
        if (this.images.length === 0) {
          return 'รูปภาพสุนัข'
        }
        if (!this.location) {
          return 'สถานที่ที่พบ'
        }
        for (var i = 0; i < this.dogForm.length; i++) {
          if (this.dogForm[i].model === '' && this.dogForm[i].require) {
            return this.dogForm[i].name
          }
        }
        for (i = 0; i < this.finderForm.length; i++) {
          if (this.finderForm[i].model === '' && this.finderForm[i].require) {
            return this.finderForm[i].name
          }
        }
        return 'pass'
      },
      AddFoundDog () {
        if (this.RequireForm() === 'pass') {
          this.passwordModal = true
        } else {
          let obj = {
            title: 'ท่านกรอกข้อมูลไม่ครบถ้วน',
            message: 'โปรดใส่ <b><u>' + this.RequireForm() + '</u>*</b> ให้เรียบร้อย',
            customCloseBtnText: 'เข้าใจแล้ว',
            customCloseBtnClass: 'btn btn-danger',
            type: 'error',
            onClose: this.onClose
          }
          this.$refs.errorModal.openSimplert(obj)
        }
      },
      Adding () {
        if (this.confirmPassword.length > 3) {
          var images = []
          for (var i = 0; i < this.images.length; i++) {
            images.push(this.images[i].modified_src)
          }
          var dog = {
            'color_primary': this.dogForm[1].model,
            'color_secondary': this.dogForm[2].model,
            'dominance': this.dogForm[3].model,
            'image': images,
            'name': this.finderForm[0].model,
            'tel': this.finderForm[1].model,
            'note': this.finderForm[2].model,
            'date_found': (this.dateForm[0].model).toISOString().substring(0, 10),
            'time_found': this.dateForm[1].model,
            'longtitude': this.latLng.lng,
            'location': this.location,
            'breed': this.dogForm[0].model,
            'latitude': this.latLng.lat,
            'password': this.confirmPassword
          }
          this.isLoading = true
          this.$http.post('/api/v2/found/', dog).then(response => {
            this.isLoading = false
            window.scrollTo(0, 0)
            this.$router.push('/found-dog')
          }, error => {
            console.log(error)
          })
        }
      }
    },
    mounted () {
      if (this.first) {
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this.showPosition)
        this.first = false
      }
      this.GetGoogleLocation()
    },
    data () {
      return {
        confirmPassword: '',
        location: null,
        latLng: {lat: 13.7563309, lng: 100.50176510000006},
        center: {lat: 13.7563309, lng: 100.50176510000006},
        position: {lat: 13.7563309, lng: 100.50176510000006},
        zoom: 12,
        first: true,
        isLoading: false,
        passwordModal: false,
        cropModal: false,
        cropImage: null,
        images: [],
        imgPlaceholder: require('@/assets/finder/dog-upload.png'),
        dateForm: [
          { name: 'เมื่อวันที่', placeholder: '', type: 'date', model: new Date(), require: true },
          { name: 'เวลา', placeholder: 'กรุณาระบบเวลาที่พบ', type: 'time', model: '00:00:00', require: false }
        ],
        dogForm: [
          { name: 'สายพันธุ์', placeholder: '', type: 'selector', model: '', require: true, options: this.$store.state.breeds },
          { name: 'สีขนหลัก', placeholder: 'น้ำตาล', type: 'text', model: '', require: true },
          { name: 'สีขนรอง', placeholder: 'ขาว', type: 'text', model: '', require: false },
          { name: 'ลักษณะเด่น', placeholder: 'มีจุดสีขาวใหญ่บริเวณขาหลังด้านซ้าย', type: 'text', model: '', require: false }
        ],
        finderForm: [
          { name: 'ชื่อผู้พบ', placeholder: 'นาย สมชาย', type: 'text', model: '', require: true },
          { name: 'เบอร์ติดต่อ', placeholder: '08x-xxx-xxxx', type: 'tel', model: '', require: true },
          { name: 'หมายเหตุ', placeholder: 'ติดต่อได้หลังจากเวลา 18.00น.', type: 'text', model: '', require: false }
        ]
      }
    }
  }
</script>

<style lang="scss">
  #finder {
    padding-bottom: 50px;
    .white-card {
      margin-top: 15px;
    }
    h3 {
      margin-top: 5px;
    }
    .input-place {
      font-weight: normal;
      font-size: 16px;
      width: 152%;
      border-radius: 0px 3px 3px 0px;
      border: 1px solid #49392C;
    }
    .btn-success {
      width: 100%;
    }
    .btn-dark {
      font-size: 18px;
      border-radius: 3px 0px 0px 3px !important;
    }
    .input-place:focus, .input-place:active {
      border: 1px solid #49392C;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 74, 64, 0.6);
    }
    .latlng-label {
      font-size: 12px;
    }
    .show {
      display: inline-block;
    }
    img {
      max-width: 100%; /* This rule is very important, please do not ignore this! */
    }
    .img-container {
      width: 200px;
      height: 250px;
      margin: 5px;
      text-align: center;
      display: inline-block;
    }
    .img-preview {
      width: 200px;
      height: 200px;
      padding: 2px;
      margin-bottom: 5px;
      display: inline-block;
      cursor: pointer;
      border-radius: 5px;
      transition-duration: 0.5s;
    }
    .img-placeholder {
      @extend .img-preview;
      border: 3px dashed #E1C4A5;
    }
    .img-placeholder:hover {
      border: 3px dashed #ce9e6c;
    } 
    .alert-danger {
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .el-dialog--tiny {
      width: 30vw;
    }
    .simplert__header {
      padding-bottom: 10px;
    }
    .simplert__footer {
      padding-top: 0px;
    }
    .dialog-footer {
      text-align: center;
    }
    .el-dialog__title {
      font-size: 24px;
    }
    .input-group {
      label {
        margin-bottom: 0px;
      }
    }
    .input-group-addon {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .form-control {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      float: none;
    }
    .btn-found {
      border: 3px solid white;
      color: white;
      background-color: #84bf09;
      font-size: 20px;
      width: 30%;
    }
    .btn-found:hover {
      color: white;
      background-color: lighten(#84bf09, 10%);
    }
    .disabled {
      user-select: none;
    }
  }
  @media only screen and (max-width: 992px) {
    #finder {
      .simplert__content {
        width: 100%;
      }
      .el-dialog {
        width: 80vw;
      }
    }
  }
</style>
