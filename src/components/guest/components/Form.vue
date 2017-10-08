<template>
  <div id="form">
    <div class="input-group" v-for="(input, i) in inputs" :key="input.name" style="width: 100%; padding-bottom: 10px">
      <div class="input-group-addon input-lg" style="width: 125px">{{input.name}}<span v-if="input.require">*</span></div>
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
  $form-theme-color: #49392C;
  
  #form {
    padding-top: 5px;
    .width-100 {
      width: 100%;
    }
    .input-group-addon {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    .form-control {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .date-input:hover, .date-input:active, .date-input:focus {
      border: 1px solid black;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 74, 64, 0.6);
    }
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
    border: 1px solid $form-theme-color;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
</style>
