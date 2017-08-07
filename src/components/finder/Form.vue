<template>
  <div class="form">
    <div class="input-group" v-for="(input, i) in inputs" :key="input.name" style="width: 100%; padding-bottom: 10px">
      <div class="input-group-addon input-lg" style="width: 120px">{{input.name}}</div>
      <input type="tel" class="form-control input-lg" :placeholder="input.placeholder" v-model="input.model" v-if="input.type==='tel'">
      <select class="form-control input-lg" v-else-if="input.type==='selector'" v-model="input.model">
        <option v-for="(option,i) in input.options" :key="option" :value="option">{{option}}</option>
      </select> 
      <input type="text" class="form-control input-lg" :placeholder="input.placeholder" v-model="input.model" v-else>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  props: ['form'],
  components: {
    Datepicker
  },
  data () {
    return {
      inputs: this.form
    }
  }
}
</script>

<style lang='scss'>
  .form {
    padding-top: 5px;
  }
  .width-100 {
    width: 100%;
  }
  .date-input {
    display: block;
    width: 100%;
    font-size: 18px;
    height: 48px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
</style>
