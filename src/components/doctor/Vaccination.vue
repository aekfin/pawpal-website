<template>
  <div id="vaccination">
    <div class="title-blue-green-card">
      <div class="container" style="margin-top: -5px;">
        <h2 style="display: inline-block;" v-if="dog">สมุดบันทึกประวัติการฉีดวัคซีนของ</h2>
        <div class="dog-sm-view" @click="dialogVisible = true" v-if="dog">{{dog.name}}<img :src="dog.image[0].image" class="img-dog"/></div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="small" style="padding-bottom: 30px;">
      <span slot="title" style="font-size: 24px; font-weight: bold">
        รายละเอียดสุนัข
      </span>
      <dog-information :dog="dog" :account="account"></dog-information>
      <div class="text-center" style="margin-top: 30px;"><a v-if="dog" :href="'/doctor/record/' + dog.id" target="_blank" class="btn btn-info btn-lg" style="border: none;">ดูประวัติการฉีดวัคซีนทั้งหมด</a></div>
    </el-dialog>
    <div class="container animated fadeIn">
      <div class="container-fluid white-card">
        <h3 class="text-center"><b>ตารางบันทึกการฉีดวัคซีน และป้องกันโรคพยาธิหนอนหัวใจปีละครั้ง</b></h3>
        <loading :theme="'dark'" :size="'normal'" v-if="isLoading" style="padding-bottom: 100px;"></loading>
        <table class="table table-hover" v-else>
          <thead>
            <tr>
              <th class="text-center" 
                  :style="(i === tableHeader.length-1) ? 'border-bottom: 3px solid #447A5C;' : 'border-bottom: 3px solid #447A5C; border-right: 1px solid #447A5C;' " 
                  v-for="(th, i) in tableHeader" :key="i">
                <span class="th-header">{{th.th}}</span><br><span class="en-header">{{th.en}}</span>
              </th>
            </tr>
          </thead>
          <tbody style="cursor: pointer">
            <tr v-for="(vl, i) in vaccineRecord" :key="i" data-toggle="modal" data-target="#form_modal" @click="OpenForm(i)" :class="vl.class">
              <td class="text-center" style="width: 25%;" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
                <div v-if="vl" data-toggle="tooltip" data-placement="left" :title="vl.vaccinationFor.th+' ('+vl.vaccinationFor.en+')'">
                  <div class="th-tr-body">{{vl.vaccinationFor.th}}</div>
                  <div class="en-tr-body">({{vl.vaccinationFor.en}})</div>
                </div>
              </td>
              <td  class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.date_record}}</span>
              </td>
              <td  class="text-center" style="width: 15%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.next_vaccine}}</span>
              </td>
              <td  class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.veterinary}}</span>
              </td>
              <td class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-border' : ''">
                <div v-if="vl.doses && vl.doses['selected']">
                  <img v-for = "(dose, j) in vl.doses['selected']" :key="j" :src="dose.image" data-toggle="tooltip" data-placement="right" :title = "GetDosesTooltip(dose)" class="img-vaccine-sm">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="...">
        <loading :theme="'light'" :size="'normal'" v-if="isSaving"></loading>
        <ul class="pager" v-else>
          <li><a v-if="dog" :href="'/doctor/record/' + dog.id" target="_blank" class="btn btn-primary btn-lg">ดูประวัติการฉีดวัคซีนทั้งหมด</a></li>
          <li @click="CheckVaccineToRecord()"><span class="btn btn-success btn-lg">บันทึกประวัติการฉีดวัคซีน</span></li>
        </ul>
      </nav>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="successModal"></simplert>
    <!-- Modal -->
    <div class="modal fade" id="form_modal" tabindex="-1" role="dialog"> 
      <simplert :useRadius="true" :useIcon="true" ref="errorModal"></simplert>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><i class="material-icons">&#xE14C;</i></button>
            <div v-if="vaccineRecord[currentVL]" class="modal-title text-center">
              <h3 class="th-header">{{vaccineRecord[currentVL].vaccinationFor.th}}</h3>
              <h4 class="en-header">({{vaccineRecord[currentVL].vaccinationFor.en}})</h4>
            </div>
          </div>
          <div class="modal-body" style="vertical-align: top;">
            <div v-for="(th, i) in tableHeader" :key="i" v-if="i > 0">
              <div style="width: 50%; text-align: right; display: inline-block; padding-right: 5%;"> 
                <h4>{{th.th}}</h4>
              </div>
              <div style="width: 45%; text-align: left; display: inline-block;">
                <datepicker 
                  v-if = "i <= 2" 
                  v-model = "vaccineRecordForm[i-1]" 
                  :bootstrapStyling = "false" 
                  :input-class = "'date-input width-100'" 
                  :wrapper-class = "'width-100'"
                  :format = "'dd MMM yyyy'">
                </datepicker>
                <input v-if="i===3" class="form-control" v-model="vaccineRecordForm[i-1]" type="text">
                <input v-show="false" class="form-control" v-model="doses.str">
              </div>
              <div v-if="i===4" style="border: 1px solid lightgray; border-radius: 5px; margin-top: 10px; margin-left: 5%; margin-right: 5%; padding: 10px 10px 5px 10px; overflow: auto; min-height: 100px; max-height: 205px;">
                <div v-for="(vrf, index) in vaccineRecordForm[i-1]" :key="index" style="display: inline-block;">
                  <img :src="vrf.image" @click="SelectDoses(vrf, index)" :class="vrf.class" data-toggle="tooltip" data-placement="bottom" :title="GetDosesTooltip(vrf)"/>
                </div>
                <h3 v-if= "vaccineRecordForm[i-1] && vaccineRecordForm[i-1].length === 0" class="text-center">ไม่มีวัคซีน</h3>
              </div>
              <div v-if="i===4 && vaccineRecordForm[i-1] && vaccineRecordForm[i-1].length > 0" style="color: red; margin: 5px 0px 0px 5%;">*สามารถเลือกสติ๊กเกอร์วัคซีนได้สูงสุด 3 อันเท่านั้น</div>
            </div>
          </div>
          <div class="modal-footer">
            <div style="margin: 0px 5%;">
              <div class="pull-left">
                <button type="button" class="btn btn-danger btn-lg" @click="ClearForm">ล้างข้อมูล</button>
              </div>
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-lg" data-dismiss="modal" @click="ResetForm">ยกเลิก</button>
                <button type="button" class="btn btn-success btn-lg" @click="SaveForm">บันทึกข้อมูล</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Datepicker from 'vuejs-datepicker'
import Loading from '@/components/common/Loading.vue'
import Simplert from 'vue2-simplert'
import DogInformation from '@/components/doctor/components/DogInformation.vue'

export default {
  components: {
    Datepicker, Loading, Simplert, DogInformation
  },
  created () {
    this.isLoading = true
    this.$http.post('/api/vaccine-for/', {'hospital_id': this.$store.getters.GetHospital.id}).then(response => {
      var vf = response.body
      this.vaccineRecord = []
      for (var i = 0; i < vf.length; i++) {
        this.vaccineRecord.push({ vaccinationFor: { id: vf[i].id, th: vf[i].note, en: vf[i].name, routine: vf[i].routine }, date_record: null, next_vaccine: null, veterinary: null, doses: vf[i].vaccine_stock_list, class: null })
      }
      this.$http.post('/api/vaccine-book/', {appointment_key: this.$route.params.appointment_id}).then(response => {
        var vb = response.body
        // console.log(vb)
        this.account = vb.account
        this.dog = vb.dog
        for (var i = 0; i < this.vaccineRecord.length; i++) {
          for (var j = 0; j < vb.vaccine_for.length; j++) {
            if (vb.vaccine_for[j].id === this.vaccineRecord[i].vaccinationFor.id) {
              this.vaccineRecord[i].date_record = this.DateFormat(new Date())
              this.vaccineRecord[i].next_vaccine = this.MakeRoutine(new Date(), this.vaccineRecord[i].vaccinationFor.routine)
              this.vaccineRecord[i].veterinary = this.$store.getters.GetUser.license
            }
          }
        }
        $(document).ready(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
        this.isLoading = false
      }, response => {
        console.log(response)
      })
    }, response => {
      console.log(response)
    })
  },
  methods: {
    DateFormat (date) {
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    PrevPage () {
      this.pagination.current_page -= 1
    },
    NextPage () {
      this.pagination.current_page += 1
    },
    MakeRoutine (date, routine) {
      date.setDate(date.getDate() + parseInt(routine.slice(0, routine.indexOf(' '))))
      return this.DateFormat(date)
    },
    OpenForm (index) {
      this.currentVL = index
      if (this.vaccineRecord[this.currentVL].date_record) {
        this.vaccineRecordForm[0] = this.vaccineRecord[this.currentVL].date_record
      } else {
        this.vaccineRecordForm[0] = this.DateFormat(new Date())
      }
      if (this.vaccineRecord[this.currentVL].next_vaccine) {
        this.vaccineRecordForm[1] = this.vaccineRecord[this.currentVL].next_vaccine
      } else {
        this.vaccineRecordForm[1] = this.MakeRoutine(new Date(this.vaccineRecordForm[0]), this.vaccineRecord[this.currentVL].vaccinationFor.routine)
      }
      if (this.vaccineRecord[this.currentVL].veterinary) {
        this.vaccineRecordForm[2] = this.vaccineRecord[this.currentVL].veterinary
      } else {
        this.vaccineRecordForm[2] = this.$store.getters.GetUser.license
      }
      this.vaccineRecordForm[3] = this.vaccineRecord[this.currentVL].doses
      this.vaccineRecordForm[3].forEach(function (vrf) {
        if (this.vaccineRecord[this.currentVL].doses['selected'] !== undefined) {
          var selected = false
          this.vaccineRecord[this.currentVL].doses['selected'].forEach(function (vr) {
            if (vr.id === vrf.id) {
              selected = true
            }
          }, this)
          if (selected) {
            vrf.class = 'img-vaccine-active'
            this.doses.push(vrf)
          } else {
            vrf.class = 'img-vaccine'
          }
        } else {
          vrf.class = 'img-vaccine'
        }
      }, this)
      for (var i = 0; i < this.vaccineRecord.length; i++) {
        if (index === i) {
          this.vaccineRecord[i].class = 'tr-selected'
        } else {
          this.vaccineRecord[i].class = ''
        }
      }
    },
    SelectDoses (vrf, index) {
      if (vrf.class === 'img-vaccine') {
        vrf.class = 'img-vaccine-active'
        this.doses.push(vrf)
        if (this.doses.length > 3) {
          this.doses[0].class = 'img-vaccine'
          this.doses = this.doses.splice(1, this.doses.length)
        }
      } else {
        vrf.class = 'img-vaccine'
        for (var i = 0; i < this.doses.length; i++) {
          if (this.doses[i] === vrf) {
            this.doses.splice(i, 1)
          }
        }
      }
      console.log(this.doses)
    },
    GetDosesTooltip (vrf) {
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      return 'บริษัทผู้ผลิต: ' + vrf.brand + ', ชื่อวัคซีน: ' + vrf.name + ', รหัสวัคซีน: ' + vrf.serial + ', วันผลิต: ' + vrf.mfg + ', วันหมดอายุ: ' + vrf.exp
    },
    ResetForm () {
      this.vaccineRecordForm = [null, null, null, null]
      this.vaccineRecord[this.currentVL].class = ''
      this.doses = []
    },
    ClearForm () {
      this.vaccineRecord[this.currentVL].date_record = ''
      this.vaccineRecord[this.currentVL].next_vaccine = ''
      this.vaccineRecord[this.currentVL].veterinary = ''
      this.vaccineRecord[this.currentVL].doses['selected'] = []
      this.ResetForm()
      $('#form_modal').modal('toggle')
    },
    SaveForm () {
      if (this.vaccineRecord[this.currentVL].date_record !== '' && this.vaccineRecord[this.currentVL].next_vaccine !== '' && this.vaccineRecord[this.currentVL].veterinary !== '' && this.doses.length > 0 && this.vaccineRecord[this.currentVL].veterinary !== undefined) {
        if (this.vaccineRecord[this.currentVL].date_record !== '') {
          this.vaccineRecord[this.currentVL].date_record = this.DateFormat(new Date(this.vaccineRecordForm[0]))
        }
        if (this.vaccineRecord[this.currentVL].next_vaccine !== '') {
          this.vaccineRecord[this.currentVL].next_vaccine = this.DateFormat(new Date(this.vaccineRecordForm[1]))
        }
        if (this.vaccineRecord[this.currentVL].veterinary !== '' || this.vaccineRecord[this.currentVL].veterinary !== undefined) {
          this.vaccineRecord[this.currentVL].veterinary = this.vaccineRecordForm[2]
        }
        if (this.doses.length > 0) {
          this.vaccineRecord[this.currentVL].doses['selected'] = this.doses
        }
        this.ResetForm()
        $('#form_modal').modal('toggle')
      } else {
        let obj = {
          title: 'เกิดข้อผิดพลาด',
          message: 'กรุณาใส่ข้อมูลในช่องให้ครบทุกช่อง',
          type: 'error',
          customCloseBtnText: 'ปิดหน้าต่าง',
          onClose: null
        }
        this.$refs.errorModal.openSimplert(obj)
      }
    },
    ShowResult () {
      let obj = {
        title: 'บันทึกสำเร็จ',
        message: '<div style="text-align: left; padding: 0px 20px; font-size: 16px;"><div style="font-size: 14px;"><div>วันที่บันทึก: <b>' + new Date().toDateString() + '</b></div><div style="margin-top: 5px;">สุนัขที่ได้รับวัคซีน: <b>' + this.dog.name + '</b></div><div style="margin-top: 5px;">เจ้าของสุนัข: <b>' + this.account.first_name + '  ' + this.account.last_name + '</b></div></div>' + '<div style="padding-top: 10px;">รายการวัคซีนที่ฉีด</div>' + this.recordList + '</div>',
        type: 'success',
        customCloseBtnText: 'กลับสู่หน้าหลัก',
        onClose: this.onClose
      }
      this.$refs.successModal.openSimplert(obj)
    },
    CheckVaccineToRecord () {
      var vaccineRecord = []
      this.isSaving = true
      for (var i = 0; i < this.vaccineRecord.length; i++) {
        if (this.vaccineRecord[i].date_record && this.vaccineRecord[i].next_vaccine && this.vaccineRecord[i].veterinary && this.vaccineRecord[i].doses['selected'] && this.vaccineRecord[i].doses['selected'][0]) {
          vaccineRecord.push(this.vaccineRecord[i])
          this.recordList += '<div style="padding-left: 10px; font-size: 12px; margin-top: 3px;">- ' + this.vaccineRecord[i].vaccinationFor.th + '</div>'
        }
      }
      this.SaveVaccineRecord(vaccineRecord)
    },
    SaveVaccineRecord (vaccineRecord) {
      for (var i = 0; i < vaccineRecord.length; i++) {
        var vaccineStockList = []
        var j = 0
        while (vaccineRecord[i].doses['selected'][j]) {
          vaccineStockList.push(vaccineRecord[i].doses['selected'][j].id)
          j++
        }
        var dateRecord = new Date(vaccineRecord[i].date_record)
        var nextVaccine = new Date(vaccineRecord[i].next_vaccine)
        var vr = {
          'vaccine_for': vaccineRecord[i].vaccinationFor.id,
          'dog': this.dog.id,
          'note': '',
          'vaccine_stock_list': vaccineStockList,
          'date_record': new Date(dateRecord.getTime() - (dateRecord.getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
          'next_vaccine': new Date(nextVaccine.getTime() - (nextVaccine.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
        }
        var index = i
        this.$http.post('/api/vaccine-record/', vr).then(response => {
          console.log(response)
          if (index === vaccineRecord.length - 1) {
            this.ShowResult()
            this.isSaving = false
          }
        }, response => {
          console.log(response)
          this.isSaving = false
        })
      }
    },
    onClose () {
      this.$router.replace('/doctor/vaccination/')
    }
  },
  data () {
    return {
      td: [ 'td-1', 'td-2', 'td-3', 'td-4', 'td-5' ],
      popover1: false,
      isLoading: false,
      isSaving: false,
      dialogVisible: false,
      currentVL: 0,
      account: null,
      dog: null,
      doses: [],
      recordList: '',
      vaccineRecordForm: [this.DateFormat(new Date()), '', '', ''],
      tableHeader: [
        { th: 'วัคซีนป้องกันโรค', en: 'Vaccination Against' },
        { th: 'วันที่ฉีด', en: 'Date of Vaccination' },
        { th: 'นัดครั้งต่อไป', en: 'Next Vaccination' },
        { th: 'สัตวแพทย์/เลขที่ใบอนุญาต', en: 'Veteinary / License No.' },
        { th: 'ชื่อวัคซีน/หมายเลขการผลิต', en: 'Name / Lot No.' }
      ],
      vaccineRecord: []
    }
  }
}
</script>

<style lang="scss">
  $table-color: #447A5C;
  $pagination-color: darken($table-color, 10%);
  $hover-color: lighten($table-color, 40%);
  $brown-color: #49392C;

  #vaccination {
    padding-bottom: 40px;
    .date-input {
      font-size: 14px !important;
    }
    .white-card {
      margin-top: 20px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      h3 {
        margin-top: 0px;
        padding-top: 10px;
        padding-bottom: 20px;
      }
      .vaccination {
        padding-bottom: 40px;
        z-index: -1;
      }
      .th-header {
        font-weight: bold;
      }
      .en-header {
        font-weight: 400; 
        color: grey;
      }
      .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
        background-color: $hover-color;
      }
      tr{
        td{
          vertical-align: middle;
        }
      }
      .tr-selected {
        background-color: $hover-color;
      }
      .th-tr-body {
        font-family: "Mitr", sans-serif;
        font-weight: 400;
        font-size: 14px;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .en-tr-body {
        color: grey;
        font-weight: 400;
        font-size: 14px;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .right-border {
        border-right: 1px solid $table-color;
      }
      .bottom-border {
        border-bottom: 1px solid $table-color;
      }
      .bottom-right-border {
        border-bottom: 1px solid $table-color;
        border-right: 1px solid $table-color;
      }
      .width-100 {
        width: 100%;
      }
    }
    nav > ul > li.page > span {
      cursor: default;
      background-color: $table-color;
      color: white;
      border: 2px solid white;
      font-size: 18px;
      margin-right: 10px;
    }
    .img-vaccine {
      border-radius: 6px;
      width: 140px;
      height: 90px;
      margin-right: 5px;
      margin-bottom: 5px;
      border: 3px solid white;
      cursor: pointer;
      display: inline-block;
    }
    .img-vaccine-sm {
      display: inline-block;
      border-radius: 6px;
      width: 60px;
      height: 40px;
      margin-right: 5px;
    }
    .img-vaccine-sm:hover {
      filter: brightness(150%);
    }
    .img-vaccine-active {
      @extend .img-vaccine;
      border: 3px solid red;
      filter: brightness(150%);
    }
    .img-vaccine:hover {
      filter: brightness(150%);
    }
    .detail-doses {
      display: inline-block;
    }
    .date-input {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      font-size: 18px;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .simplert__header {
      padding-bottom: 18px;
    }
  }
</style>
