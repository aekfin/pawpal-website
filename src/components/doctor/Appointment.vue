<template>
  <div id="appointment">
    <div class="title-light-green-card">
      <div class="container">
        <h2>สมุดการนัดหมาย</h2>
      </div>
    </div>
    <div class="container">
      <div class="white-card col-xs-12 animated fadeIn">
        <div class="col-xs-12 col-sm-8 no-padding" style="margin-bottom: 40px;">
          <div class="input-group">
            <div class="input-group-addon input-lg">การนัดหมายในวันที่</div>
            <select class="form-control input-lg" v-model="date" @change="FetchAppointments()">
              <option v-for="(date, i) in dates" :key="date.getTime()" :value="date.getTime()">{{DateFormat(date)}}</option>
            </select>
          </div>
        </div>
        <div class="col-xs-12 col-sm-3 col-sm-offset-1 no-padding">
          <button class="btn btn-success btn-lg" style="width: 70%; margin-left: 30%;" v-if="appointment" @click="GoToVaccineBook(appointment.key)">เข้าสู่สมุดวัคซีน</button>   
        </div>
        <loading class="col-xs-12" :theme="'dark'" :size="'normal'" v-if="isLoading"></loading>
        <div class="col-xs-12 no-padding" style="min-height: 240px;" v-else>
          <table class="table table-hover animated fadeIn" v-if="appointments.length > 0">
            <thead>
              <tr>
                <th v-for="(h, i) in headers" :key="h">{{h}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appointment, i) in appointments" :key="i" @click="ClickAppointment(appointment)" :class="appointment.class">
                <td>{{appointment.key}}</td>
                <td>{{appointment.dog}}</td>
                <td>{{appointment.account_name}}</td>
                <td>{{appointment.account_tel}}</td>
                <td data-toggle="tooltip" data-placement="right" :title = "appointment.tooltip">
                  <span v-if="appointment.vaccine_for_list.length === 0">-</span>
                  <span v-else>{{appointment.vaccine_for_list.length}} วัคซีน</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center not-found" v-else>
            <img src="../../assets/not-found.png"/>
            <h3>ไม่พบการนัดหมายของวันนี้</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import Simplert from 'vue2-simplert'
import $ from 'jquery'

export default {
  components: {
    Loading, Simplert
  },
  created () {
    this.RefreshTooltip()
    this.InitDates()
    document.title = 'สมุดการนัดหมาย'
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}],
      isLoading: false,
      date: null,
      dates: [],
      headers: ['รหัสการนัดหมาย', 'ชื่อสุนัข', 'ชื่อเจ้าของ', 'เบอร์ติดต่อ', 'วัคซีนที่ต้องการฉีด'],
      appointment: null,
      appointments: []
    }
  },
  methods: {
    DateFormat (date) {
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    InitDates () {
      var date = new Date()
      this.date = date.getTime()
      for (var i = 0; i < 7; i++) {
        this.dates.push(new Date(date.getTime()))
        date.setDate(date.getDate() + 1)
      }
      this.FetchAppointments()
    },
    RefreshTooltip () {
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    },
    ClickAppointment (apm) {
      this.appointments.forEach(function (appointment) {
        if (apm === appointment) {
          if (appointment.class === 'content-active') {
            appointment.class = 'content'
            this.appointment = null
          } else {
            appointment.class = 'content-active'
            this.appointment = appointment
          }
        } else {
          appointment.class = 'content'
        }
      }, this)
    },
    GoToVaccineBook (key) {
      this.$router.push('/doctor/vaccination/' + key)
    },
    GetDateISO (date) {
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
    },
    FetchAppointments () {
      this.appointments = []
      this.isLoading = true
      this.$http.post('/api/appointment/', { 'date': this.GetDateISO(new Date(this.date)), 'hospital': this.$store.getters.GetHospital.id }).then(response => {
        var appointments = response.body
        appointments.forEach(function (appointment) {
          appointment.tooltip = ''
          appointment.vaccine_for_list.forEach(function (vaccine) {
            appointment.tooltip += vaccine + ', '
          }, this)
          if (appointment.tooltip.length > 0) {
            appointment.tooltip = appointment.tooltip.substring(0, appointment.tooltip.length - 2)
          }
          appointment.class = 'content'
          this.appointments.push(appointment)
        }, this)
        this.RefreshTooltip()
        this.isLoading = false
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
  #appointment {
    .white-card {
      margin-bottom: 50px;
    }
    .input-group-addon {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      padding-left: 30px;
      padding-right: 30px;
    }
    .form-control {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      width: 100% !important;
    }
    .content-active {
      color: black;
      background-color: lighten(#49392C, 40%);
    }
    .content:hover {
      @extend .content-active;
    }
    .tooltip {
      width: 100%;
    }
    select {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
    }
    tr {
      cursor: pointer;
      th {
        font-size: 18px;
        text-align: center;
        cursor: default;
        color: white;
        font-weight: normal;
        background-color: #49392C;
        border-bottom: 3px solid #49392C;
      }
      td {
        text-align: center;
        border-bottom: 1px solid #49392C;
      }
    }
  }
</style>
