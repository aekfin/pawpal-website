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
        { name: 'สายพันธุ์', options: this.$store.state.breeds },
        { name: 'สีขน', options: ['น้ำตาล', 'ดำ', 'ขาว'] },
        { name: 'วันที่พบ', options: ['เรียงจากวันที่เจอก่อน', 'เรียงจากวันที่เจอล่าสุด'] }
      ],
      dogs: [
        { breed: 'ไทยหลังอาน', color_primary: 'เทา', color_secondary: null, dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/1.jpg'), finder: {name: 'นาย A', tel: '080-000-0000', place: ''} },
        { breed: 'French Bulldog', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/2.jpg'), finder: {name: 'นาย B', tel: '080-000-0000', place: ''} },
        { breed: 'Alaskan Malamute', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/3.jpg'), finder: {name: 'นาย C', tel: '080-000-0000', place: ''} },
        { breed: 'Pekinese', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/4.jpg'), finder: {name: 'นาย D', tel: '080-000-0000', place: ''} },
        { breed: 'Shiba inu', color_primary: 'น้ำตาล', color_secondary: 'ขาว', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/5.jpg'), finder: {name: 'นาย E', tel: '080-000-0000', place: ''} },
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/6.jpg'), finder: {name: 'นาย F', tel: '080-000-0000', place: ''} },
        { breed: 'Beagle', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/7.jpg'), finder: {name: 'นาย G', tel: '080-000-0000', place: ''} },
        { breed: 'ไทยหลังอาน', color_primary: 'เทา', color_secondary: 'เทา', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/1.jpg'), finder: {name: 'นาย H', tel: '080-000-0000', place: ''} },
        { breed: 'French Bulldog', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/2.jpg'), finder: {name: 'นาย I', tel: '080-000-0000', place: ''} },
        { breed: 'Alaskan Malamute', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/3.jpg'), finder: {name: 'นาย J', tel: '080-000-0000', place: ''} },
        { breed: 'Pekinese', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/4.jpg'), finder: {name: 'นาย K', tel: '080-000-0000', place: ''} },
        { breed: 'Shiba inu', color_primary: 'น้ำตาล', color_secondary: 'ขาว', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/5.jpg'), finder: {name: 'นาย L', tel: '080-000-0000', place: ''} },
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/6.jpg'), finder: {name: 'นาย M', tel: '080-000-0000', place: ''} },
        { breed: 'Beagle', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/7.jpg'), finder: {name: 'นาย N', tel: '080-000-0000', place: ''} }
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
