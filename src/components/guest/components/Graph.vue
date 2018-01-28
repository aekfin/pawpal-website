<template>
  <div id="graph">
    <el-tabs v-model="tabs" @tab-click="CreateOverallGraph()" style="margin: 15px 30px; min-height: 500px;">
      <el-tab-pane label="สุขภาพของสุนัข" name="first">
        <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-0 no-padding animated fadeInRight" v-for="(dogHealth, i) in dogsHealth" :key="i">
          <div style="font-size: 20px; text-align: center;">{{dogHealth.topic}}</div>
          <div style="padding: 0px 10%;" class="col-xs-12" v-if="tabs === 'first'">
            <select class="form-control" v-model="dogHealth.selected" @change="ChangeType(i, dogHealth)" v-if="i === 0">
              <option v-for="(option, j) in dogHealth.options" :key="option.name" :value="j">{{option.name}}</option>
            </select>
            <div style="height: 34px;" v-else></div>
          </div>
          <div :id="'chart' + i">
            <canvas :id="dogHealth.topic" width="100" height="100"></canvas>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="ความปลอดภัยของสุนัข" name="second">
        <div class="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-0 no-padding animated fadeInLeft" v-for="(dogFinding, i) in dogsFinding" :key="i">
          <div style="font-size: 20px; text-align: center;">{{dogFinding.topic}}</div>
          <canvas :id="dogFinding.topic" width="100" height="100"></canvas>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      size="large">
      <div slot="title" class="dialog-header col-xs-12" style="margin-bottom: 25px">
        <div class="col-xs-2"><div class="btn btn-primary" v-if="!mode" style="margin-top: 5px; background-color: #4c4c4c;" @click="Backward()">ย้อนกลับ</div></div> 
        <div class="col-xs-7 no-padding text-center animated fadeIn" style="font-size: 25px;" v-if="dates && months && dogsHealth && dogsFinding">
          <div v-if="tabs === 'first' && dogsHealth[selectedType]">
            กราฟแสดง{{dogsHealth[selectedType].topic}}
            <div style="font-size: 20px;" v-if="selectedType === 0">({{dogsHealth[selectedType].options[dogsHealth[selectedType].selected].name}})</div>
          </div>
          <div v-if="tabs === 'second' && dogsFinding[selectedType]">
            กราฟแสดง{{dogsFinding[selectedType].topic}}
          </div>
          <div v-if="mode">({{months[0]}} - {{months[months.length - 1]}})</div>
          <div v-else>({{selectedMonth}})</div>
        </div>
        <div class="col-xs-3 no-padding">
          <div class="col-xs-4 text-right no-padding" style="font-size: 20px; margin-top: 4px; padding-right: 10px;">เลือกปี</div>
          <div class="col-xs-8 no-padding">
            <select class="form-control" v-model="yearSelector.selected" @change="UpdateYearSelector()">
              <option v-for="option in yearSelector.options" :key="option" :value="option">{{option}}</option>
            </select>
          </div>
        </div>
      </div>
      <div id="SpecificGraph" class="col-xs-12" style="min-height: 400px;">
        <loading :theme="'dark'" :size="'normal'" v-if="loading" style="margin-top: 50px;"></loading>
        <div class="animated fadeIn" v-else>
          <div v-if="mode">
            <canvas id="yearChart"></canvas>
          </div>
          <div v-else>
            <canvas id="monthChart"></canvas>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="btn btn-default" style="margin-top: 20px" @click="CloseGraph()">ปิดหน้าต่าง</div>
      </div>
    </el-dialog> 
  </div>
</template>

<script>
  import Chart from 'chart.js'
  import $ from 'jquery'
  import Loading from '@/components/common/Loading.vue'
  export default {
    components: {
      Loading
    },
    props: ['dogsData', 'selectedProvince', 'selectedRegion'],
    mounted () {
      this.dogsHealth.push(this.dogsData[0])
      this.dogsHealth.push(this.dogsData[1])
      this.dogsFinding.push(this.dogsData[2])
      this.dogsFinding.push(this.dogsData[3])
      this.dogsFinding.push(this.dogsData[4])
      if (this.yearSelector.selected === new Date().getFullYear() && new Date().getMonth() === 0) {
        this.yearSelector.selected = new Date().getFullYear() - 1
      }
      var self = this
      $(document).ready(function () {
        self.CreateOverallGraph()
      })
    },
    methods: {
      ChangeType (index, dogHealth) {
        dogHealth.contents[1].amount = dogHealth.options[dogHealth.selected].count.have
        dogHealth.contents[2].amount = dogHealth.options[dogHealth.selected].count.none
        this.overallGraphs[index].destroy()
        $('#chart' + index).empty()
        $('#chart' + index).append('<canvas id="' + dogHealth.topic + '" width="100" height="100"></canvas>')
        this.CreateOverallGraph()
      },
      UpdateYearSelector () {
        this.yearSelector.options = []
        var year = this.yearSelector.selected - 3
        if (this.yearSelector.selected >= new Date().getFullYear()) {
          year = this.yearSelector.selected - 6
        }
        for (var i = 0; i < 7; i++) {
          if (year + i <= new Date().getFullYear()) {
            if (year + i < new Date().getFullYear() || new Date().getMonth() !== 0) {
              this.yearSelector.options.push(year + i)
            }
          }
        }
        this.mode = true
        this.Fading()
        this.FetchData('yearChart', { types: this.GetType(), year: this.yearSelector.selected.toString(), month: '', city: this.MapSelector().province, region: this.MapSelector().region })
      },
      Backward () {
        this.mode = true
        this.loading = true
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
      CloseGraph () {
        this.DestroyCharts()
        this.dialogVisible = false
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
        if (this.tabs === 'second') {
          var url = '/api/v2/dashboard/graph/'
        } else {
          url = '/api/statistics/' + request.types + '-graph/'
          request.year = '2017'
        }
        this.$http.post(url, request).then(response => {
          var dogs = response.body
          var labels = []
          this.dates = []
          this.months = []
          var data = []
          if (this.tabs === 'first') {
            var size = 3
          } else {
            size = 2
          }
          var names = ['ตามกำหนดเวลา', 'ช้ากว่ากำหนด', 'ไม่มาฉีดตามนัดหมาย']
          for (var i = 0; i < size; i++) {
            if (this.tabs === 'first') {
              if (i === 1) {
                if (this.selectedType === 0) {
                  names[i] += ' 3 เดือน'
                } else {
                  names[i] += ' 7 วัน'
                }
              }
              data.push({label: names[i], dataset: []})
            } else {
              data.push({label: this.dogsFinding[this.selectedType].contents[i].name, dataset: []})
            }
          }
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
                data[0].dataset.push(dog.result.vaccine_dog[this.dogsHealth[0].selected].count.on_time)
                data[1].dataset.push(dog.result.vaccine_dog[this.dogsHealth[0].selected].count.late)
                data[2].dataset.push(dog.result.vaccine_dog[this.dogsHealth[0].selected].count.gone)
                break
              case 'antiparasite':
                data[0].dataset.push(dog.result.antiparasite_dog.count.on_time)
                data[1].dataset.push(dog.result.antiparasite_dog.count.late)
                data[2].dataset.push(dog.result.antiparasite_dog.count.gone)
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
          this.loading = false
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
          var datasets = []
          if (self.tabs === 'first') {
            color.push(self.color[self.GetIndex()][self.selectedType].border[0])
            color.push('rgba(255, 117, 56, 1)')
            color.push('rgba(221, 79, 79, 1)')
          } else {
            color.push(self.color[self.GetIndex()][self.selectedType].border[1])
            color.push(self.color[self.GetIndex()][self.selectedType].border[0])
          }
          for (var i = 0; i < data.length; i++) {
            datasets.push({
              label: data[i].label,
              data: data[i].dataset,
              fill: false,
              borderColor: color[i],
              backgroundColor: color[i],
              borderWidth: 3
            })
          }
          var config = {
            type: 'line',
            data: {
              labels: labels,
              datasets: datasets
            },
            options: {
              animation: {
                duration: 5000
              },
              legend: {
                labels: {
                  defaultFontSize: '14px',
                  fontColor: '#4c4c4c',
                  fontFamily: 'Mitr, sans-serif'
                }
              },
              scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'จำนวน (ตัว)',
                    fontFamily: 'Mitr, sans-serif'
                  },
                  ticks: {
                    beginAtZero: true,
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
              maintainAspectRatio: false,
              scaleStartValue: 0
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
              if (self.mode && self.tabs === 'second' && (activePoints[0] || (offset.x > min && offset.x < min + 8 && offset.y > 93 && offset.y < 98))) {
                if (activePoints[0]) {
                  var index = activePoints[0]['_index']
                } else {
                  index = i
                }
                self.selectedMonth = self.months[index]
                self.mode = false
                self.loading = true
                self.Fading()
                self.FetchData('monthChart', { types: self.GetType(), year: self.yearSelector.selected.toString(), month: self.selectedMonth, city: self.MapSelector().province, region: self.MapSelector().region })
                break
              }
            }
          }
        })
      },
      CreateOverallGraph () {
        this.overallGraphs = []
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
              animation: false,
              legend: {
                labels: {
                  defaultFontSize: '14px',
                  fontColor: '#4c4c4c',
                  fontFamily: 'Mitr, sans-serif'
                }
              }
            }
          }
          self.overallGraphs.push(new Chart(document.getElementById(dog.topic), config))
          document.getElementById(dog.topic).onclick = function (event) {
            var activePoints = self.overallGraphs[index].getElementsAtEvent(event)
            if (activePoints[0]) {
              self.dialogVisible = true
              self.mode = true
              self.loading = true
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
        loading: false,
        yearChart: null,
        monthChart: null,
        tabs: 'first',
        types: [['vaccine', 'antiparasite'], ['lost', 'found', 'adopt']],
        selectedType: '',
        selectedTypeIndex: -1,
        selectedMonth: '',
        specificData: {},
        dogsHealth: [],
        dogsFinding: [],
        overallGraphs: []
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

