<template>
  <div id="dashboard">
    <graph :dogsData="dogsData" :key="dogsData[0].update" :selectedProvince="selectedProvince" :selectedRegion="selectedRegion" @changingTabs="ChangingTabs"></graph>
    <thailand-map class="col-xs-12 col-md-7" :provinces="provinces" :region="region" @changingSelector="ChangeGraph"></thailand-map>
    <statistic class="col-xs-12 col-md-5" :selectedProvince="selectedProvince" :selectedRegion="selectedRegion" :dogsData="dogsData" :tab="tab"></statistic>
  </div>
</template>

<script>
  import ThailandMap from '@/components/guest/components/ThailandMap.vue'
  import Statistic from '@/components/guest/components/Statistic.vue'
  import Graph from '@/components/guest/components/Graph.vue'
  import Loading from '@/components/common/Loading.vue'

  export default {
    created () {
      this.FetchData({city: '', region: ''})
    },
    components: {
      Statistic, ThailandMap, Graph, Loading
    },
    methods: {
      ChangingTabs (tab) {
        this.tab = tab
      },
      FetchData (request) {
        this.$http.post('/api/v2/dashboard/', request).then(response => {
          var dog = response.body
          this.dogsData[0].contents[0].amount = dog.all_dog
          this.dogsData[0].contents[1].amount = dog.vaccine_dog
          this.dogsData[0].contents[2].amount = dog.all_dog - dog.vaccine_dog
          this.dogsData[0].contents[3].amount = dog.antiparasite_dog
          this.dogsData[0].contents[4].amount = dog.all_dog - dog.antiparasite_dog
          this.dogsData[1].contents[0].amount = dog.lost_dog
          this.dogsData[1].contents[1].amount = dog.lost_back_dog
          this.dogsData[1].contents[2].amount = dog.lost_dog - dog.lost_back_dog
          this.dogsData[2].contents[0].amount = dog.found_dog
          this.dogsData[2].contents[1].amount = dog.found_back_dog
          this.dogsData[2].contents[2].amount = dog.found_dog - dog.found_back_dog
          this.dogsData[3].contents[0].amount = dog.adopt_dog
          this.dogsData[3].contents[1].amount = dog.take_dog
          this.dogsData[3].contents[2].amount = dog.adopt_dog - dog.take_dog
          this.dogsData[0].update += 1
        }, err => {
          console.log(err)
        })
      },
      ChangeGraph (selectedRegion, selectedProvince, mode) {
        this.selectedRegion = selectedRegion
        this.selectedProvince = selectedProvince
        var city = ''
        var region = ''
        if (this.selectedProvince !== 'จังหวัดทั้งหมด') {
          city = this.selectedProvince
        } else {
          city = ''
          if (this.selectedRegion !== 'ภูมิภาคทั้งหมด') {
            region = this.selectedRegion
          } else {
            region = ''
          }
        }
        var request = {
          city: city,
          region: region
        }
        this.FetchData(request)
      }
    },
    data () {
      return {
        selectedRegion: '',
        selectedProvince: '',
        tab: 'first',
        dogsData: [
          {
            topic: 'ข้อมูลการได้รับวัคซีน',
            contents: [
              { name: 'สุนัขทั้งหมด', amount: 0 },
              { name: 'ได้รับวัคซีนป้องกันโรค', amount: 0 },
              { name: 'ไม่ได้รับวัคซีนป้องกันโรค', amount: 0 },
              { name: 'ได้รับยาต้านพยาธิ', amount: 0 },
              { name: 'ไม่ได้รับยาต้านพยาธิ', amount: 0 }
            ],
            update: 0
          },
          {
            topic: 'ข้อมูลสุนัขที่เจ้าของทำหาย',
            contents: [
              { name: 'สุนัขที่เจ้าของทำหายทั้งหมด', amount: 0 },
              { name: 'เจ้าของได้รับคืน', amount: 0 },
              { name: 'เจ้าของไม่ได้รับคืน', amount: 0 }
            ]
          },
          {
            topic: 'ข้อมูลสุนัขที่ถูกพบ',
            contents: [
              { name: 'สุนัขที่ถูกพบทั้งหมด', amount: 0 },
              { name: 'มีเจ้าของมารับคืนแล้ว', amount: 0 },
              { name: 'ยังไม่มีเจ้าของมารับคืน', amount: 0 }
            ]
          },
          {
            topic: 'ข้อมูลสุนัขที่รอการอุปการะ',
            contents: [
              { name: 'สุนัขที่รอการอุปการะทั้งหมด', amount: 0 },
              { name: 'ได้รับการอุปการะแล้ว', amount: 0 },
              { name: 'ยังไม่ได้รับการอุปการะ', amount: 0 }
            ]
          }
        ],
        region: {
          northern: [ 4, 12, 13, 16, 22, 25, 33, 36, 37, 39, 40, 44, 53, 54, 65, 74, 75 ],
          northeastern: [ 3, 5, 10, 19, 20, 26, 27, 42, 43, 45, 47, 52, 55, 56, 68, 69, 70, 72, 73, 76 ],
          central: [ 1, 2, 6, 7, 8, 9, 15, 17, 18, 23, 28, 29, 30, 32, 38, 49, 50, 51, 59, 60, 61, 62, 63, 64, 66, 71 ],
          southern: [ 0, 11, 14, 21, 24, 31, 34, 35, 41, 46, 48, 57, 58, 67 ]
        },
        provinces: [
          { th: 'กระบี่', en: 'Krabi', x: 21.1, y: 82.9 },
          { th: 'กรุงเทพมหานคร', en: 'Bangkok', x: 40.5, y: 43.6 },
          { th: 'กาญจนบุรี', en: 'Kanchanaburi', x: 19.6, y: 39.8 },
          { th: 'กาฬสินธุ์', en: 'Kalasin', x: 73.5, y: 25.1 },
          { th: 'กำแพงเพชร', en: 'Kampha eng phet', x: 26.5, y: 28.1 },
          { th: 'ขอนแก่น', en: 'Khon kean', x: 60.3, y: 25.9 },
          { th: 'จันทบุรี', en: 'Chanthaburi', x: 57.6, y: 50.7 },
          { th: 'ฉะเชิงเทรา', en: 'Chacho engsao', x: 48.7, y: 44.9 },
          { th: 'ชลบุรี', en: 'Chon buri', x: 47, y: 47.9 },
          { th: 'ชัยนาท', en: 'Chai nat', x: 32.1, y: 35.5 },
          { th: 'ชัยภูมิ', en: 'Chai yaphum', x: 51.4, y: 31.8 },
          { th: 'ชุมพร', en: 'Chum phon', x: 21, y: 66.3 },
          { th: 'เชียงราย', en: 'Chiang rai', x: 29.5, y: 3.5 },
          { th: 'เชียงใหม่', en: 'Chiang mai', x: 14.3, y: 10.9 },
          { th: 'ตรัง', en: 'Trang', x: 29.1, y: 87.7 },
          { th: 'ตราด', en: 'Trat', x: 61.9, y: 53.6 },
          { th: 'ตาก', en: 'Tak', x: 17.5, y: 23.5 },
          { th: 'นครนายก', en: 'Nakhon nayok', x: 46, y: 41.4 },
          { th: 'นครปฐม', en: 'Nakhon pathom', x: 32.1, y: 43.2 },
          { th: 'นครพนม', en: 'Nakhon phanom', x: 83.6, y: 20.2 },
          { th: 'นครราชสีมา', en: 'Nakhon ratchasima', x: 55.5, y: 36.4 },
          { th: 'นครศรีธรรมราช', en: 'Nakhon si thammarat', x: 29.2, y: 80.8 },
          { th: 'นครสวรรค์', en: 'Nakhon sawan', x: 35.8, y: 32.6 },
          { th: 'นนทบุรี', en: 'Nonthaburi', x: 36.2, y: 43.2 },
          { th: 'นราธิวาส', en: 'Narathiwat', x: 54.1, y: 95.3 },
          { th: 'น่าน', en: 'Nan', x: 39.2, y: 10.6 },
          { th: 'บึงกาฬ', en: 'Bueng Kan', x: 74.3, y: 14.7 },
          { th: 'บุรีรัมย์', en: 'Buri ram', x: 67.4, y: 38 },
          { th: 'ปทุมธานี', en: 'Pathum thani', x: 40, y: 42 },
          { th: 'ประจวบคีรีขันธ์', en: 'Prachuap khiri khan', x: 29, y: 56 },
          { th: 'ปราจีนบุรี', en: 'Prachinburi', x: 51.5, y: 42 },
          { th: 'ปัตตานี', en: 'Pattani', x: 48.9, y: 91.9 },
          { th: 'พระนครศรีอยุธยา', en: 'Ayutthaya', x: 38.5, y: 40.2 },
          { th: 'พะเยา', en: 'Phayao', x: 29.5, y: 8.5 },
          { th: 'พังงา', en: 'Phangnga', x: 13.1, y: 79.2 },
          { th: 'พัทลุง', en: 'Phatthalung', x: 34.5, y: 86.3 },
          { th: 'พิจิตร', en: 'phichit', x: 36.6, y: 27.7 },
          { th: 'พิษณุโลก', en: 'Phitsanulok', x: 37.9, y: 23.6 },
          { th: 'เพชรบุรี', en: 'Phetchaburi', x: 26.4, y: 50.4 },
          { th: 'เพชรบูรณ์', en: 'Phetchabun', x: 44.9, y: 27.6 },
          { th: 'แพร่', en: 'Phrae', x: 30.6, y: 16.3 },
          { th: 'ภูเก็ต', en: 'Phuket', x: 12, y: 84 },
          { th: 'มหาสารคาม', en: 'Mahasarakham', x: 70, y: 28.9 },
          { th: 'มุกดาหาร', en: 'Mukdahan', x: 84.8, y: 24.9 },
          { th: 'แม่ฮ่องสอน', en: 'Mae hong son', x: 6.4, y: 8 },
          { th: 'ยโสธร', en: 'Yasothon', x: 83.3, y: 30.1 },
          { th: 'ยะลา', en: 'Yala', x: 48.3, y: 95.9 },
          { th: 'ร้อยเอ็ด', en: 'Roi et', x: 77.2, y: 30.9 },
          { th: 'ระนอง', en: 'Ranong', x: 15.9, y: 69.5 },
          { th: 'ระยอง', en: 'Rayong', x: 48.4, y: 50.9 },
          { th: 'ราชบุรี', en: 'Rachaburi', x: 27, y: 46 },
          { th: 'ลพบุรี', en: 'Lopburi', x: 42.7, y: 35.9 },
          { th: 'เลย', en: 'Loei', x: 50.9, y: 20.2 },
          { th: 'ลำปาง', en: 'Lampang', x: 24.8, y: 13.3 },
          { th: 'ลำพูน', en: 'Lamphun', x: 17.5, y: 15.7 },
          { th: 'ศีรสะเกษ', en: 'Srisaket', x: 83.2, y: 37.1 },
          { th: 'สกลนคร', en: 'Sakonnakhon', x: 74.5, y: 20.2 },
          { th: 'สงขลา', en: 'Songkhla', x: 40.6, y: 91.2 },
          { th: 'สตูล', en: 'Satun', x: 33.1, y: 91.4 },
          { th: 'สมุทรปราการ', en: 'Samutprakan', x: 40.9, y: 45.6 },
          { th: 'สมุทรสงคราม', en: 'Samut songkhram', x: 30.4, y: 46.9 },
          { th: 'สมุทรสาคร', en: 'Samut sakhon', x: 34, y: 45.6 },
          { th: 'สระแก้ว', en: 'Sra kaeo', x: 59, y: 44.3 },
          { th: 'สระบุรี', en: 'Saraburi', x: 43.5, y: 38.8 },
          { th: 'สิงห์บุรี', en: 'Singburi', x: 35, y: 36.5 },
          { th: 'สุโขทัย', en: 'Sukhothai', x: 27.5, y: 22.6 },
          { th: 'สุพรรณบุรี', en: 'Suphanburi', x: 30.5, y: 38.8 },
          { th: 'สุราษฎร์ธานี', en: 'Surat thani', x: 21.3, y: 76.7 },
          { th: 'สุรินทร์', en: 'Surin', x: 74.8, y: 37.2 },
          { th: 'หนองคาย', en: 'Nongkhai', x: 61.6, y: 17.6 },
          { th: 'หนองบัวลำภู', en: 'Nongbualamphu', x: 56.6, y: 22.1 },
          { th: 'อ่างทอง', en: 'Angthong', x: 34.2, y: 39 },
          { th: 'อำนาจเจริญ', en: 'Amnatcharo en', x: 89.4, y: 30.6 },
          { th: 'อุดรธานี', en: 'Udonthani', x: 63.5, y: 20.6 },
          { th: 'อุตรดิตถ์', en: 'Uttaradit', x: 37.8, y: 18.9 },
          { th: 'อุทัยธานี', en: 'Uthaithani', x: 23.6, y: 34 },
          { th: 'อุบลราชธานี', en: 'Uboratchathani', x: 92.7, y: 35.9 }
        ]
      }
    }
  }
</script>

<style lang="scss">
  #dashboard {
    h1 {
      color: #4c4c4c !important;
      margin-bottom: 0px;
    }
  }
</style>