<template>
  <div id="foundDog">
    <div class="title-yellow-card">
      <div class="container">
        <h2>ประกาศสุนัขที่พบ</h2>
      </div>
    </div>
    <div class="container-fluid filter-tab">
      <dog-filter :filters = "filters"></dog-filter>
    </div>
    <div class="container animated-t fadeInTo">
      <div class="container-fluid" style="margin-top: 30px">
        <dog-list :theme="'light'" :type="'found'" :dogs="dogs"></dog-list>
      </div>
      <div class="container-fluid text-center">
        <pagination  :innerClass="'border'" :pagination="pagination"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DogList from '@/components/guest/components/DogList.vue'
import DogFilter from '@/components/guest/components/DogFilter.vue'
import Pagination from '@/components/common/Pagination.vue'

export default {
  created () {
    this.$http.get('/api/v2/found/').then(response => {
      console.log(response.body)
      this.dogs = []
      this.filters[1].options = []
      response.body.results.forEach(function (dog) {
        dog.img = require('@/assets/finder/dog-upload.png')
        this.dogs.push(dog)
        if (this.filters[1].options.indexOf(dog.color_primary) < 0) {
          this.filters[1].options.push(dog.color_primary)
        }
        if (this.filters[1].options.indexOf(dog.color_secondary) < 0) {
          this.filters[1].options.push(dog.color_secondary)
        }
      }, this)
    }, error => {
      console.log(error)
    })
  },
  components: {
    DogList, DogFilter, Pagination
  },
  data () {
    return {
      pagination: {
        current: 1,
        total: 10,
        showPages: 5
      },
      filters: [
        { name: 'สายพันธุ์', model: '', options: this.$store.state.breeds },
        { name: 'สีขน', model: '', options: ['น้ำตาล', 'ดำ', 'ขาว'] },
        { name: 'วันที่พบ', model: '', options: ['เรียงจากวันที่พบก่อนหน้า', 'เรียงจากวันที่พบล่าสุด'] }
      ],
      dogs: [
        { breed: 'Golden Retriever', color_primary: 'ทอง', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: new Date().toDateString(), img: require('@/assets/finder/dog-upload.png'), finder: {name: 'นาย A', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: new Date().toDateString(), img: require('@/assets/finder/dog-upload.png'), finder: {name: 'นาย B', tel: '080-000-0000', place: ''} },
        { breed: 'Alaskan Malamute', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: new Date().toDateString(), img: require('@/assets/finder/dog-upload.png'), finder: {name: 'นาย C', tel: '080-000-0000', place: ''} }
      ]
    }
  }
}
</script>

<style lang="scss">
  #foundDog {
    padding-bottom: 40px;
    .filter-tab {
      padding: 0px 5%;
    }
  }
</style>
