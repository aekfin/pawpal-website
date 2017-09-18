<template>
  <div id="view-table">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-center" 
              :style="(i === tableHeader.length-1) ? 'border-bottom: 3px solid #447A5C;' : 'border-bottom: 3px solid #447A5C; border-right: 1px solid #447A5C;' " 
              v-for="(th, i) in tableHeader" :key="i">
            <span class="th-header">{{th.th}}</span><br><span class="en-header">{{th.en}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vl, i) in vaccineRecord" :key="i">
          <td class="text-center" style="width: 25%;" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
            <div v-if="vl.vaccinefor" data-toggle="tooltip" data-placement="left" :title="vl.vaccinefor.note+' ('+vl.vaccinefor.name+')'">
              <div class="th-tr-body">{{vl.vaccinefor.note}}</div>
              <div class="en-tr-body">({{vl.vaccinefor.name}})</div>
            </div>
          </td>
          <td  class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
            <span class="th-tr-body">{{DateFormat(vl.date_record)}}</span>
          </td>
          <td  class="text-center" style="width: 15%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
            <span class="th-tr-body">{{DateFormat(vl.next_vaccine)}}</span>
          </td>
          <td  class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-right-border' : 'right-border'">
            <span class="th-tr-body">{{vl.license}}</span>
          </td>
          <td class="text-center" style="width: 20%" :class="(i !== vaccineRecord.length-1) ? 'bottom-border' : ''">
            <div v-if="vl.vaccine_stock_list">
              <img v-for = "(dose, j) in vl.vaccine_stock_list" :key="j" :src="dose.image" data-toggle="tooltip" data-placement="top" :title = "GetDosesTooltip(dose)" class="img-vaccine-sm">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: ['tableHeader', 'vaccineRecord'],
  created () {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  methods: {
    DateFormat (date) {
      date = new Date(date)
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    GetDosesTooltip (vrf) {
      $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      return 'บริษัทผู้ผลิต: ' + vrf.brand + ', ชื่อวัคซีน: ' + vrf.name + ', รหัสวัคซีน: ' + vrf.serial + ', วันผลิต: ' + vrf.mfg + ', วันหมดอายุ: ' + vrf.exp
    }
  }
}
</script>

<style lang="scss">
  #view-table {
    $table-color: #447A5C;
    $pagination-color: darken($table-color, 10%);
    $hover-color: lighten($table-color, 40%);
    min-height: 250px;

    tbody {
      cursor: pointer;
      tr {
        td {
          font-size: 14px;
          vertical-align: middle;
        }
      }
      tr:hover{
        background-color: $hover-color;
      }
    }
    .th-tr-body {
      font-family: "Mitr", sans-serif;
      font-weight: 400;
      font-size: 14px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .en-tr-body {
      color: grey;
      font-weight: 400;
      font-size: 14px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right-border {
      border-right: 1px solid $table-color;
    }
    .bottom-border {
      border-bottom: 1px solid $table-color;
    }
    .bottom-right-border {
      border-bottom: 1px solid $table-color;
      border-right: 1px solid $table-color;
    }
    .img-vaccine-sm {
      display: inline-block;
      border-radius: 6px;
      width: 60px;
      height: 40px;
      margin-right: 5px;
    }
    .img-vaccine-sm:hover {
      filter: brightness(150%);
    }
  }
</style>
