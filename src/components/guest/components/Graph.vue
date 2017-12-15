<template>
  <div id="graph">
    <div class="col-xs-12 col-sm-12 col-md-4" v-for="(dogData, i) in dogsData" :key="i">
      <canvas :id="dogData.topic" width="100" height="100"></canvas>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      size="large">
      <div slot="title" class="dialog-header" style="margin-bottom: 20px">
        <div class="col-xs-6 text-right" style="font-size: 25px; font-weight: bold;">ข้อมูลเชิงลึก</div>
        <div class="col-xs-1 col-xs-offset-2 text-right" style="font-size: 20px; margin-top: 4px;">เลือกปี</div>
        <div class="col-xs-2 no-padding">
          <select class="form-control" v-model="yearSelector.selected" @change="UpdateYearSelector()">
            <option v-for="(option, i) in yearSelector.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
      <div class="col-xs-12">
        <canvas id="lineChart" width="100" height="100"></canvas>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btn btn-lg btn-default" style="margin-top: 20px" @click="dialogVisible = false">ปิดหน้าต่าง</div>
      </div>
    </el-dialog> 
  </div>
</template>

<script>
  import Chart from 'chart.js'
  import $ from 'jquery'
  export default {
    props: ['dogsData'],
    created () {
      this.UpdateYearSelector()
    },
    mounted () {
      this.CreatePieGraph()
    },
    methods: {
      UpdateYearSelector () {
        this.yearSelector.options = []
        var year = this.yearSelector.selected - 3
        if (this.yearSelector.selected === new Date().getFullYear()) {
          year = this.yearSelector.selected - 6
        }
        for (var i = 0; i < 7; i++) {
          this.yearSelector.options.push(year + i)
        }
      },
      CreateLineGraph () {
        $(document).ready(function () {
          var ctx = document.getElementById('lineChart')
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
              datasets: [{
                label: 'สุนัขที่ได้รับวัคซีน',
                data: [1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30],
                fill: false,
                borderColor: [
                  'rgba(163,137,80, 1)'
                ],
                backgroundColor: [
                  'rgba(163,137,80, 1)'
                ],
                borderWidth: 3
              }]
            },
            options: {
              legend: {
                labels: {
                  defaultFontSize: '14px',
                  fontColor: '#4c4c4c',
                  fontFamily: 'Mitr, sans-serif'
                }
              },
              scales: {
                yAxes: [{
                  ticks: {
                    fontSize: 14,
                    fontFamily: 'Mitr, sans-serif'
                  }
                }],
                xAxes: [{
                  ticks: {
                    fontSize: 16,
                    fontFamily: 'Mitr, sans-serif'
                  }
                }]
              },
              maintainAspectRatio: false
            }
          })
          ctx.style.height = '400px'
          ctx.onclick = function (event) {
            console.log(event)
          }
          console.log(myChart)
        })
      },
      CreatePieGraph () {
        var chart = []
        var self = this
        this.dogsData.forEach(function (dog, index) {
          var config = {
            type: 'pie',
            data: {
              labels: [dog.contents[1].name, dog.contents[2].name],
              datasets: [{
                label: 'จำนวนหมา',
                data: [dog.contents[1].amount, dog.contents[2].amount],
                backgroundColor: [
                  'rgba(163,137,80, 0.8)',
                  'rgba(125,96,74, 0.8)'
                ],
                borderColor: [
                  'rgba(163,137,80, 1)',
                  'rgba(125,96,74, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              legend: {
                labels: {
                  defaultFontSize: '14px',
                  fontColor: '#4c4c4c',
                  fontFamily: 'Mitr, sans-serif'
                }
              }
            }
          }
          config.options.title = {
            display: true,
            text: dog.topic,
            fontSize: 20,
            fontFamily: 'Mitr, sans-serif',
            fontColor: '#4c4c4c',
            fontStyle: 'normal'
          }
          chart.push(new Chart(document.getElementById(dog.topic), config))
          document.getElementById(dog.topic).onclick = function (evt) {
            var activePoints = chart[index].getElementsAtEvent(evt)
            if (activePoints[0]) {
              self.dialogVisible = true
              self.CreateLineGraph()
            }
          }
        })
      }
    },
    data () {
      return {
        dialogVisible: false,
        yearSelector: { selected: new Date().getFullYear(), options: [new Date().getFullYear()] },
        dogsDataYear: [
        ]
      }
    }
  }
</script>

<style lang='scss'>
  #graph {
    .el-dialog {
      top: 2% !important;
    }
  }
</style>

