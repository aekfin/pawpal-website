<template>
  <div class="vaccination">
    <nav-bar :type = "'dark'"></nav-bar>
    <div class="dark-blue-card">
      <div class="container">
        <h2>สมุดวัคซีน</h2>
      </div>
    </div>
    <div class="container animated fadeIn">
      <div class="container-fluid white-card" style="margin-top:20px">
        <h3 class="text-center"><b>ตารางบันทึกการฉีดวัคซีน และป้องกันโรคพยาธิหนอนหัวใจปีละครั้ง</b></h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="text-center" 
                  :style="(i === tableHeader.length-1) ? 'border-bottom: 3px solid #a87d5e;' : 'border-bottom: 3px solid #a87d5e; border-right: 1px solid #a87d5e;' " 
                  v-for="(th, i) in tableHeader" :key="th">
                <span class="th-header">{{th.th}}</span><br><span class="en-header">{{th.en}}</span>
              </th>
            </tr>
          </thead>
          <tbody style="cursor: pointer">
            <tr v-for="(vl, i) in vaccineLog" :key="vl" data-toggle="modal" data-target="#form_modal" @click="OpenForm(i)" :class="vl.class">
              <td class="text-center" style="width: 25%" :class="(i !== vaccineLog.length-1) ? 'bottom-right-border' : 'right-border'">
                <div class="th-tr-body">{{vl.vaccinationFor.th}}</div>
                <span class="en-tr-body">({{vl.vaccinationFor.en}})</span>
              </td>
              <td  class="text-center" style="width: 20%" :class="(i !== vaccineLog.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.date_record}}</span>
              </td>
              <td  class="text-center" style="width: 15%" :class="(i !== vaccineLog.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.next_vaccine}}</span>
              </td>
              <td  class="text-center" style="width: 20%" :class="(i !== vaccineLog.length-1) ? 'bottom-right-border' : 'right-border'">
                <span class="th-tr-body">{{vl.veterinary}}</span>
              </td>
              <td  class="text-center" style="width: 20%" :class="(i !== vaccineLog.length-1) ? 'bottom-border' : ''">
                <div class="btn btn-vaccines">
                  จำนวนวัคซีน <span class="badge">{{vl.doses.length}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="...">
        <ul class="pager">
          <li class="previous" v-if="pagination.current_page > 1" @click="PrevPage"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span> หน้าก่อน</a></li>
          <li class="page"><span>{{pagination.current_page}} / {{pagination.total_page}}</span></li>
          <li @click="NewPage"><a href="#"><span class="glyphicon glyphicon-file" style="margin-right: 5px;"></span>สร้างหน้าใหม่</a></li>
          <li class="next" v-if="pagination.current_page !== pagination.total_page" @click="NextPage"><a href="#">หน้าถัดไป <span class="glyphicon glyphicon-chevron-right"></span></a></li>
        </ul>
      </nav>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="form_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <div class="modal-title text-center">
              <h3 class="th-header">{{vaccineLog[currentVL].vaccinationFor.th}}</h3>
              <h4 class="en-header">({{vaccineLog[currentVL].vaccinationFor.en}})</h4>
            </div>
          </div>
          <div class="modal-body">
            <div v-for="(th, i) in tableHeader" :key="th">
              <div v-if="i!=0" style="width: 50%; text-align: right; display: inline-block; padding-right: 5%;"> 
                <h4>{{th.th}}</h4>
              </div>
              <div v-if="i!=0" style="width: 45%; text-align: left; display: inline-block;">
                <datepicker 
                  v-if = "i <= 2" 
                  v-model = "vaccineLogForm[i-1]" 
                  :bootstrapStyling = "false" 
                  :input-class = "'date-input width-100'" 
                  :wrapper-class = "'width-100'"
                  :format = "'dd MMM yyyy'">
                </datepicker> 
                <input v-if="i>2" class="form-control" v-model="vaccineLogForm[i-1]" type="text">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="ResetForm">ย้อนกลับ</button>
            <button type="button" class="btn btn-primary" @click="SaveForm">บันทึกข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DogList from '@/components/dog/DogList.vue'
import NavBar from '@/components/common/Navbar.vue'
import $ from 'jquery'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    DogList, NavBar, Datepicker
  },
  methods: {
    DateFormat (date) {
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    NewPage () {
      this.pagination.current_page = 1
      this.pagination.total_page += 1
      this.vaccineLog = $.extend(true, {}, this.vaccineLogDefault)
    },
    PrevPage () {
      this.pagination.current_page -= 1
    },
    NextPage () {
      this.pagination.current_page += 1
    },
    OpenForm (index) {
      this.currentVL = index
      if (this.vaccineLog[this.currentVL].date_record !== '') {
        this.vaccineLogForm[0] = this.vaccineLog[this.currentVL].date_record
      } else {
        this.vaccineLogForm[0] = this.DateFormat(new Date())
      }
      this.vaccineLogForm[1] = this.vaccineLog[this.currentVL].next_vaccine
      this.vaccineLogForm[2] = this.vaccineLog[this.currentVL].veterinary
      this.vaccineLogForm[3] = this.vaccineLog[this.currentVL].name
      for (var i = 0; i < this.vaccineLog.length; i++) {
        if (index === i) {
          this.vaccineLog[i].class = 'tr-selected'
        } else {
          this.vaccineLog[i].class = ''
        }
      }
    },
    ResetForm () {
      this.vaccineLogForm = [this.DateFormat(new Date()), '', '', '']
      this.vaccineLog[this.currentVL].class = ''
    },
    SaveForm () {
      if (this.vaccineLog[this.currentVL].date_record !== '') {
        this.vaccineLog[this.currentVL].date_record = this.DateFormat(new Date(this.vaccineLogForm[0]))
      }
      if (this.vaccineLog[this.currentVL].next_vaccine !== '') {
        this.vaccineLog[this.currentVL].next_vaccine = this.DateFormat(new Date(this.vaccineLogForm[1]))
      }
      if (this.vaccineLog[this.currentVL].veterinary !== '') {
        this.vaccineLog[this.currentVL].veterinary = this.vaccineLogForm[2]
      }
      if (this.vaccineLog[this.currentVL].doses !== '') {
        this.vaccineLog[this.currentVL].doses = []
      }
      this.ResetForm()
      $('#form_modal').modal('toggle')
    }
  },
  data () {
    return {
      td: [ 'td-1', 'td-2', 'td-3', 'td-4', 'td-5' ],
      dialogVisible: false,
      currentVL: 0,
      vaccineLogForm: [this.DateFormat(new Date()), '', '', ''],
      pagination: {
        current_page: 1,
        total_page: 4
      },
      tableHeader: [
        { th: 'วัคซีนป้องกันโรค', en: 'Vaccination Against' },
        { th: 'วันที่ฉีด', en: 'Date of Vaccination' },
        { th: 'นัดครั้งต่อไป', en: 'Next Vaccination' },
        { th: 'สัตวแพทย์/เลขที่ใบอนุญาติ', en: 'Veteinary / License No.' },
        { th: 'ชื่อวัคซีน/หมายเลขชุดการผลิต', en: 'Name / Lot No.' }
      ],
      vaccineLog: [
        { vaccinationFor: { th: 'วัคซีนป้องกันโรคหลอดลมอักเสบติดต่อ', en: 'Canine Cough' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนป้องกันโรคลำไส้อักเสบติดต่อ', en: 'Parvovirus and Coronavorus' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนรวมป้องกันโรคหัด ตับอักเสบ พาราอินฟลูเอนซา เลปโตสไปโรซิส และพาร์โวไวรัส', en: 'Distemper, Adenovirus2, Parainfluenza, Leptospirosis and Parvovirus' }, date_record: this.DateFormat(new Date('03 Jun 2017')), next_vaccine: this.DateFormat(new Date('10 Jun 2017')), veterinary: 'กรณี 01-880/52', doses: [ '', '' ], class: '' },
        { vaccinationFor: { th: 'วัคซีนรวมป้องกันโรคหัด ตับอักเสบ พาราอินฟลูเอนซา เลปโตสไปโรซิส พาร์โวไวรัส และ โคโรนาไวรัส', en: 'Distemper, Adenovirus2, Parainfluenza, Leptospirosis Parvovirus and Coronavirus' }, date_record: this.DateFormat(new Date('03 Jun 2017')), next_vaccine: this.DateFormat(new Date('03 Jul 2017')), veterinary: 'สุพัณนา', doses: [ '', '' ], class: '' },
        { vaccinationFor: { th: 'วัคซีนโรคพิษสุนัขบ้า', en: 'Rabies' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'ยาป้องกันโรคพยาธิหนอนหัวใจ ชนิดปีละครั้ง', en: 'OnceAyear heart worm prevention' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' }
      ],
      vaccineLogDefault: [
        { vaccinationFor: { th: 'วัคซีนป้องกันโรคหลอดลมอักเสบติดต่อ', en: 'Canine Cough' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนป้องกันโรคลำไส้อักเสบติดต่อ', en: 'Parvovirus and Coronavorus' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนรวมป้องกันโรคหัด ตับอักเสบ พาราอินฟลูเอนซา เลปโตสไปโรซิส และพาร์โวไวรัส', en: 'Distemper, Adenovirus2, Parainfluenza, Leptospirosis and Parvovirus' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนรวมป้องกันโรคหัด ตับอักเสบ พาราอินฟลูเอนซา เลปโตสไปโรซิส พาร์โวไวรัส และ โคโรนาไวรัส', en: 'Distemper, Adenovirus2, Parainfluenza, Leptospirosis Parvovirus and Coronavirus' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'วัคซีนโรคพิษสุนัขบ้า', en: 'Rabies' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' },
        { vaccinationFor: { th: 'ยาป้องกันโรคพยาธิหนอนหัวใจ ชนิดปีละครั้ง', en: 'OnceAyear heart worm prevention' }, date_record: '', next_vaccine: '', veterinary: '', doses: [], class: '' }
      ]
    }
  }
}
</script>

<style lang="scss">
  $page-color: #3F2D27;

  .vaccination {
    .white-card {
      h3 {
        margin-top: 0px;
        padding-top: 10px;
        padding-bottom: 20px;
      }
    }
  }
  nav > ul > li.page > span {
    cursor: default;
    background-color: $page-color;
    color: white;
    border: 2px solid white;
    margin-right: 10px;
  }
  nav > ul.pager > li > a {
    color: $page-color;
    background-color: white;
    font-weight: 500;
    border: 2px solid $page-color;
    transition-duration: 0.5s;
  }
  nav > ul.pager > li > a:hover {
    color: white;
    border: 2px solid white;
    background-color: $page-color;
  }
  .vaccination {
    padding-bottom: 40px;
    z-index: -1;
  }
  .th-header {
    font-weight: 500;
  }
  .en-header {
    font-weight: 400; 
    color: grey;
  }
  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: #E1C4A5;
  }
  .tr-selected {
    background-color: #E1C4A5;
  }
  .th-tr-body {
    font-family: "Mitr", sans-serif;
    font-weight: 300;
    font-size: 14px;
  }
  .en-tr-body {
    color: grey;
    font-weight: 400;
    font-size: 14px;
  }
  .right-border {
    border-right: 1px solid #9D6D4B;
  }
  .bottom-border {
    border-bottom: 1px solid #a87d5e;
  }
  .bottom-right-border {
    border-bottom: 1px solid #a87d5e;
    border-right: 1px solid #a87d5e;
  }
  .width-100 {
    width: 100%;
  }
  .date-input {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn-vaccines {
    margin-top: 5px;
    cursor: default; 
    color: white;
    background-color: #7C5139;
  }
  .btn.btn-vaccines:hover {
    color: white;
  }
  .btn-vaccines > .badge {
    background-color: white;
    color: #7C5139;
  }
</style>
