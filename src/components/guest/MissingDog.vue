<template>
  <div class="missingDog">
    <div class="title-red-card">
      <div class="container">
        <h2>ประกาศสุนัขสูญหาย</h2>
      </div>
    </div>
    <div class="container animated-t fadeInTo">
      <div class="container-fluid" style="margin-top:20px">
        <dog-list :theme="'dark'" :type="'missing'" :dogs="dogs"></dog-list>
      </div>
    </div>
  </div>
</template>

<script>
import DogList from '@/components/guest/components/DogList.vue'

export default {
  name: 'missingDog',
  components: {
    DogList
  },
  data () {
    return {
      dogs: [
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/1.jpg'), owner: {name: 'นาย AA', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/2.jpg'), owner: {name: 'นาย AB', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลอ่อน', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/3.jpg'), owner: {name: 'นาย AC', tel: '080-000-0000', place: ''} },
        { breed: 'Malamute', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/4.jpg'), owner: {name: 'นาย AD', tel: '080-000-0000', place: ''} },
        { breed: 'Pekines', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/5.jpg'), owner: {name: 'นาย AE', tel: '080-000-0000', place: ''} },
        { breed: 'Japanese Spaniel', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/6.jpg'), owner: {name: 'นาย AF', tel: '080-000-0000', place: ''} },
        { breed: 'Pug', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/7.jpg'), owner: {name: 'นาย AG', tel: '080-000-0000', place: ''} },
        { breed: 'Siberian Husky', color_primary: 'ขาว', color_secondary: 'ดำ', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/1.jpg'), owner: {name: 'นาย AH', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลเข้ม', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/2.jpg'), owner: {name: 'นาย AI', tel: '080-000-0000', place: ''} },
        { breed: 'Chihuahua', color_primary: 'ขาว', color_secondary: 'น้ำตาลอ่อน', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/3.jpg'), owner: {name: 'นาย AJ', tel: '080-000-0000', place: ''} },
        { breed: 'Malamute', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/4.jpg'), owner: {name: 'นาย AK', tel: '080-000-0000', place: ''} },
        { breed: 'Pekines', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/5.jpg'), owner: {name: 'นาย AL', tel: '080-000-0000', place: ''} },
        { breed: 'Japanese Spaniel', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/6.jpg'), owner: {name: 'นาย AM', tel: '080-000-0000', place: ''} },
        { breed: 'Pug', color_primary: 'ขาว', color_secondary: 'น้ำตาล', dominance: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: require('@/assets/missing/7.jpg'), owner: {name: 'นาย AN', tel: '080-000-0000', place: ''} }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
