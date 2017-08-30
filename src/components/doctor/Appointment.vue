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
      <div style="padding: 20px" v-else>
        <table class="table table-hover">
          <thead>
            <tr>
              <th v-for="(th, i) in thLabel" :key="th">{{th}}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr-green" v-for="(appointment, i) in appointments" :key="appointment.key">
              <td>{{appointment.key}}</td>
              <td>{{appointment.account_id}}</td>
              <td>{{appointment.account_name}}</td>
              <td>{{appointment.dog}}</td>
            </tr>
            <tr class="tr-red" v-for="(user, i) in users" :key="user.account_id">
              <td>-</td>
              <td>{{user.account_id}}</td>
              <td>{{user.account_name}}</td>
              <td>
                <select class="form-control input-lg" v-model="user.model">
                  <option v-for="(dog, i) in user.dog" :key="dog.id" :value="dog.id">{{dog.name}}</option>
                </select>
              </td>
            </tr>
            <tr class="tr-blue" v-for="(dog, i) in dogs" :key="dog.account_id">
              <td>-</td>
              <td>{{dog.account_id}}</td>
              <td>{{dog.account_name}}</td>
              <td>{{dog.dog.name}}</td>
            </tr>
          </tbody>
        </table>
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
      dogs: []
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
        this.SelectingDog()
        this.isLoading = false
      }, error => {
        console.log(error)
        this.isLoading = false
      })
    },
    SelectingDog () {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].dog.length > 0) {
          this.users[i].model = this.users[i].dog[0].id
          console.log(this.users[i].model)
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
      th {
        font-size: 18px;
      }
      td {
        cursor: pointer;
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
    .tr-green {
      background-color: #C5E6A6;
    }
    .tr-red {
      background-color: #F7C59F;
    }
    .tr-blue {
      background-color: #767B91;
    }
  }
</style>
