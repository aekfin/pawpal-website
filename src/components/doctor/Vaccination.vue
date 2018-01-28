<template>
  <div id="vaccination">
    <div class="title-blue-green-card">
      <div class="container" style="margin-top: -5px;">
        <h2 style="display: inline-block;" v-if="dog">สมุดบันทึกประวัติการฉีดวัคซีนของ</h2>
        <div class="dog-sm-view" @click="dialogVisible = true" v-if="dog">{{dog.name}}<img :src="dog.image[0].image" class="img-dog"/></div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="large" style="padding-bottom: 30px;">
      <span slot="title" style="font-size: 24px; font-weight: bold">
        รายละเอียดสุนัข
      </span>
      <dog-information :dog="dog" :account="account"></dog-information>
      <div class="text-center" style="margin-top: 30px;"><router-link v-if="dog" :to="'/doctor/record/' + dog.id" class="btn btn-info btn-lg" style="border: none;">ดูประวัติการฉีดวัคซีนทั้งหมด</router-link></div>
    </el-dialog>
    <div class="container animated fadeIn">
      <div class="white-card">
        <h3 class="text-center"><b>ตารางประวัติการฉีดวัคซีนและป้องกันโรคเห็บหมัดหนอนหัวใจปีละครั้ง</b></h3>
        <h4 class="text-center"><b>น้ำหนักของสุนัข </b>
          <input class="form-control input-weight" type="number" min="0" step="0.1" v-if="dog" v-model="dog.weight" /> <b>กิโลกรัม</b>
        </h4>
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
          <li><router-link v-if="dog" :to="'/doctor/record/' + dog.id" class="btn btn-primary btn-lg">ดูประวัติการฉีดวัคซีนทั้งหมด</router-link></li>
          <li @click="CheckVaccineToRecord()"><span class="btn btn-success btn-lg">บันทึกประวัติการฉีดวัคซีน</span></li>
        </ul>
      </nav>
    </div>
    <simplert :useRadius="true" :useIcon="true" ref="errorModal2"></simplert>
    <simplert :useRadius="true" :useIcon="true" ref="successModal"></simplert>
    <!-- Modal -->
    <div class="modal fade" id="form_modal" tabindex="-1" role="dialog"> 
      <simplert :useRadius="true" :useIcon="true" ref="errorModal"></simplert>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="border: none;">
            <button type="button" class="close" data-dismiss="modal"><i class="material-icons">&#xE14C;</i></button>
            <div v-if="vaccineRecord[currentVL]" class="modal-title text-center">
              <h3 class="th-header">{{vaccineRecord[currentVL].vaccinationFor.th}}</h3>
              <h4 class="en-header">({{vaccineRecord[currentVL].vaccinationFor.en}})</h4>
            </div>
            <div class="text-center mode">
              <input type="radio" name="mode" value="0" v-model="mode"><div>ประวัติแบบปกติ</div>
              <input type="radio" name="mode" value="1" v-model="mode"><div>ประวัติแบบไม่นัดหมายต่อ</div>
              <input type="radio" name="mode" value="2" v-model="mode"><div>เลื่อนการนัดหมาย</div>
            </div>
          </div>
          <div class="modal-body" style="vertical-align: top; margin-bottom: 30px;">
            <div v-for="(th, i) in tableHeader" :key="i" v-if="i > 0 && (mode === '0' || (mode === '1' && i !== 2) || (mode === '2' && i === 2))">
              <div style="width: 50%; text-align: right; display: inline-block; padding-right: 5%;"> 
                <h4>{{th.th}}</h4>
              </div>
              <div style="width: 45%; text-align: left; display: inline-block;">
                <datepicker
                  v-if = "i == 1"
                  v-model = "vaccineRecordForm[0]"
                  :disabled = "{from: new Date()}"
                  @input="DateChanged(i, vaccineRecordForm[i-1])"
                  :bootstrapStyling = "false"
                  :input-class = "'date-input width-100'" 
                  :wrapper-class = "'width-100'"
                  :format = "'dd MMM yyyy'">
                </datepicker>
                <datepicker
                  v-if = "i == 2"
                  v-model = "vaccineRecordForm[1]"
                  :disabled = "{to: new Date()}"
                  :bootstrapStyling = "false"
                  :input-class = "'date-input width-100'" 
                  :wrapper-class = "'width-100'"
                  :format = "'dd MMM yyyy'">
                </datepicker>
                <input v-if="i===3" class="form-control" v-model="vaccineRecordForm[i-1]" type="text" disabled>
                <input v-show="false" class="form-control" v-model="doses.str">
              </div>
              <div v-if="i===4" style="border: 1px solid #896b52; border-radius: 5px; margin-top: 10px; margin-left: 5%; margin-right: 5%; padding: 10px 10px 5px 10px; overflow: auto; min-height: 100px; max-height: 205px;">
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
                <button type="button" class="btn btn-danger btn-lg" @click="ClearForm">ลบประวัติการฉีดวัคซีน</button>
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
        this.vaccineRecord.push({ vaccinationFor: { id: vf[i].id, th: vf[i].note, en: vf[i].name, routine: vf[i].routine }, date_record: null, next_vaccine: null, veterinary: null, doses: vf[i].vaccine_stock_list, class: null, mode: '0', filled: false })
      }
      this.$http.post('/api/vaccine-book/', {appointment_key: this.$route.params.appointment_id}).then(response => {
        var vb = response.body
        // console.log(vb)
        this.account = vb.account
        this.dog = vb.dog
        if (this.dog.image.length === 0) {
          this.dog.image.push({image: require('@/assets/finder/dog-upload.png')})
        }
        for (var i = 0; i < this.vaccineRecord.length; i++) {
          for (var j = 0; j < vb.vaccine_for.length; j++) {
            if (vb.vaccine_for[j].id === this.vaccineRecord[i].vaccinationFor.id) {
              this.vaccineRecord[i].date_record = this.DateFormat(new Date())
              this.vaccineRecord[i].filled = false
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
    DateChanged (index, date) {
      if (index === 1) {
        this.vaccineRecordForm[1] = this.MakeRoutine(new Date(date), this.routine)
      }
    },
    OpenForm (index) {
      this.currentVL = index
      this.mode = this.vaccineRecord[this.currentVL].mode
      this.routine = this.vaccineRecord[this.currentVL].vaccinationFor.routine
      if (this.vaccineRecord[this.currentVL].date_record) {
        this.vaccineRecordForm[0] = this.vaccineRecord[this.currentVL].date_record
      } else {
        this.vaccineRecordForm[0] = this.DateFormat(new Date())
      }
      if (this.vaccineRecord[this.currentVL].next_vaccine) {
        this.vaccineRecordForm[1] = this.vaccineRecord[this.currentVL].next_vaccine
      } else {
        this.vaccineRecordForm[1] = this.MakeRoutine(new Date(this.vaccineRecordForm[0]), this.routine)
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
      this.mode = '0'
      this.doses = []
    },
    ClearForm () {
      this.vaccineRecord[this.currentVL].date_record = ''
      this.vaccineRecord[this.currentVL].next_vaccine = ''
      this.vaccineRecord[this.currentVL].veterinary = ''
      this.vaccineRecord[this.currentVL].doses['selected'] = []
      this.vaccineRecord[this.currentVL].filled = false
      this.ResetForm()
      $('#form_modal').modal('toggle')
    },
    SaveForm () {
      var filled = false
      this.vaccineRecord[this.currentVL].mode = this.mode
      switch (this.mode) {
        case '0':
          if (this.vaccineRecordForm[0] !== '' && this.vaccineRecordForm[1] !== '' && this.vaccineRecordForm[2] !== '' && this.doses.length > 0) {
            this.vaccineRecord[this.currentVL].date_record = this.DateFormat(new Date(this.vaccineRecordForm[0]))
            this.vaccineRecord[this.currentVL].next_vaccine = this.DateFormat(new Date(this.vaccineRecordForm[1]))
            this.vaccineRecord[this.currentVL].veterinary = this.vaccineRecordForm[2]
            this.vaccineRecord[this.currentVL].doses['selected'] = this.doses
            filled = true
          } else {
            filled = false
          }
          break
        case '1':
          if (this.vaccineRecordForm[0] !== '' && this.vaccineRecordForm[2] !== '' && this.doses.length > 0) {
            this.vaccineRecord[this.currentVL].date_record = this.DateFormat(new Date(this.vaccineRecordForm[0]))
            this.vaccineRecord[this.currentVL].next_vaccine = ''
            this.vaccineRecord[this.currentVL].veterinary = this.vaccineRecordForm[2]
            this.vaccineRecord[this.currentVL].doses['selected'] = this.doses
            filled = true
          } else {
            filled = false
          }
          break
        case '2':
          if (this.vaccineRecordForm[1] !== '') {
            this.vaccineRecord[this.currentVL].date_record = ''
            this.vaccineRecord[this.currentVL].next_vaccine = this.DateFormat(new Date(this.vaccineRecordForm[1]))
            this.vaccineRecord[this.currentVL].veterinary = ''
            this.vaccineRecord[this.currentVL].doses['selected'] = []
            filled = true
          } else {
            filled = false
          }
          break
      }
      if (filled) {
        this.vaccineRecord[this.currentVL].filled = true
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
        message: '<div style="text-align: left; padding: 0px 20px; font-size: 16px;"><div style="font-size: 14px;"><div>วันที่บันทึก: <b>' + new Date().toDateString() + '</b></div><div style="margin-top: 5px;">สุนัขที่ได้รับวัคซีน: <b>' + this.dog.name + ' (' + this.dog.weight + ' กก.)</b></div><div style="margin-top: 5px;">เจ้าของสุนัข: <b>' + this.account.first_name + '  ' + this.account.last_name + '</b></div></div>' + '<div style="padding-top: 10px;">รายการวัคซีนที่ฉีด</div>' + this.recordList + '</div>',
        type: 'success',
        useConfirmBtn: true,
        customConfirmBtnClass: 'btn btn-info',
        customConfirmBtnText: 'ดูประวัติการฉีดวัคซีนของสุนัข',
        customCloseBtnClass: 'btn btn-default',
        customCloseBtnText: 'กลับสู่หน้าหลัก',
        onConfirm: this.OnConfirm,
        onClose: this.OnClose
      }
      this.$refs.successModal.openSimplert(obj)
    },
    CheckVaccineToRecord () {
      var vaccineRecord = []
      this.isSaving = true
      for (var i = 0; i < this.vaccineRecord.length; i++) {
        if (this.vaccineRecord[i].filled) {
          vaccineRecord.push(this.vaccineRecord[i])
          this.recordList += '<div style="padding-left: 10px; font-size: 12px; margin-top: 3px;">- ' + this.vaccineRecord[i].vaccinationFor.th + '</div>'
        }
      }
      if (vaccineRecord.length > 0) {
        this.SaveVaccineRecord(vaccineRecord)
      } else {
        let obj = {
          title: 'เกิดข้อผิดพลาด',
          message: 'กรุณาบันทึกประวัติการฉีดวัคซีนอย่างน้อย 1 โรค',
          type: 'error',
          customCloseBtnText: 'ปิดหน้าต่าง',
          onClose: null
        }
        this.$refs.errorModal2.openSimplert(obj)
        this.isSaving = false
      }
    },
    GetDateISO (date) {
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
    },
    SaveVaccineRecord (vaccineRecord) {
      for (var i = 0; i < vaccineRecord.length; i++) {
        var vaccineStockList = []
        var j = 0
        while (vaccineRecord[i].doses['selected'] && vaccineRecord[i].doses['selected'][j]) {
          vaccineStockList.push(vaccineRecord[i].doses['selected'][j].id)
          j++
        }
        var dateRecord = ''
        var nextVaccine = ''

        if (vaccineRecord[i].date_record) {
          dateRecord = this.GetDateISO(new Date(vaccineRecord[i].date_record))
        }
        if (vaccineRecord[i].next_vaccine) {
          nextVaccine = this.GetDateISO(new Date(vaccineRecord[i].next_vaccine))
        }
        var vr = {
          'vaccine_for': vaccineRecord[i].vaccinationFor.id,
          'dog': this.dog.id,
          'weight': this.dog.weight,
          'note': '',
          'vaccine_stock_list': vaccineStockList,
          'date_record': dateRecord,
          'next_vaccine': nextVaccine
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
    OnClose () {
      this.$router.replace('/doctor/vaccination/')
    },
    OnConfirm () {
      this.$router.replace('/doctor/record/' + this.dog.id)
    }
  },
  data () {
    return {
      routine: null,
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
      mode: '0',
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
    .el-dialog--large {
      width: 70%;
    }
    .form-control {
      font-size: 16px;
    }
    .mode {
      input[type='radio'] {
        margin-right: 3px;
      }
      div {
        margin-right: 10px;
        font-size: 16px;
        display: inline-block;
      }
    }
    .white-card {
      margin-top: 20px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      h3 {
        margin-top: 0px;
        padding-top: 10px;
      }
      .input-weight {
        width: 60px;
        height: 28px;
        text-align: right;
        padding: 0px;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #4c4c4c;
        box-shadow: none;
        border-radius: 0px; 
      }
      .input-weight:focus, .input-weight:active{
        box-shadow: none;
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
      font-size: 16px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #896b52;
      border-radius: 4px;
    }
    .simplert__header {
      padding-bottom: 18px;
    }
  }
</style>
