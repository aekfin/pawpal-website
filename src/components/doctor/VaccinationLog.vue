<template>
  <div id="vaccicationLog">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>ประวัติการฉีดวัคซีนของ<b>"{{dog.name}}"</b></h2>
      </div>
    </div>
    <div class="container">
      <div class="white-card col-xs-12">
        <h3>รายละเอียดของสุนัข</h3>
        <dog-information :dog="dog" :account="account"></dog-information>
      </div>
      <div class="white-card col-xs-12">
        <h3>ประวัติการฉีดวัคซีนของสุนัข</h3>
      </div>
    </div>
  </div>
</template>

<script>
import DogInformation from '@/components/doctor/components/DogInformation.vue'

export default {
  components: {
    DogInformation
  },
  data () {
    return {
      dog: {
        age: 2,
        birth_day: '2015-09-16',
        blood_type: 'RH',
        breed: 'Beagle',
        color_primary: 'น้ำตาล',
        color_secondary: 'ขาว',
        current_weight: 2,
        dominance: 'มีวงกลมสีขาวอยู่ที่ท้อง',
        gender: 1,
        id: 1,
        image: [
          { id: 6, image: '/media/dog_image/2017/09/df53eb42-4ae.jpg' },
          { id: 7, image: '/media/dog_image/2017/09/1a41f35b-2c8.jpg' },
          { id: 8, image: '/media/dog_image/2017/09/cd0f78cb-94e.jpg' },
          { id: 9, image: '/media/dog_image/2017/09/ade29aef-cb0.jpg' }
        ],
        is_sterize: true,
        location: 'กรุงเทพ',
        micro_no: null,
        name: 'Drake',
        status: 1
      },
      account: {
        first_name: 'Kongnapat',
        last_name: 'Jirawatangkoon'
      }
    }
  }
}
</script>

<style lang="scss">
  #vaccicationLog {
    .white-card {
      padding: 20px;
      padding-bottom: 40px;
      h3 {
        margin-top: 0px;
        margin-bottom: 30px;
      }
    }
  }
</style>
