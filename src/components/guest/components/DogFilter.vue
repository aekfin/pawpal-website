<template>
  <div id="dog-filter">
    <div class="white-card card-sm col-xs-12">
      <div class="col-xs-12 col-sm-4" v-for="(filter, i) in filters" :key="i">
        <div class="input-group"> 
          <div class="input-group-addon input-lg" style="width: 120px">{{filter.name}}</div>
          <select class="form-control input-lg">
            <option v-for="(option,i) in filter.options" :key="option" :value="option">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filters']
}
</script>

<style lang="scss">
  #dog-filter {
    .white-card {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .card-sm {
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 4px;
    }
    .input-group {
      margin-right: auto;
      margin-left: auto;
      overflow: hidden;
      select {
        min-width: 100%;
      }
    }
    .form-control {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
  }
</style>
