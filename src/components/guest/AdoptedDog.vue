<template>
  <div id="adoptDog">
    <div class="title-red-card">
      <div class="container">
        <h2>ประกาศสุนัขที่รอรับการอุปการะ</h2>
      </div>
    </div>
    <div class="container-fluid filter-tab">
      <div class="white-card col-xs-12" style="padding: 20px 50px;">
        <el-tabs v-model="tab">
          <el-tab-pane label="ค้นหาสุนัขด้วยตัวกรอง" name="filter">
            <dog-filter class="animated-t fadeInTo" :filters = "filters" @filtering="Filtering()"></dog-filter>
          </el-tab-pane>
          <el-tab-pane label="ค้นหาสุนัขด้วยรูปภาพ" name="imageSearch">
            <div class="image-search animated fadeIn">
              <input id="searchImage" type="file" accept="image/*" style="display: none;">
              <div class="col-sm-6 col-md-6 col-lg-7 no-padding">
                <input type="text" class="form-control input-lg" placeholder="อัพโหลดรูปภาพ หรือ ใส่ลิงค์รูปภาพ" v-model="inputUrlImg" v-if="!localImg">
                <div class="input-local-file" v-else>
                  <label class="local-file" @click="RemoveImage()">{{imgPreview.name}}<i class="material-icons close-icon">&#xE5CD;</i></label>
                </div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-2">
                <div class="btn btn-primary btn-lg" style="width: 100%;" @click="SelectImage()">อัพโหลดรูปภาพ</div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-3" style="padding-left: 0px;">
                <div class="btn btn-success btn-lg" style="width: 100%;">ค้นหาด้วยรูปภาพสุนัข</div>
              </div>
              <div class="col-xs-12 text-center" style="margin-top: 10px;" v-if="showPreview">
                <img id="img-preview" class="img-preview" :src="imgPreview.src" @click="SelectImage()"/>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>        
      </div>
    </div>
    <div class="container">
      <div class="container-fluid" style="margin: 30px 0px; min-height: 377px;">
        <loading :theme="'light'" :size="'normal'" v-if="isLoading"></loading>
        <div v-else>
          <div class="text-center not-found white-card animated-t fadeIn" v-if = "dogs && dogs.length === 0">
            <img src="../../assets/not-found.png"/>
            <h3>ขออภัย ไม่พบข้อมูลของสุนัข</h3>
            <h5>โปรดตรวจสอบตัวกรองที่ท่านใช้ หรือสุนัขที่ท่านต้องการยังไม่มีข้อมูล</h5>
          </div>
          <dog-list class="animated-t fadeInTo" :theme="'light'" :type="'found'" :dogs="dogs" v-else></dog-list>
        </div>
      </div>
      <div class="container-fluid text-center">
        <pagination class="animated-t fadeInTo" :innerClass="'border'" :pagination="pagination" :key="pagination.total" @changePage="Filtering()"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DogList from '@/components/guest/components/DogList.vue'
import DogFilter from '@/components/guest/components/DogFilter.vue'
import Pagination from '@/components/common/Pagination.vue'
import Loading from '@/components/common/Loading.vue'
import $ from 'jquery'

export default {
  created () {
    var breeds = this.$store.state.breeds.slice()
    breeds.unshift('ไม่จำกัดสายพันธุ์')
    this.filters = [
      { name: 'สายพันธุ์', model: 'ไม่จำกัดสายพันธุ์', options: breeds },
      { name: 'สีขน', model: 'ไม่จำกัดสี', options: null },
      { name: 'วันที่พบ', model: 'เรียงจากวันที่พบล่าสุด', options: ['เรียงจากวันที่พบก่อนหน้า', 'เรียงจากวันที่พบล่าสุด'] }
    ]
    this.dogs = [
      { breed: 'Loading...', color_primary: 'unknow', color_secondary: 'unknow', dominance: 'Loading...', date: new Date().toDateString(), img: require('@/assets/finder/dog-upload.png'), finder: {name: 'Unknow', tel: '000-000-0000', place: ''} }
    ]
    this.isLoading = true
    this.$http.post('/api/v2/adopt/', {}).then(response => {
      console.log(response.body)
      this.AddingDog(response.body.results)
      this.AddingColor()
      this.pagination.total = response.body.total_pages
      this.isLoading = false
    }, error => {
      console.log(error)
      this.isLoading = false
    })
  },
  mounted () {
    var self = this
    $('#searchImage').change(function (event) {
      var file = event.target.files[0]
      self.imgPreview = file
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        self.imgPreview.src = e.target.result
        self.localImg = true
        self.showPreview = true
        self.inputUrlImg = ''
      }
    })
  },
  updated () {
    if (this.inputUrlImg !== this.urlImg) {
      this.urlImg = this.inputUrlImg
      var img = $('<img src="' + this.urlImg + '" />')
      var self = this
      img.on('load', function (e) {
        self.imgPreview = {}
        self.imgPreview.src = self.urlImg
        self.showPreview = true
      }).on('error', function (e) {
        self.imgPreview = null
        self.showPreview = false
      })
    }
  },
  components: {
    DogList, DogFilter, Pagination, Loading
  },
  methods: {
    AddingDog (dogs) {
      this.dogs = []
      dogs.forEach(function (dog) {
        this.dogs.push(dog)
        var images = []
        for (var i = 1; i <= dog.img.length; i++) {
          var dogObj = { id: null, image: null }
          dogObj.id = i
          dogObj.image = dog.img[i - 1]
          images.push(dogObj)
        }
        dog.img = images
      }, this)
    },
    AddingColor () {
      this.filters[1].options = ['ไม่จำกัดสี']
      this.dogs.forEach(function (dog) {
        if (this.filters[1].options.indexOf(dog.color_primary) < 0) {
          this.filters[1].options.push(dog.color_primary)
        }
        if (this.filters[1].options.indexOf(dog.color_secondary) < 0) {
          this.filters[1].options.push(dog.color_secondary)
        }
      }, this)
    },
    SelectImage () {
      $('#searchImage').click()
    },
    RemoveImage () {
      this.inputUrlImg = ''
      this.urlImg = ''
      this.imgPreview = false
      this.localImg = false
      this.showPreview = false
    },
    Filtering () {
      var path = '?'
      for (var i = 0; i < this.filters.length; i++) {
        switch (i) {
          case 0:
            if (this.filters[i].model && this.filters[i].model !== 'ไม่จำกัดสายพันธุ์') {
              path += 'breed=' + this.filters[i].model + '&'
            }
            break
          case 1:
            if (this.filters[i].model && this.filters[i].model !== 'ไม่จำกัดสี') {
              path += 'color=' + this.filters[i].model + '&'
            }
            break
          case 2:
            if (this.filters[i].model) {
              if (this.filters[i].model === this.filters[i].options[0]) {
                path += 'sort=date&'
              } else {
                path += 'sort=-date&'
              }
            }
            break
        }
      }
      path += 'page=' + this.pagination.current
      this.isLoading = true
      this.$http.post('/api/v2/adopt/' + path, {}).then(response => {
        this.AddingDog(response.body.results)
        this.pagination.total = response.body.total_pages
        this.isLoading = false
      }, error => {
        console.log(error)
        this.dogs = []
        this.isLoading = false
      })
    }
  },
  data () {
    return {
      isLoading: false,
      pagination: {
        current: 1,
        total: 1,
        showPages: 5
      },
      tab: 'filter',
      inputUrlImg: '',
      urlImg: '',
      localImg: false,
      imgPreview: null,
      showPreview: false,
      imgPlaceholder: require('@/assets/finder/dog-upload.png'),
      filters: [],
      dogs: []
    }
  }
}
</script>

<style lang="scss">
  #adoptDog {
    padding-bottom: 40px;
    .image-search {
      padding: 0px 10px;
    }
    .filter-tab {
      padding: 0px 5%;
    }
    img {
      border-radius: 3px;
      cursor: pointer;
      transition-duration: 0.5s;
    }
    img:hover {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    .input-local-file {
      height: 47px;
      border: 1px solid #896b52;
      border-radius: 3px;
    }
    .local-file {
      border: 1px solid #896b52;
      color: white;
      background-color: lighten(#896b52, 10%);
      border-radius: 3px;
      height: 35px;
      padding: 5px 25px 5px 10px;
      font-weight: normal;
      margin: 5px 16px;
      transition-duration: 0.3s;
    }
    .local-file:hover {
      color: white;
      background-color: #896b52;
    }
    .close-icon {
      font-size: 16px;
      font-weight: bold;
      margin-left: 5px;
      position: absolute;
      transition-duration: 0.3s;
      color: white;
      cursor: pointer;
    }
    .close-icon:hover {
      color: red;
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
    .img-preview:hover {
      border: none;
      box-shadow: none;
    }
    .form-control {
      border-radius: 3px;
    }
  }
</style>
