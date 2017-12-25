<template>
  <div id="graph">
    <el-tabs v-model="tabs" @tab-click="CreateOverallGraph()" style="margin: 15px 30px; min-height: 420px;">
      <el-tab-pane label="สุขภาพของสุนัข" name="first">
        <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-0 no-padding animated fadeInRight" v-for="(dogHealth, i) in dogsHealth" :key="i">
          <canvas :id="dogHealth.topic" width="100" height="100"></canvas>
        </div>
      </el-tab-pane>
      <el-tab-pane label="ความปลอดภัยของสุนัข" name="second">
        <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-0 no-padding animated fadeInLeft" v-for="(dogFinding, i) in dogsFinding" :key="i">
          <canvas :id="dogFinding.topic" width="100" height="100"></canvas>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      size="large">
      <div slot="title" class="dialog-header" style="margin-bottom: 20px">
        <div class="col-xs-1"><div class="btn btn-primary" v-if="!mode" style="margin-top: 5px; background-color: #4c4c4c;" @click="Backward()">ย้อนกลับ</div></div> 
        <div class="col-xs-7 text-right animated fadeIn" style="font-size: 25px; font-weight: bold;" v-if="dates && months && dogsHealth && dogsFinding">
          <span v-if="tabs === 'first' && dogsHealth[selectedType]">
            กราฟแสดง{{dogsHealth[selectedType].topic}}
          </span>
          <span v-if="tabs === 'second' && dogsFinding[selectedType]">
            กราฟแสดง{{dogsFinding[selectedType].topic}}
          </span>
          <span v-if="mode">({{months[0]}} - {{months[months.length - 1]}})</span>
          <span v-else>({{selectedMonth}})</span>
        </div>
        <div class="col-xs-1 col-xs-offset-1 text-right no-padding" style="font-size: 20px; margin-top: 4px; padding-right: 10px;">เลือกปี</div>
        <div class="col-xs-2 no-padding">
          <select class="form-control" v-model="yearSelector.selected" @change="UpdateYearSelector()">
            <option v-for="option in yearSelector.options" :key="option" :value="option">{{option}}</option>
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
      var dogAntiparasite = {
        topic: 'ข้อมูลการได้รับยาต้านเห็บและหมัด',
        contents: [
          this.dogsData[0].contents[0],
          this.dogsData[0].contents[3],
          this.dogsData[0].contents[4]
        ]
      }
      this.dogsHealth.push(this.dogsData[0])
      this.dogsHealth.push(dogAntiparasite)
      this.dogsFinding.push(this.dogsData[1])
      this.dogsFinding.push(this.dogsData[2])
      this.dogsFinding.push(this.dogsData[3])
      var self = this
      $(document).ready(function () {
        self.CreateOverallGraph()
      })
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
        this.FetchData('yearChart', { types: this.GetType(), year: this.yearSelector.selected.toString(), month: '', city: this.MapSelector().province, region: this.MapSelector().region })
      },
      Backward () {
        this.mode = true
        this.Fading()
        this.FetchData('yearChart', { types: this.GetType(), year: this.yearSelector.selected.toString(), month: '', city: this.MapSelector().province, region: this.MapSelector().region })
      },
      GetType () {
        if (this.tabs === 'first') {
          return this.types[0][this.selectedType]
        } else {
          return this.types[1][this.selectedType]
        }
      },
      GetIndex () {
        if (this.tabs === 'first') {
          return 0
        } else {
          return 1
        }
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
          console.log(dogs)
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
            for (var i = 0; i < data.length; i++) {
              if (this.tabs === 'first') {
                data[i].label = this.dogsHealth[this.selectedType].contents[i].name
              } else {
                data[i].label = this.dogsFinding[this.selectedType].contents[i].name
              }
            }
            switch (request.types) {
              case 'vaccine':
                data[0].dataset.push(dog.result.all_dog)
                data[1].dataset.push(dog.result.vaccine_dog)
                break
              case 'antiparasite':
                data[0].dataset.push(dog.result.all_dog)
                data[1].dataset.push(dog.result.antiparasite_dog)
                break
              case 'lost':
                data[0].dataset.push(dog.result.lost_dog)
                data[1].dataset.push(dog.result.lost_back_dog)
                break
              case 'found':
                data[0].dataset.push(dog.result.found_dog)
                data[1].dataset.push(dog.result.found_back_dog)
                break
              case 'adopt':
                data[0].dataset.push(dog.result.adopt_dog)
                data[1].dataset.push(dog.result.take_dog)
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
          var color = []
          color.push(self.color[self.GetIndex()][self.selectedType].border[0])
          color.push(self.color[self.GetIndex()][self.selectedType].border[1])
          var config = {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: data[0].label,
                  data: data[0].dataset,
                  fill: false,
                  borderColor: color[1],
                  backgroundColor: color[1],
                  borderWidth: 3
                }, {
                  label: data[1].label,
                  data: data[1].dataset,
                  fill: false,
                  borderColor: color[0],
                  backgroundColor: color[0],
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
              var min = (i * 8.3)
              var offset = {
                x: (event.offsetX / ctx.offsetWidth) * 100,
                y: (event.offsetY / ctx.offsetHeight) * 100
              }
              if (self.mode && (activePoints[0] || (offset.x > min && offset.x < min + 8 && offset.y > 93 && offset.y < 98))) {
                if (activePoints[0]) {
                  var index = activePoints[0]['_index']
                } else {
                  index = i
                  console.log(index)
                }
                self.selectedMonth = self.months[index]
                self.mode = false
                self.Fading()
                self.FetchData('monthChart', { types: self.GetType(), year: self.yearSelector.selected.toString(), month: self.selectedMonth, city: self.MapSelector().province, region: self.MapSelector().region })
                break
              }
            }
          }
        })
      },
      CreateOverallGraph () {
        var chart = []
        var self = this
        if (this.tabs === 'first') {
          var dogs = this.dogsHealth
        } else {
          dogs = this.dogsFinding
        }
        dogs.forEach(function (dog, index) {
          var config = {
            type: 'pie',
            data: {
              labels: [dog.contents[1].name, dog.contents[2].name],
              datasets: [{
                label: 'จำนวนหมา',
                data: [dog.contents[1].amount, dog.contents[2].amount],
                backgroundColor: self.color[self.GetIndex()][index].background,
                borderColor: self.color[self.GetIndex()][index].border,
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
              self.selectedType = index
              self.UpdateYearSelector()
              self.Fading()
              self.FetchData('yearChart', { types: self.GetType(), year: self.yearSelector.selected.toString(), month: '', city: self.MapSelector().province, region: self.MapSelector().region })
            }
          }
        })
        this.$emit('changingTabs', this.tabs)
      }
    },
    data () {
      return {
        dialogVisible: false,
        yearSelector: { selected: new Date().getFullYear(), options: [new Date().getFullYear()] },
        color: [
          [
            {background: ['rgba(98,195,112, 0.8)', 'rgba(73, 57, 44, 0.8)'], border: ['rgba(98,195,112, 1)', 'rgba(73, 57, 44, 1)']},
            {background: ['rgba(165, 208, 76, 0.8)', 'rgba(73, 57, 44, 0.8)'], border: ['rgba(165, 208, 76, 1)', 'rgba(73, 57, 44, 1)']}
          ],
          [
            {background: ['rgba(178, 149, 88, 0.8)', 'rgba(73, 57, 44, 0.8)'], border: ['rgba(178, 149, 88, 1)', 'rgba(73, 57, 44, 1)']},
            {background: ['rgba(105, 165, 173, 0.8)', 'rgba(73, 57, 44, 0.8)'], border: ['rgba(105, 165, 173, 1)', 'rgba(73, 57, 44, 1)']},
            {background: ['rgba(101, 202, 255, 0.8)', 'rgba(73, 57, 44, 0.8)'], border: ['rgba(101, 202, 255, 1)', 'rgba(73, 57, 44, 1)']}
          ]
        ],
        dates: [],
        months: [],
        mode: true,
        yearChart: null,
        monthChart: null,
        tabs: 'first',
        types: [['vaccine', 'antiparasite'], ['lost', 'found', 'adopt']],
        selectedType: '',
        selectedTypeIndex: -1,
        selectedMonth: '',
        specificData: {},
        dogsHealth: [],
        dogsFinding: []
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

