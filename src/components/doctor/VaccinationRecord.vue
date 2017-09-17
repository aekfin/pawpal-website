<template>
  <div id="vaccication-history">
    <div class="title-dark-blue-green-card">
      <div class="container">
        <h2 v-if="dog">ประวัติการฉีดวัคซีนทั้งหมดของ <b>"{{dog.name}}"</b></h2>
      </div>
    </div>
    <div class="container">
      <div class="white-card col-xs-12">
        <h3>รายละเอียดของสุนัข</h3>
        <dog-information :dog="dog" :account="account" v-if="dog"></dog-information>
      </div>
      <div class="white-card col-xs-12">
        <h3>ประวัติการฉีดวัคซีนของสุนัข</h3>
        <view-table :tableHeader = "tableHeader" :vaccineRecord = "vaccineRecord" style="margin-bottom: 50px;"></view-table>
        <pagination v-if="allVaccineRecord.length > 0" @changePage="ChangePage()" :innerClass="'sm'" :pagination = "pagination"></pagination>
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
    this.$http.get('/api/dog/' + this.$route.params.dog_id + '/vaccine-log/').then(response => {
      this.dog = response.body.dog
      this.account = response.body.account
      this.antiparasite = response.body.antiparasite
      this.SplitPage(response.body.vaccine_record_list)
      this.ChangePage()
    }, error => {
      console.log(error)
    })
  },
  methods: {
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
    },
    ChangePage () {
      this.vaccineRecord = this.allVaccineRecord[this.pagination.current]
    }
  },
  data () {
    return {
      pagination: {
        current: 1,
        total: 5,
        showPages: 5
      },
      allVaccineRecord: [],
      vaccineRecord: [],
      dog: null,
      account: null,
      antiparasite: null,
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
  }
</style>
