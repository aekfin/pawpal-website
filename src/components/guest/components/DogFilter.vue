<template>
  <div id="dog-filter">
    <div class="card-sm col-xs-12">
      <div class="filter col-sm-12 col-md-6 col-lg-4" v-for="(filter, i) in filters" :key="i">
        <div class="col-xs-4 filter-label no-padding">{{filter.name}}</div>
        <div class="col-xs-8 no-padding">
          <select class="form-control input-lg" v-model="filter.model" @change="FilterChanging()">
            <option v-for="(option, i) in filter.options" :key="option" :value="option">
              <span v-if="option.length < 25">{{option}}</span>
              <span v-else>{{option.substring(0, 22) + '...'}}</span>
            </option>
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
      margin-top: 0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .card-sm {
      padding: 0px;
      text-align: center;
    }
    .filter {
      margin: 0px;
      margin-top: 5px;
      border: 0px solid white;
    }
    .filter-label {
      background-color: #49392C;
      color: white;
      height: 47px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      padding: 10px 16px;
      font-size: 18px;
    }
    .form-control {
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
    }
    select {
      padding: 0px 16px;
      border: none;
      border-radius: 0px;
      outline: none;
      border: 1px solid lighten(#49392C, 20%);
    }
    select:focus {
      border: 1px solid #49392C;
      box-shadow: 0 0 7px lighten(#49392C, 20%);
    }
    .input-group-addon {
      width: 120px;
    }
    .input-group {
      margin-right: auto;
      margin-left: auto;
      overflow: hidden;
      min-width: 80%;
      margin-bottom: 5px;
      select {
        width: 100%;
      }
    }
  }
</style>
