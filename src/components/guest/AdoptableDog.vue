<template>
  <div id="adopt-dog">
    <div class="title-red-card">
      <div class="container">
        <h2>ประกาศสุนัขที่รอรับการอุปการะ</h2>
      </div>
    </div>
    <div class="container-fluid filter-tab">
      <div class="white-card col-xs-12" style="padding: 20px 50px;">
        <el-tabs v-model="tab">
          <el-tab-pane label="ค้นหาสุนัขด้วยตัวกรอง" name="filter">
            <dog-filter class="animated-t fadeInTo" :filters = "filters" @filtering="Filtering('filter')"></dog-filter>
          </el-tab-pane>
          <el-tab-pane label="ค้นหาสุนัขด้วยรูปภาพ" name="imageSearch">
            <div class="image-search animated fadeIn">
              <input id="searchImage" type="file" accept="image/*" style="display: none;">
              <div class="col-sm-9 col-md-9 col-lg-9 no-padding">
                <input type="text" class="form-control input-lg" style="height: 47px; margin-top: 5px;" placeholder="อัพโหลดรูปภาพ หรือ ใส่ลิงค์รูปภาพจากเว็บไซต์" v-model="inputUrlImg" v-if="!localImg">
                <div class="input-local-file" v-else>
                  <label class="local-file" @click="RemoveImage()">{{imgPreview.name}}<i class="material-icons close-icon">&#xE5CD;</i></label>
                </div>
              </div>
              <div class="col-sm-3 col-md-3 col-lg-3">
                <div class="btn btn-primary btn-lg" style="width: 100%; height: 47px; margin-top: 5px;" @click="SelectImage()">อัพโหลดรูปภาพ</div>
              </div>
              <div class="col-xs-12 text-center animated fadeIn" style="margin-top: 15px;" v-if="showPreview">
                <h4 class="text-left" style="position: absolute; margin: 0px;">ค้นหาด้วยรูปภาพ :</h4>
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
          <dog-list class="animated-t fadeInTo" :type="'adopt'" :dogs="dogs" v-else></dog-list>
        </div>
      </div>
      <div class="container-fluid text-center">
        <pagination class="animated-t fadeInTo" :innerClass="'border'" :pagination="pagination" :key="pagination.total" @changePage="Filtering('page')"></pagination>
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
  mounted () {
    document.title = 'ประกาศสุนัขที่รอรับการอุปการะ - Pawpal'
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
        self.Filtering()
      }
    })
    this.AddingFilter()
  },
  updated () {
    if (this.inputUrlImg !== this.urlImg) {
      this.urlImg = this.inputUrlImg
      var img = $('<img src="' + this.urlImg + '" />')
      var self = this
      img.on('load', function (e) {
        self.imgPreview = {}
        self.imgPreview.src = self.urlImg
        self.Filtering()
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
    AddingFilter () {
      this.$http.get('/api/v2/adopt/filter/').then(response => {
        this.filters[0].options = response.body.breed_filter
        this.filters[1].options = response.body.color_filter
        this.filters[0].options.unshift('ทุกสายพันธุ์')
        this.filters[1].options.unshift('ทุกสี')
      }, error => {
        console.log(error)
      })
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
    Filtering (mode) {
      var path = '?'
      for (var i = 0; i < this.filters.length; i++) {
        switch (i) {
          case 0:
            if (this.filters[i].model && this.filters[i].model !== 'ทุกสายพันธุ์') {
              path += 'breed=' + this.filters[i].model + '&'
            }
            break
          case 1:
            if (this.filters[i].model && this.filters[i].model !== 'ทุกสี') {
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
      if (mode === 'filter') {
        this.pagination.current = 1
      }
      path += 'page=' + this.pagination.current
      this.isLoading = true
      var request = {}
      if (this.tab === 'imageSearch') {
        path = '?page=' + this.pagination.current
        if (this.localImg) {
          request = { 'image_filter': this.imgPreview.src }
        } else {
          request = { 'image_url': this.inputUrlImg }
        }
      }
      this.$http.post('/api/v2/adopt/' + path, request).then(response => {
        console.log(response.body)
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
      filters: [
        { name: 'สายพันธุ์', model: 'ทุกสายพันธุ์', options: ['ทุกสายพันธุ์'] },
        { name: 'สีขน', model: 'ทุกสี', options: ['ทุกสี'] },
        { name: 'วันที่พบ', model: 'แสดงสุนัขที่พบล่าสุดก่อน', options: ['แสดงสุนัขที่พบนานที่สุดก่อน', 'แสดงสุนัขที่พบล่าสุดก่อน'] }
      ],
      dogs: [
        { breed: 'Loading...', color_primary: 'unknow', color_secondary: 'unknow', dominance: 'Loading...', date: new Date().toDateString(), img: require('@/assets/finder/dog-upload.png'), finder: {name: 'Unknow', tel: '000-000-0000', place: ''} }
      ]
    }
  }
}
</script>

<style lang="scss">
  #adopt-dog {
    padding-bottom: 40px;
    .image-search {
      height: 60px;
      margin-bottom: 5px;
      padding: 0px 15px;
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
