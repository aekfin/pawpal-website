<template>
  <div id="statistics">
    <div class="white-card col-xs-12">
      <div class="dog-data">
        <h2>ข้อมูลของสุนัขในระบบ</h2>
        <table class="table table-bordered" v-for="(dogData, i) in dogsData" :key="i">
          <thead>
            <tr>
              <th>{{dogData.topic}}</th>
              <th>จำนวน (ตัว)</th>
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
    props: ['selectedRegion', 'selectedProvince', 'dogsData'],
    methods: {
    },
    data () {
      return {
        dialogVisible: false,
        tabs: 0,
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
      background-color: #c9b68e;
      border: 2px solid darken(#c9b68e, 40%);
    }
    td {
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
      border: 2px solid gray;
    }
  }
</style>