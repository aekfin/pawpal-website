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
        <div class="col-xs-2"><div class="btn btn-primary" v-if="!mode" style="margin-top: 5px; background-color: #4c4c4c;" @click="Backward()">ย้อนกลับ</div></div> 
        <div class="col-xs-4 text-right" style="font-size: 25px; font-weight: bold;">ข้อมูลเชิงลึก</div>
        <div class="col-xs-1 col-xs-offset-2 text-right no-padding" style="font-size: 20px; margin-top: 4px; padding-right: 10px;">เลือกปี</div>
        <div class="col-xs-2 no-padding">
          <select class="form-control" v-model="yearSelector.selected" @change="UpdateYearSelector()">
            <option v-for="(option, i) in yearSelector.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
      <div class="col-xs-12">
        <div :class="mode ? 'animated fadeIn' : 'non-display'">
          <canvas id="yearChart" width="100" height="100"></canvas>
        </div>
        <div :class="!mode ? 'animated fadeIn' : 'non-display'">
          <canvas id="monthChart" width="100" height="100"></canvas>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btn btn-default" style="margin-top: 20px" @click="dialogVisible = false">ปิดหน้าต่าง</div>
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
      this.CreateOverallGraph()
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
      Backward () {
        this.mode = true
        this.CreateSpecificGraph('yearChart', this.months, [1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30])
      },
      CreateSpecificGraph (id, labels, data) {
        var self = this
        $(document).ready(function () {
          var ctx = document.getElementById(id)
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'สุนัขที่ได้รับวัคซีน',
                data: data,
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
            console.log('(' + event.offsetX + ', ' + event.offsetY + ')')
            for (var i = 0; i < self.months.length; i++) {
              var min = (i * 100)
              if (event.offsetX > 0 && event.offsetX < min + 65 && event.offsetY > 380 && event.offsetY < 400 && self.mode) {
                self.mode = false
                self.CreateSpecificGraph('monthChart', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], [1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30, 1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30, 1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30])
                break
              }
            }
          }
          console.log(myChart)
        })
      },
      CreateOverallGraph () {
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
              self.CreateSpecificGraph('yearChart', self.months, [1, 5, 7, 11, 12, 13, 17, 18, 19, 25, 27, 30])
            }
          }
        })
      }
    },
    data () {
      return {
        dialogVisible: false,
        yearSelector: { selected: new Date().getFullYear(), options: [new Date().getFullYear()] },
        months: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        mode: true
      }
    }
  }
</script>

<style lang='scss'>
  #graph {
    .el-dialog {
      top: 2% !important;
    }
    .non-display {
      display: none;
    }
  }
</style>

