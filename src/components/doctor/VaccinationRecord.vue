<template>
  <div id="vaccication-history">
    <div class="title-smoke-green-card">
      <div class="container" style="margin-top: -5px;">
        <h2 v-if="dog" style="display: inline-block;">ประวัติการฉีดวัคซีนทั้งหมดของ</b></h2>
        <div v-if="dog" class="dog-sm-view">{{dog.name}}<img v-if="dog && dog.image_list.length > 0":src="dog.image_list[0].image" class="img-dog"/></div>
      </div>
    </div>
    <div class="container">
      <div class="white-card col-xs-12 animated fadeIn">
        <h3>รายละเอียดของสุนัข</h3>
        <loading v-if="isLoading.dog"></loading>
        <div v-else>
          <dog-information :dog="dog" :account="account" v-if="dog"></dog-information>
        </div>
      </div>
      <div class="white-card col-xs-12 animated fadeIn" v-if="vaccineRecord !== undefined">
        <h3>ประวัติการฉีดวัคซีนของสุนัข</h3>
        <loading v-if="isLoading.record"></loading>
        <div id="vaccine-table" v-else>
          <div v-if="vaccineRecord && vaccineRecord.length > 0" class="when-vaccination">บันทึกเมื่อวันที่ <b>{{DateFormat(vaccineRecord[0].date_record)}}</b></div>
          <view-table :tableHeader = "tableHeader" :vaccineRecord = "vaccineRecord" style="margin-bottom: 50px;"></view-table>
          <pagination v-if="allVaccineRecord && allVaccineRecord.length > 0" @changePage="ChangePage()" :innerClass="'sm'" :pagination = "pagination"></pagination>
        </div>
      </div>
      <div class="white-card col-xs-12 animated fadeIn" v-else>
        <div class="text-center not-found">ไม่พบประวัติการฉีดวัคซีนของสุนัขตัวนี้</div>
      </div>
    </div>
  </div>
</template>

<script>
import DogInformation from '@/components/doctor/components/DogInformation.vue'
import Loading from '@/components/common/Loading.vue'
import ViewTable from '@/components/doctor/components/ViewTable.vue'
import Pagination from '@/components/common/Pagination.vue'

export default {
  components: {
    DogInformation, ViewTable, Loading, Pagination
  },
  created () {
    this.isLoading.dog = true
    this.isLoading.record = true
    this.$http.get('/api/dog/' + this.$route.params.dog_id + '/vaccine-log/').then(response => {
      this.dog = response.body.dog
      this.account = response.body.account
      this.isLoading.dog = false
      this.antiparasite = response.body.antiparasite
      this.SplitPage(response.body.vaccine_record_list)
      this.ChangePage()
    }, error => {
      console.log(error)
    })
  },
  methods: {
    DateFormat (date) {
      date = new Date(date)
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    SplitPage (vaccineRecord) {
      var date = null
      var eachVaccineRecord = []
      vaccineRecord.forEach(function (vr) {
        if (date !== vr.date_record) {
          date = vr.date_record
          this.allVaccineRecord.push(eachVaccineRecord.slice(0))
          eachVaccineRecord = []
        }
        eachVaccineRecord.push(vr)
      }, this)
      this.allVaccineRecord.push(eachVaccineRecord.slice(0))
      this.pagination.total = this.allVaccineRecord.length - 1
      this.isLoading.record = false
    },
    ChangePage () {
      this.vaccineRecord = this.allVaccineRecord[this.pagination.current]
    }
  },
  data () {
    return {
      allVaccineRecord: [],
      vaccineRecord: [],
      dog: null,
      account: null,
      antiparasite: null,
      isLoading: {
        dog: false,
        record: false
      },
      pagination: {
        current: 1,
        total: 5,
        showPages: 5
      },
      tableHeader: [
        { th: 'วัคซีนป้องกันโรค', en: 'Vaccination Against' },
        { th: 'วันที่ฉีด', en: 'Date of Vaccination' },
        { th: 'นัดครั้งต่อไป', en: 'Next Vaccination' },
        { th: 'สัตวแพทย์/เลขที่ใบอนุญาติ', en: 'Veteinary / License No.' },
        { th: 'ชื่อวัคซีน/หมายเลขการผลิต', en: 'Name / Lot No.' }
      ]
    }
  }
}
</script>

<style lang="scss">
  #vaccication-history {
    padding-bottom: 50px;
    .white-card {
      padding: 40px;
      h3 {
        font-weight: bold;
        margin-top: 0px;
        margin-bottom: 30px;
      }
    }
    .dog-sm-view {
      color: white;
      cursor: default;
      .img-dog {
        border: 2px solid white;
      } 
    }
    .dog-sm-view:hover {
      color: white;
      .img-dog {
        border: 2px solid white;
        filter: brightness(100%);
      } 
    }
    .when-vaccination {
      font-weight: normal;
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
</style>
