<template>
  <div id="dog-filter">
    <div class="white-card card-sm col-xs-12">
      <div class="col-xs-12 col-sm-12 col-md-4" v-for="(filter, i) in filters" :key="i">
        <div class="input-group"> 
          <div class="input-group-addon input-lg" style="width: 120px">{{filter.name}}</div>
          <select class="form-control input-lg" v-model="filter.model">
            <option value="null" :value="'-- โปรดเลือก' + filter.name + '--'" disabled>-- โปรดเลือก{{filter.name}} --</option>
            <option v-for="(option, i) in filter.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    for (var i = 0; i < this.filters.length; i++) {
      var param = ''
      switch (i) {
        case 0:
          param = this.$route.params.breed
          break
        case 1:
          param = this.$route.params.color
          break
        case 2:
          param = this.$route.params.date
          break
      }
      if (param !== undefined && this.filters[i].options.indexOf(param) > -1) {
        for (var j = 0; j < this.filters[i].options.length; j++) {
          if (param === this.filters[i].options[j]) {
            this.filters[i].model = this.filters[i].options[j]
            break
          }
        }
      } else {
        this.filters[i].model = '-- โปรดเลือก' + this.filters[i].name + '--'
      }
    }
  },
  props: ['filters'],
  methods: {
  }
}
</script>

<style lang="scss">
  #dog-filter {
    .white-card {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .card-sm {
      padding: 30px;
      border-radius: 4px;
    }
    .input-group {
      margin-right: auto;
      margin-left: auto;
      overflow: hidden;
      min-width: 80%;
      margin-bottom: 5px;
      select {
        min-width: 100%;
      }
    }
    .form-control {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
  }
</style>
