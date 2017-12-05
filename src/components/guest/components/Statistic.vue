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
      <div class="btn btn-primary btn-lg col-xs-12" @click="dialogVisible = true">แสดงกราฟ</div>
      <el-dialog
        title="กราฟแสดงสถิติของสุนัข"
        :visible.sync="dialogVisible"
        width="small">
        <el-tabs v-model="tabs">
          <el-tab-pane v-for="(dogData, i) in dogsData" :key="i" :label="dogData.topic" :name="i"></el-tab-pane>
        </el-tabs>
        <div style="width: 50%; margin-left: 25%; margin-right: 25%;">
          <canvas id="myChart" width="100" height="100"></canvas>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">ปิดหน้าต่าง</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js'
  export default {
    props: ['selectedRegion', 'selectedProvince'],
    updated () {
      if (this.dialogVisible) {
        var ctx = document.getElementById('myChart').getContext('2d')
        console.log(this.dogsData[this.tabs].contents.slice(0, 2))
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [this.dogsData[this.tabs].contents[0].name, this.dogsData[this.tabs].contents[1].name],
            datasets: [{
              label: 'จำนวนสุนัข',
              data: [this.dogsData[this.tabs].contents[0].amount, [this.dogsData[this.tabs].contents[0].amount - [this.dogsData[this.tabs].contents[1].amount]]],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 2
            }]
          }
        })
        console.log(myChart)
      }
    },
    methods: {
      GetRegion () {
        switch (this.selectedRegion) {
          case 'all':
            return 'ภูมิภาคทั้งหมด'
          case 'northern':
            return 'ภาคเหนือ'
          case 'northeastern':
            return 'ภาคตะวันออกเฉียงเหนือ'
          case 'central':
            return 'ภาคกลาง'
          case 'southern':
            return 'ภาคใต้'
        }
      }
    },
    data () {
      return {
        dialogVisible: false,
        tabs: 0,
        selected: null,
        dogsData: [
          {
            topic: 'ข้อมูลทั่วไปของสุนัข',
            contents: [
              { name: 'สุนัขทั้งหมด', amount: '85' },
              { name: 'สุนัขที่ได้รับวัคซีน', amount: '72' },
              { name: 'สุนัขที่ได้รับการรักษาพยาธิ', amount: '68' }
            ]
          },
          {
            topic: 'ข้อมูลสุนัขที่เจ้าของทำหาย',
            contents: [
              { name: 'สุนัขที่เจ้าของทำหาย', amount: '20' },
              { name: 'สุนัขที่เจ้าของได้รับคืน', amount: '17' }
            ]
          },
          {
            topic: 'ข้อมูลสุนัขที่ถูกพบ',
            contents: [
              { name: 'สุนัขที่ถูกพบ', amount: '30' },
              { name: 'สุนัขที่ถูกพบแล้วเจ้าของได้รับคืน', amount: '18' }
            ]
          }
        ]
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
    .el-dialog {
      margin-top: 0px;
      top: 5% !important;
    }
    .el-dialog__title {
      font-size: 22px;
      font-weight: normal
    }
    th {
      font-size: 18px;
      font-weight: normal;
      background-color: lighten(#677483, 35%);
      border: 2px solid lighten(#677483, 20%);
    }
    td {
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
      border: 2px solid lighten(#677483, 20%);
    }
  }
</style>