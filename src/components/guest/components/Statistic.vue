<template>
  <div id="statistics">
    <div class="white-card col-xs-12">
      <div class="dog-data">
        <h2>ข้อมูลของสุนัขในระบบ</h2>
        <table class="table table-bordered animated fadeIn" v-for="(dogData, i) in dogsData" :key="i" v-if="(tab === 'first' && i <= 1) || (tab === 'second' && i > 1)">
          <thead>
            <tr>
              <th>{{dogData.topic}}<div v-if="dogData.options" style="font-size: 13px;" >({{dogData.options[dogData.selected].name}})</div></th>
              <th>จำนวน (ตัว)<div v-if="dogData.options" style="height: 18.4px"></div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dog, j) in dogData.contents" :key="j">
              <td style="width: 70%;">{{dog.name}}</td>
              <td style="width: 30%; text-align: center;">{{dog.amount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['selectedRegion', 'selectedProvince', 'dogsData', 'tab'],
    methods: {
    },
    data () {
      return {
        dialogVisible: false,
        selected: null
      }
    }
  }
</script>

<style lang='scss'>
  #statistics {
    .dog-data {
      h2 {
        margin-top: 0px;
        margin-bottom: 20px;
      }
    }
    th {
      font-size: 18px;
      font-weight: normal;
      background-color: #cebd99;
      border: 2px solid darken(#cebd99, 40%);
    }
    td {
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
      border: 2px solid gray;
    }
  }
</style>