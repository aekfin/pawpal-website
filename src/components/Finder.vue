<template>
  <div class="finder">
    <nav-bar :type = "'dark'"></nav-bar>
    <div class="title-green-card">
      <div class="container">
        <h2> เพิ่มข้อมูลหมาที่พบ</h2>
      </div>
    </div>
    <div class="container animated fadeIn">
      <!-- Top Side -->
      <div class="col-xs-12 white-card">
        <h3>อัพโหลดรูปภาพหมา</h3>
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
        <div class="col-xs-12 no-padding white-card">
          <div class="col-xs-12">
            <h3>สถานที่ที่พบ</h3>
          </div>
          <div class="col-xs-12" style="padding-bottom: 10px;">
            <div>ละติจูด : <span class="latlng-label">{{this.latLng.lat}}</span></div>
            <div> ลองติจูด: <span class="latlng-label">{{this.latLng.lng}}</span></div>
          </div>
          <div class="col-xs-12">
            <gmap-map ref="maps" :center="center" :zoom="zoom" style="width: 500px; height: 300px; margin-bottom: 20px;">
              <gmap-marker ref="theMarker" :position="position" :clickable="true" :draggable="true" @dragend="DragEnd">
              </gmap-marker>
            </gmap-map>
            <button class="btn btn-default btn-dark btn-lg col-xs-5" @click="ShowGooglePlace">
              <span v-if="!showGooglePlace" class="glyphicon glyphicon-unchecked"></span>
              <span v-if="showGooglePlace" class="glyphicon glyphicon-check"></span>
              ค้นหาด้วยสถานที่
            </button>
            <div class="col-xs-7" style="padding-left: 5px;" :class="placeGoogle">
              <gmap-place-input :default-place="place" :selectFirstOnEnter="true" :className="'form-control input-lg input-place'"
                @place_changed="setPlace">
              </gmap-place-input>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="input-group" style="width: 100%; padding-bottom: 10px">
              <div class="input-group-addon input-lg" style="width: 120px">{{dateForm.name}}</div>
              <datepicker v-model="dateForm.model" :bootstrapStyling="false" :input-class="'date-input width-100'" :wrapper-class="'width-100'"></datepicker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title = "แก้ไขรูปภาพ"
      :visible.sync="cropModal"
      :close-on-click-modal = "false"
      :show-close="false"
      size="large">
      <div class="text-center">
        <vue-croppie 
            ref="croppieRef" 
            :viewport="{ width: 300, height: 300, type: 'square' }"
            :enableOrientation="true">
        </vue-croppie>
        <el-button size="large" type="primary" @click="Rotate(90)"> หมุนรูปภาพ</el-button>
        <el-button size="large" type="success" @click="Crop">ยืนยันการแก้ไข</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import appForm from '@/components/finder/Form.vue'
  import navBar from '@/components/common/Navbar.vue'
  import VueResource from 'vue-resource'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import $ from 'jquery'
  import EXIF from 'exif-js/exif.js'
  import Datepicker from 'vuejs-datepicker'
  import VueCroppie from 'vue-croppie'

  Vue.use(VueResource)
  Vue.use(VueCroppie)
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC5Zj99qcTk6zn3_TBnr7gMdO6oxbCxhJ8',
      v: '3',
      libraries: 'places'
    }
  })

  export default {
    name: 'finder',
    components: {
      appForm, navBar, Datepicker
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
      ShowGooglePlace () {
        if (this.showGooglePlace) {
          this.placeGoogle = 'animated fadeOutLeft'
        } else {
          this.placeGoogle = 'animated fadeInLeft show'
        }
        this.showGooglePlace = !this.showGooglePlace
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
          alert('Limit file size at 1000 kb')
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
          format: 'jpeg'
        }
        var index = this.FindImage()
        this.$refs.croppieRef.result(options, (output) => {
          this.images[index].modified_src = output
        })
        this.$refs.croppieRef.get((data) => {
          this.images[index].crop = data
        })
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
      }
    },
    mounted () {
      if (this.first) {
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this.showPosition)
        this.first = false
      }
    },
    data () {
      return {
        showGooglePlace: false,
        placeGoogle: 'hide',
        place: '',
        latLng: {lat: '...', lng: '...'},
        center: {lat: 13.7563309, lng: 100.50176510000006},
        position: {lat: 13.7563309, lng: 100.50176510000006},
        zoom: 12,
        first: true,
        cropModal: false,
        cropImage: null,
        images: [],
        imgPlaceholder: require('@/assets/finder/dogupload3.png'),
        dateForm: { name: 'เมื่อวันที่', placeholder: '', type: 'date', model: new Date() },
        dogForm: [
          { name: 'พันธุ์', placeholder: '', type: 'selector', model: '', options: ['Yorkshire Terrier', 'Maltese', 'French Bulldog', 'Pug', 'Chihuahua', 'Dachshund', 'Shih-Tzu', 'Papiyong', 'English Bulldog', 'Basset Hound', 'Pomeranian', 'Jack Russell Terrier', 'Shiba Inu', 'Alaskan Malamute', 'บางแก้ว', 'ไทยหลังอาน', 'Boston Terrier', 'Bull Terrier', 'Welsh Corgi', 'Cocker Spaniel', 'Dachshund', 'Cavalier King Charles Spaniel', 'Schnauzer', 'Poodle', 'French Bulldog', 'Mastiff', 'Maltese', 'Collie', 'Basset Hound', 'Akita', 'St. Bernard', 'Scottish Terrier', 'Shar-pei', 'Dalmatians', 'Chow Chow', 'Pekingese'] },
          { name: 'สีหลัก', placeholder: 'น้ำตาล', type: 'text', model: '' },
          { name: 'สีรอง', placeholder: 'ขาว', type: 'text', model: '' },
          { name: 'ลักษณะเด่น', placeholder: 'มีจุดสีขาวใหญ่บริเวณขาหลังด้านซ้าย', type: 'text', model: '' }
        ],
        finderForm: [
          { name: 'ชื่อผู้พบ', placeholder: 'นาย สมชาย', type: 'text', model: '' },
          { name: 'เบอร์ติดต่อ', placeholder: '08x-xxx-xxxx', type: 'tel', model: '' },
          { name: 'หมายเหตุ', placeholder: 'เจอบริเวณสวนหลังวัด', type: 'text', model: '' }
        ]
      }
    }
  }
</script>

<style lang="scss">
  .finder {
    padding-bottom: 50px;
  }
  h3 {
    margin-top: 5px;
  }
  .input-place {
    font-weight: normal;
    font-size: 18px;
    width: 100%;
    height: 46px;
    border-radius: 10px;
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
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__title {
    font-size: 24px;
  }
</style>
