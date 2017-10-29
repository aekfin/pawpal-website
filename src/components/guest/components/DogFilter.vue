<template>
  <div id="dog-filter">
    <div class="white-card card-sm col-xs-12">
      <div class="col-xs-12 col-sm-12 col-md-4" v-for="(filter, i) in filters" :key="i">
        <div class="input-group"> 
          <div class="input-group-addon input-lg" style="width: 120px">{{filter.name}}</div>
          <select class="form-control input-lg" v-model="filter.model" @change="FilterChanging()">
            <option :value="null" disabled>-- โปรดเลือก{{filter.name}} --</option>
            <option v-for="(option, i) in filter.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filters'],
  methods: {
    FilterChanging () {
      this.$emit('filtering')
    }
  }
}
</script>

<style lang="scss">
  #dog-filter {
    .white-card {
      margin-top: 15px;
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
