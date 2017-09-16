<template>
  <div id="foundDog">
    <nav-bar :type = "'dark'"></nav-bar>
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
        <nav aria-label="...">
          <ul class="pager">
            <li class="pull-left"><i class="material-icons btn btn-page btn-lg">&#xE5CB;</i></li>
            <li v-for="(page, i) in pagination.pages" :key="i">
              <div class="btn btn-page-number-active btn-lg" v-if="i + 1 === pagination.current">{{page}}</div>
              <div class="btn btn-page-number btn-lg" v-else>{{page}}</div>
            </li>
            <li class="pull-right"><i class="material-icons btn btn-page btn-lg">&#xE5CC;</i></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import DogList from '@/components/guest/components/DogList.vue'
import DogFilter from '@/components/guest/components/DogFilter.vue'

export default {
  components: {
    DogList, DogFilter
  },
  data () {
    return {
      pagination: {
        current: 1,
        total: 10,
        prev: false,
        next: true,
        pages: [1, 2, 3, 4, 5]
      },
      filters: [
        { name: 'สายพันธุ์', options: this.$store.state.breeds },
        { name: 'สีขน', options: ['น้ำตาล', 'ดำ', 'ขาว'] },
        { name: 'วันที่พบ', options: ['เรียงจากวันที่เจอก่อน', 'เรียงจากวันที่เจอล่าสุด'] }
      ],
      dogs: [
        { breed: 'ไทยหลังอาน', color_primary: 'เทา', color_secondary: null, dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/1.jpg'), finder: {name: 'นาย A', tel: '080-000-0000', place: ''} },
        { breed: 'Bulldog', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/2.jpg'), finder: {name: 'นาย B', tel: '080-000-0000', place: ''} },
        { breed: 'Malamute', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/3.jpg'), finder: {name: 'นาย C', tel: '080-000-0000', place: ''} },
        { breed: 'Pekinese', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/4.jpg'), finder: {name: 'นาย D', tel: '080-000-0000', place: ''} },
        { breed: 'Shiba inu', color_primary: 'น้ำตาล', color_secondary: 'ขาว', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/5.jpg'), finder: {name: 'นาย E', tel: '080-000-0000', place: ''} },
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/6.jpg'), finder: {name: 'นาย F', tel: '080-000-0000', place: ''} },
        { breed: 'Beagle', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/7.jpg'), finder: {name: 'นาย G', tel: '080-000-0000', place: ''} },
        { breed: 'ไทยหลังอาน', color_primary: 'เทา', color_secondary: 'เทา', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/1.jpg'), finder: {name: 'นาย H', tel: '080-000-0000', place: ''} },
        { breed: 'Bulldog', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/2.jpg'), finder: {name: 'นาย I', tel: '080-000-0000', place: ''} },
        { breed: 'Malamute', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/found/3.jpg'), finder: {name: 'นาย J', tel: '080-000-0000', place: ''} },
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
    .btn-page {
      color: white;
      background-color: #49392C;
      border-radius: 10px;
      padding: 10px 30px;
      margin-right: 5px;
      margin-right: 0px;
      padding: 10px 30px;
      font-weight: bold;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .btn-page-number {
      color: #49392C;
      background-color: white;
      border-radius: 10px;
      padding: 10px 20px;
      margin-right: 5px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .btn-page-number-active {
      @extend .btn-page-number;
      color: white;
      background-color: #49392C;
    }
    .btn-page-active {
      @extend .btn-page;
      background-color: lighten(#49392C, 10%);
    }
    .btn-page-number:hover {
      color: white;
      background-color: #49392C;
    }
    .btn-page:hover {
      background-color: lighten(#49392C, 10%);
    }
  }
</style>
