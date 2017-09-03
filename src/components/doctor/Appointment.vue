<template>
  <div id="appointment">
    <div class="title-blue-green-card">
      <div class="container">
        <h2>ค้นหาสมุดวัคซีน</h2>
      </div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card text-center animated fadeIn">
      <div class="col-xs-12 no-padding">
        <input type="text" class="form-control input-lg" v-model="searchText" placeholder="รหัสนัดหมาย, รหัสสมาชิก, ชื่อเจ้าของสุนัข, ชื่อสุนัข, เบอร์โทร, ที่อยู่" @keyup.enter = "Searching()">
        <span class="btn btn-brown btn-lg" @click="Searching()">ค้นหา</span>
      </div>
      <div class="alert alert-danger col-xs-12" v-if="alert[0].name" :class="alert[0].class">{{alert[0].name}}</div>
    </div>
    <div class="container col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 white-card m-t-20 animated fadeIn" v-if="searchResult">
      <loading v-if="isLoading"></loading>
      <div style="padding: 0px 20px" v-else>
        <div v-if="appointments.length > 0 || users.length > 0 || dogs.length > 0">
          <div class="pull-left">
            <div class="label-yellow">จากรายการนัดหมาย</div>
            <div class="label-blue">จากรายชื่อสมาชิก</div>
            <div class="label-red">จากรายชื่อสุนัข</div>
          </div>
          <div class="btn btn-lg btn-success pull-right" style="display: inline-block;" v-if="isSelected" @click="SelectingDog()">เข้าสู่หน้าวัคซีน</div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-for="(th, i) in thLabel" :key="th">{{th}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appointment, i) in appointments" :key="appointment.key" :class="appointment.class" @click="ActiveClass(1, i)">
                <td>{{appointment.key}}</td>
                <td>{{appointment.account_id}}</td>
                <td>{{appointment.account_name}}</td>
                <td>{{appointment.dog}}</td>
              </tr>
              <tr v-for="(user, i) in users" :key="user.account_id" :class="user.class" @click="ActiveClass(2, i)">
                <td>-</td>
                <td>{{user.account_id}}</td>
                <td>{{user.account_name}}</td>
                <td style="padding: 0px auto">
                  <select class="form-control input-lg" v-model="user.model" v-if="user.dog.length > 0" :disabled="user.disabled">
                    <option v-for="(dog, i) in user.dog" :key="dog.id" :value="dog.id">{{dog.name}}</option>
                  </select>
                  <span v-else>-</span>
                </td>
              </tr>
              <tr v-for="(dog, i) in dogs" :key="dog.account_id" :class="dog.class" @click="ActiveClass(3, i)">
                <td>-</td>
                <td>{{dog.account_id}}</td>
                <td>{{dog.account_name}}</td>
                <td>{{dog.dog.name}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-12 text-center not-found" v-else>ไม่พบข้อมูล</div>
        <div style="display: none;">{{this.refresh}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    Loading
  },
  data () {
    return {
      alert: [{name: null, class: null}, {name: null, class: null}],
      searchText: null,
      searchResult: false,
      isLoading: false,
      thLabel: ['รหัสการนัดหมาย', 'รหัสสมาชิก', 'ชื่อสมาชิก', 'ชื่อสุนัข'],
      appointments: [],
      users: [],
      dogs: [],
      isSelected: false,
      selected: null,
      refresh: false
    }
  },
  methods: {
    SearchDogs () {
      this.alert[1].name = 'ไม่พบสมาชิกดังกล่าว'
      this.alert[1].class = 'animated fadeIn'
      this.dogList = ['A', 'B', 'C']
      this.dog.model = this.dogList[0]
    },
    Searching () {
      this.searchResult = true
      this.isLoading = true
      this.$http.post('/api/search-appointment/', { 'search': this.searchText, 'hospital_id': this.$store.getters.GetHospital.id }).then(response => {
        console.log(response)
        this.appointments = response.body.appointment_list
        this.users = response.body.account_list
        this.dogs = response.body.dog_list
        this.ChooseDog()
        this.ActiveClass(0, 0)
        this.isLoading = false
      }, error => {
        console.log(error)
        this.isLoading = false
      })
    },
    SelectingDog () {
      if (this.selected.type === 1) {
        this.$router.push('/doctor/vaccination/' + this.appointments[this.selected.index].key)
      } else {
        this.isLoading = true
        var dog = null
        if (this.selected.type === 2) {
          dog = this.users[this.selected.index].model
        } else {
          dog = this.dogs.dog.id
        }
        var date = new Date()
        this.$http.post('/api/add-appointment/', { 'date': date.toISOString().substring(0, 10), 'hospital': this.$store.getters.GetHospital.id, 'dog': dog }).then(response => {
          console.log(response)
          this.$router.push('/doctor/vaccination/' + response.body.key)
          this.isLoading = false
        }, error => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    ActiveClass (type, index) {
      for (var i = 0; i < this.appointments.length; i++) {
        if (type === 1 && index === i) {
          this.appointments[i].class = 'active-yellow'
          this.isSelected = true
        } else {
          this.appointments[i].class = 'tr-yellow'
        }
      }
      for (i = 0; i < this.users.length; i++) {
        if (type === 2 && index === i) {
          this.users[i].class = 'active-blue'
          this.users[i].disabled = false
          this.isSelected = true
        } else {
          this.users[i].disabled = true
          this.users[i].class = 'tr-blue'
        }
      }
      for (i = 0; i < this.dogs.length; i++) {
        if (type === 3 && index === i) {
          this.dogs[i].class = 'active-red'
          this.isSelected = true
        } else {
          this.dogs[i].class = 'tr-red'
        }
      }
      this.selected = { type: type, index: index }
      this.refresh = !this.refresh
    },
    ChooseDog () {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].dog.length > 0) {
          this.users[i].model = this.users[i].dog[0].id
        } else {
          this.users[i].model = null
        }
      }
    },
    AcceptCode () {
      if (this.codeUrl) {
        this.$router.push('/doctor/vaccination/' + this.codeUrl)
      } else {
        this.alert[0].name = 'ไม่พบการนัดหมายดังกล่าว'
        this.alert[0].class = 'animated fadeIn'
      }
    }
  }
}
</script>

<style lang="scss">
  $brown-color: #49392C;
  
  #appointment {
    .white-card {
      padding: 30px 15px;
      margin-top: 1%;
    }
    .alert {
      margin-top: 5px;
      margin-bottom: 0px;
    } 
    .btn{
      width: 20%;
      display: inline-block;
      margin-top: -5px;
      transition-duration: 0.5s;
    }
    .spinner {
      margin: 30px auto;
    }
    .form-control:focus, .form-control:active {
      padding-left: 17px;
    }
    tr {
      height: 43px;
      text-align: center;
      th {
        font-size: 18px;
        padding-top: 30px;
        border-bottom: 3px solid $brown-color;
        text-align: center;
      }
      td {
        vertical-align: middle;
        cursor: pointer;
        border-bottom: 1px solid $brown-color;
        .form-control {
          padding: 0px;
          height: 30px;
        }
        .form-control:focus, .form-control:active {
          padding: 0px;
          border: 1px solid black !important;
          box-shadow: none !important;
        }
      }
    }
    .not-found {
      color: $brown-color;
      font-size: 30px;
      font-weight: bold;
      margin: 30px 0px;
    }
    .hint-label {
      display: inline-block;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 5px;
    }
    .label-yellow {
      @extend .hint-label;
      background-color:#FFF176
    }
    .label-blue {
      @extend .hint-label;
      background-color: #BBDEFB;
    }
    .label-red {
      @extend .hint-label;
      background-color: #ffcdd2;
    }
    .active-yellow {
      background-color: darken(#FFF176, 10%) !important;  
    }
    .active-blue {
      background-color: darken(#BBDEFB, 10%);
    }
    .active-red {
      background-color: darken(#ffcdd2, 10%);
    }
    .tr-yellow {
      background-color: lighten(#FFF176, 10%);
    }
    .tr-blue {
      background-color: lighten(#BBDEFB, 10%);
    }
    .tr-red {
      background-color:#ffcdd2;
    }
    .tr-yellow:hover {
      @extend .active-yellow;
    }
    .tr-blue:hover {
      @extend .active-blue;
    }
    .tr-red:hover {
      @extend .active-red;
    }
  }
</style>
