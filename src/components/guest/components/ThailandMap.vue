<template>
  <div id="thailand-map" class="white-card">
      <select id="region-selector" v-model="selectedRegion" @change="ShowMarkers()">
        <option value="all">ภูมิภาคทั้งหมด</option>
        <option value="northern">ภาคเหนือ</option>
        <option value="northeastern">ภาคตะวันออกเฉียงเหนือ</option>
        <option value="central">ภาคกลาง</option>
        <option value="southern">ภาคใต้</option>
      </select>
      <select id="province-selector" style="top: 8%" v-model="selectedProvince">
        <option v-for="(sp, i) in showProvinces" :key="sp.th" :value="sp.th">{{sp.th}}</option>
      </select>
      <div id="map">
        <div v-for="(province, i) in provinces" :key="province.x">
          <div class="marker-label" :id="'label-' + i" :style="'top:' + province.y + '%;left:' + province.x + '%;'">{{province.th}}</div>
          <div class="marker" :id="'marker-' + i" :style="'top:' + province.y + '%;left:' + province.x + '%;'" @mouseover="ShowLabel(i)" @mouseout="HideLabel(i)"></div>
        </div>
      </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    mounted () {
      this.AddMarkers()
      this.selectedRegion = 'all'
      this.ShowMarkers()
    },
    props: ['provinces', 'region', 'selectedRegion'],
    data () {
      return {
        selectedProvince: null,
        showProvinces: []
      }
    },
    methods: {
      AddMarkers () {
        for (var i = 0; i < this.provinces.length; i++) {
          $('#label-' + i).css('top', $('#marker-' + i).position().top - 32)
          $('#label-' + i).css('left', $('#marker-' + i).position().left - (($('#label-' + i).width() + 16) / 2) + 'px')
        }
      },
      HideLabel (index) {
        $('#label-' + index).css('display', 'none')
      },
      ShowLabel (index) {
        $('#label-' + index).css('display', 'block')
      },
      ShowMarkers () {
        for (var i = 0; i < this.provinces.length; i++) {
          $('#marker-' + i).css('opacity', 0)
        }
        var provincesByRegion = []
        switch (this.selectedRegion) {
          case 'all':
            for (i = 0; i < this.provinces.length; i++) {
              provincesByRegion.push(i)
            }
            break
          case 'northern':
            provincesByRegion = this.region.northern
            break
          case 'northeastern':
            provincesByRegion = this.region.northeastern
            break
          case 'central':
            provincesByRegion = this.region.central
            break
          case 'southern':
            provincesByRegion = this.region.southern
            break
        }
        this.showProvinces = [ { th: 'จังหวัดทั้งหมด' } ]
        this.selectedProvince = this.showProvinces[0].th
        for (i = 0; i < provincesByRegion.length; i++) {
          $('#marker-' + provincesByRegion[i]).css('opacity', 1.0)
          this.showProvinces.push(this.provinces[provincesByRegion[i]])
        }
      }
    }
  }
</script>

<style lang="scss">
  $sizeReduce: 60px;
  $map-width: 677px * $sizeReduce / 100px;
  $map-height: 1256px * $sizeReduce / 100px;
  $marker-size: (12px * $sizeReduce / 100px);
  $marker-zoom-size: (17px * $sizeReduce / 100px);
  $border-size: 3px * $sizeReduce / 100px;
  $form-theme-color: #49392C;

  #thailand-map {
    #map {
      width: $map-width;
      height: $map-height;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      background-image: url('https://i.imgur.com/bpUKqMq.png');
      background-size: contain;
    }

    .marker {
      width: $marker-size;
      height: $marker-size;
      border-radius: 50%;
      border: $border-size solid #333;
      transition-duration: 0.5s;
      background-color: transparent;
      opacity: 0;
      position: absolute;
    }

    .marker:hover {
      width: $marker-zoom-size;
      height: $marker-zoom-size;
      border: $border-size solid #333;
      background-color: white;
    }

    .marker-label {
      border-radius: 5px;
      color: white;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 5px 15px;
      display: none;
      z-index: 10;
      animation: walking 1s 0s;
      position: absolute;
    }

    @keyframes walking {
      0% {
        opacity: 0;
      }
      30% {
        opacity: 0;
      }
      80% {
        opacity: 1.0;
      }
    }
    select {
      font-size: 20px;
      border-radius: 5px;
      padding-left: 10px;
      height: 35px;
      width: 40%;
      z-index: 10;
      color: lighten($form-theme-color, 10%);
      border: 1px solid lighten($form-theme-color, 20%);
      text-align: center;
      position: absolute;      
    }
    select:focus {
      outline: none;
      border: 1px solid $form-theme-color;
      box-shadow: 0 0 5px lighten($form-theme-color, 20%);
    }
    #region-selector {
      left: 55%;
    }
    #province-selector {
      top: 8%;
      left: 55%;
    }
  }
</style>