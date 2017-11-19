<template>
  <div id="dog-list">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(dog, i) in dogs" :key="i">
      <div :class="card" data-toggle="modal" data-target="#detail_modal" @click="ClickDog(dog)" v-if="dog && dog.img[0]">
        <img :src="dog.img[0].image" class="img-dog" @error="ImageError(dog.img[0])" :key="dog.img[0].image">
        <div :class="cardDetail">
          <h4 class="text-center">{{dog.breed}}</h4>
          <div class="desc">
            <span class="col-xs-5 no-padding">
              สีขน :
            </span>
            <span class="col-xs-7 no-padding">
              {{dog.color_primary}}<span v-if="dog.color_secondary">, {{dog.color_secondary}}</span>
            </span>
          </div>
          <div class="desc" v-if="dog.finder">
            <span class="col-xs-5 no-padding">ชื่อผู้พบ : </span>
            <span class="col-xs-7 no-padding">{{dog.finder.name}}</span>
          </div>
          <div class="desc">
            <span class="col-xs-5 no-padding">วันที่พบ : </span>
            <span class="col-xs-7 no-padding">{{DateFormat(dog.date_found)}}</span>  
          </div>
        </div>
      </div>
    </div>
    <dog-modal :dog="selected_dog" :type="type"></dog-modal>
  </div>
</template>

<script>
import DogModal from './DogModal.vue'

export default {
  props: ['type', 'dogs'],
  created () {
    if (this.type) {
      this.card = 'card'
      switch (this.type.toLowerCase()) {
        case 'found':
          this.cardDetail = 'card-lighter-detail'
          break
        case 'adopt':
          this.cardDetail = 'card-light-detail'
          break
        case 'missing':
          this.cardDetail = 'card-dark-detail'
          break
      }
    }
    var elements = document.getElementsByClassName('img-dog')
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.height = elements[i].offsetWidth + 'px'
    }
  },
  components: {
    DogModal
  },
  methods: {
    DateFormat (date) {
      date = new Date(date)
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    },
    ClickDog (dog) {
      this.selected_dog = dog
    },
    ImageError (image) {
      image.image = require('@/assets/finder/dog-upload.png')
    }
  },
  data () {
    return {
      card: 'card',
      cardDetail: 'card-detail',
      selected_dog: null,
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
  #dog-list {
    h4 {
      margin-top: 0px; 
      margin-bottom: 5px; 
    }
    .card {
      margin: 10px 0px;
      border-radius: 3px;
      border: 4px solid white;
      transition-duration: 0.3s;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      cursor: pointer;
    }
    .card:hover {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      img {
        transition-duration: 0.5s;
        filter: brightness(125%)
      }
    }
    .card-detail {
      margin-top: -1px;
      padding: 10px 10px 15px 10px;
      height: 100px;
    }
    .card-dark-detail {    
      @extend .card-detail;
      color: white;
      background-color: #3F2D27;
      h4 {
        color: white;
      }
    }
    .card-light-detail {    
      @extend .card-detail; 
      color: #3F2D27;
      background-color: #e6b05b;
      h4 {
        color: #3F2D27;
      }
    }
    .card-lighter-detail {
      @extend .card-light-detail; 
      background-color: lighten(#e6b05b, 10%);
    }
    .img-dog {
      width: 100%;
    }
    .bright {
      transition-duration: 0.5s;
      filter: brightness(125%);
    }
    .desc {
      font-size: 13px;
      margin-left: 5%;
      overflow: hidden;
      max-height: 20px;
    }
    .no-padding {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
</style>
