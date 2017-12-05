<template>
  <div id="found-dog">
    <div class="title-red-card">
      <div class="container">
        <h2>ประกาศสุนัขสูญหาย</h2>
      </div>
    </div>
    <div class="container-fluid filter-tab">
      <div class="white-card col-xs-12" style="padding: 20px 50px;">
        <el-tabs v-model="tab">
          <el-tab-pane label="ค้นหาสุนัขด้วยตัวกรอง" name="filter">
            <dog-filter class="animated-t fadeInTo" :filters = "filters" @filtering="Filtering()"></dog-filter>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="container">
      <div class="container-fluid" style="margin: 30px 0px; min-height: 377px;">
        <loading :theme="'light'" :size="'normal'" v-if="isLoading"></loading>
        <div v-else>
          <div class="text-center white-card not-found animated-t fadeIn" v-if = "dogs && dogs.length === 0">
            <img src="../../assets/not-found.png"/>
            <h3>ขออภัย ไม่พบข้อมูลของสุนัข</h3>
            <h5>โปรดตรวจสอบตัวกรองที่ท่านใช้ หรือสุนัขที่ท่านต้องการยังไม่มีข้อมูล</h5>
          </div>
          <dog-list class="animated-t fadeInTo" :type="'missing'" :dogs="dogs" v-else></dog-list>
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
    this.$http.get('/api/v2/lost/').then(response => {
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
      this.$http.get('/api/v2/lost/' + path).then(response => {
        this.AddingDog(response.body.results)
        this.pagination.total = response.body.total_pages
        this.isLoading = false
        window.scrollTo(0, 0)
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
      filters: [],
      dogs: []
    }
  }
}
</script>

<style lang="scss">
  #found-dog {
    padding-bottom: 40px;
    .filter-tab {
      padding: 0px 5%;
    }
  }
</style>
