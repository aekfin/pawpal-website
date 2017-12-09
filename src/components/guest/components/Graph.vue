<template>
  <div id="graph">
    <div class="col-xs-12 col-sm-12 col-md-4" v-for="(dog, i) in dogs" :key="i">
      <canvas :id="dog.topic" width="100" height="100"></canvas>
    </div>    
  </div>
</template>

<script>
  import Chart from 'chart.js'
  export default {
    props: ['dogs'],
    mounted () {
      var chart = []
      this.dogs.forEach(function (dog) {
        var config = {
          type: 'doughnut',
          data: {
            labels: [dog.contents[1].name, dog.contents[2].name],
            datasets: [{
              label: '# of Dogs',
              data: [dog.contents[1].amount, dog.contents[2].amount],
              backgroundColor: [
                'rgba(124,104,61, 0.8)',
                'rgba(51,39,30, 0.8)'
              ],
              borderColor: [
                'rgba(124,104,61, 1)',
                'rgba(51,39,30, 1)'
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
      })
      console.log(chart)
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang='scss'>
  #graph {

  }
</style>

