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
            <span v-if="type === 'found'">
              <span class="col-xs-5 no-padding">ชื่อผู้พบ : </span>
              <span class="col-xs-7 no-padding">{{dog.finder.name}}</span>
            </span>
            <span v-if="type === 'missing'">
              <span class="col-xs-5 no-padding">ชื่อเจ้าของ : </span>
              <span class="col-xs-7 no-padding">{{dog.owner.name}}</span>
            </span>
          </div>
          <div class="desc">
            <div v-if="type === 'found'">
              <span class="col-xs-5 no-padding">วันที่พบ : </span>
              <span class="col-xs-7 no-padding">{{DateFormat(dog.date_found)}}</span>
            </div>
            <div v-if="type === 'missing'">
              <span class="col-xs-5 no-padding">วันที่หาย : </span>
              <span class="col-xs-7 no-padding">{{dog.owner.tel}}</span>
            </div>  
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
  props: ['theme', 'type', 'dogs'],
  created () {
    if (this.theme && this.theme.toLowerCase() === 'light') {
      this.cardDetail = 'card-light-detail'
      this.card = 'card'
    } else {
      this.cardDetail = 'card-dark-detail'
      this.card = 'card dark'
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
      border: 3px solid white;
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
    .dark:hover {
      box-shadow: 0 0 28px black;
    }
    .card-detail {
      margin-top: -1px;
      padding: 10px 10px 15px 10px;
      height: 100px; 
      border-left: 1px solid lightgrey;
      border-right: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
    }
    .card-dark-detail {    
      @extend .card-detail; 
      border-left: 1px solid #2D1A14;
      border-right: 1px solid #2D1A14;
      border-bottom: 1px solid #2D1A14;
      color: white;
      background-color: #3F2D27;
      h4 {
        color: white;
      }
    }
    .card-light-detail {    
      @extend .card-detail; 
      border-left: 1px solid #E1C4A5;
      border-right: 1px solid #E1C4A5;
      border-bottom: 1px solid #E1C4A5;
      color: #3F2D27;
      background-color: #e6b05b;
      h4 {
        color: #3F2D27;
      }
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
