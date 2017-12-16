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
        <div class="col-xs-6 text-right" style="font-size: 25px; font-weight: bold;" v-if="dates && months">
          กราฟแสดงข้อมูลเชิงลึก
          <span v-if="mode">({{months[0]}} - {{months[months.length - 1]}})</span>
          <span v-else>({{selectedMonth}})</span>
        </div>
        <div class="col-xs-1 col-xs-offset-1 text-right no-padding" style="font-size: 20px; margin-top: 4px; padding-right: 10px;">เลือกปี</div>
        <div class="col-xs-2 no-padding">
          <select class="form-control" v-model="yearSelector.selected" @change="UpdateYearSelector()">
            <option v-for="(option, i) in yearSelector.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
      <div id="SpecificGraph" class="col-xs-12" style="min-height: 400px; opacity: 0;">
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
    props: ['dogsData', 'selectedProvince', 'selectedRegion'],
    mounted () {
      this.CreateOverallGraph()
    },
    methods: {
      UpdateYearSelector () {
        this.yearSelector.options = []
        var year = this.yearSelector.selected - 3
        if (this.yearSelector.selected >= new Date().getFullYear()) {
          year = this.yearSelector.selected - 6
        }
        for (var i = 0; i < 7; i++) {
          if (year + i <= new Date().getFullYear()) {
            this.yearSelector.options.push(year + i)
          }
        }
        this.mode = true
        this.Fading()
        this.FetchData('yearChart', { types: this.selectedType, year: this.yearSelector.selected.toString(), month: '', city: this.MapSelector().province, region: this.MapSelector().region })
      },
      Backward () {
        this.mode = true
        this.Fading()
        this.FetchData('yearChart', { types: this.selectedType, year: this.yearSelector.selected.toString(), month: '', city: this.MapSelector().province, region: this.MapSelector().region })
      },
      DestroyCharts () {
        if (this.yearChart) {
          this.yearChart.destroy()
        }
        if (this.monthChart) {
          this.monthChart.destroy()
        }
      },
      Fading () {
        $('#SpecificGraph').css('opacity', 0)
        $('#SpecificGraph').css('animation', '')
        setTimeout(() => {
          $('#SpecificGraph').css('animation', 'fading 1s')
          $('#SpecificGraph').css('opacity', 1)
        }, 500)
      },
      MapSelector () {
        var selector = {
          province: this.selectedProvince,
          region: this.selectedRegion
        }
        if (this.selectedProvince === 'จังหวัดทั้งหมด') {
          selector.province = ''
        }
        if (this.selectedRegion === 'ภูมิภาคทั้งหมด') {
          selector.region = ''
        }
        return selector
      },
      FetchData (id, request) {
        this.$http.post('/api/v2/dashboard/graph/', request).then(response => {
          var dogs = response.body
          var labels = []
          this.dates = []
          this.months = []
          var data = [
            {label: '', dataset: []},
            {label: '', dataset: []}
          ]
          dogs.forEach(dog => {
            if (id === 'yearChart') {
              labels.push(dog.month)
              this.months.push(dog.month)
            } else {
              labels.push(dog.date)
              this.dates.push(dog.date)
            }
            switch (request.types) {
              case 'vaccine':
                data[0].label = 'สุนัขทั้งหมด'
                data[0].dataset.push(dog.result.all_dog)
                data[1].label = 'สุนัขที่ได้รับวัคซีน'
                data[1].dataset.push(dog.result.vaccine_dog)
                break
              case 'lost':
                data[0].label = 'สุนัขที่เจ้าของทำหายทั้งหมด'
                data[0].dataset.push(dog.result.lost_dog)
                data[1].label = 'สุนัขที่เจ้าของได้รับคืน'
                data[1].dataset.push(dog.result.lost_back_dog)
                break
              case 'found':
                data[0].label = 'สุนัขที่เจ้าของทำหายทั้งหมด'
                data[0].dataset.push(dog.result.found_dog)
                data[1].label = 'สุนัขที่เจ้าของได้รับคืน'
                data[1].dataset.push(dog.result.found_back_dog)
                break
            }
          })
          this.CreateSpecificGraph(id, labels, data)
        }, err => {
          console.log(err)
        })
      },
      CreateSpecificGraph (id, labels, data) {
        var self = this
        this.DestroyCharts()
        $(document).ready(function () {
          var ctx = document.getElementById(id)
          var config = {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: data[0].label,
                  data: data[0].dataset,
                  fill: false,
                  borderColor: ['rgba(163,137,80, 1)'],
                  backgroundColor: ['rgba(163,137,80, 1)'],
                  borderWidth: 3
                }, {
                  label: data[1].label,
                  data: data[1].dataset,
                  fill: false,
                  borderColor: ['rgba(125,96,74, 1)'],
                  backgroundColor: ['rgba(125, 96, 74, 1)'],
                  borderWidth: 3
                }
              ]
            },
            options: {
              animation: false,
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
          }
          var chart = null
          if (id === 'yearChart') {
            self.yearChart = new Chart(ctx, config)
            chart = self.yearChart
          } else {
            self.monthChart = new Chart(ctx, config)
            chart = self.monthChart
          }
          ctx.style.height = '400px'
          ctx.onclick = function (event) {
            var activePoints = chart.getElementsAtEvent(event)
            for (var i = 0; i < self.months.length; i++) {
              var min = (i * 100)
              if ((activePoints[0] || (event.offsetX > 0 && event.offsetX < min + 65 && event.offsetY > 380 && event.offsetY < 400)) && self.mode) {
                if (activePoints[0]) {
                  var index = activePoints[0]['_index']
                } else {
                  index = i
                }
                self.selectedMonth = self.months[index]
                self.mode = false
                self.Fading()
                self.FetchData('monthChart', { types: self.selectedType, year: self.yearSelector.selected.toString(), month: self.selectedMonth, city: self.MapSelector().province, region: self.MapSelector().region })
                break
              }
            }
          }
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
          document.getElementById(dog.topic).onclick = function (event) {
            var activePoints = chart[index].getElementsAtEvent(event)
            if (activePoints[0]) {
              self.dialogVisible = true
              self.mode = true
              self.selectedType = self.types[index]
              self.UpdateYearSelector()
              self.Fading()
              self.FetchData('yearChart', { types: self.selectedType, year: self.yearSelector.selected.toString(), month: '', city: self.MapSelector().province, region: self.MapSelector().region })
            }
          }
        })
      }
    },
    data () {
      return {
        dialogVisible: false,
        yearSelector: { selected: new Date().getFullYear(), options: [new Date().getFullYear()] },
        dates: [],
        months: [],
        mode: true,
        yearChart: null,
        monthChart: null,
        types: ['vaccine', 'lost', 'found', 'antiparasite', 'adopt'],
        selectedType: '',
        selectedMonth: '',
        specificData: {}
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
    @keyframes fading {
      0%   {opacity: 0;}
      100%  {opacity: 1.0;}
    }
  }
</style>

