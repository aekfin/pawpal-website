<template>
  <div class="dog-list">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(dog, i) in dogs" :key="i">
      <div :class="card" data-toggle="modal" data-target="#detail_modal" @click="selected_dog = dog">
        <img :src="dog.img" class="img-dog">
        <div :class="cardDetail">
          <h4 class="text-center">{{dog.breed}}</h4>
          <div class="desc">
            <span class="col-xs-5 no-padding">
              สีผิว :
            </span>
            <span class="col-xs-7 no-padding">
              {{dog.color_primary}}<span v-if="dog.color_secondary">, {{dog.color_secondary}}</span>
            </span>
          </div>
          <div class="desc">
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
            <span class="col-xs-5 no-padding">เบอร์ติดต่อ : </span>
            <span class="col-xs-7 no-padding" v-if="type === 'found'">{{dog.finder.tel}}</span>
            <span class="col-xs-7 no-padding" v-if="type === 'missing'">{{dog.owner.tel}}</span>  
          </div>
        </div>
      </div>
    </div>
    <dog-modal :dog="selected_dog" :type="type"></dog-modal>
  </div>
</template>

<script>
import DogModal from '@/components/guest/components/DogModal.vue'

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
    console.log(this.type)
  },
  components: {
    DogModal
  },
  methods: {
    handleClose (done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  data () {
    return {
      card: 'card',
      cardDetail: 'card-detail',
      selected_dog: this.dogs[0],
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
  h4 {
    margin-top: 0px; 
    margin-bottom: 5px; 
  }
  .card {
    margin-bottom: 30px;
    border-radius: 5px;
    cursor: pointer;
  }
  .card:hover {
    box-shadow: 0 0 28px white;
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
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .card-dark-detail {    
    @extend .card-detail; 
    border-left: 1px solid #2D1A14;
    border-right: 1px solid #2D1A14;
    border-bottom: 1px solid #2D1A14;
    color: white;
    background-color: #3F2D27;
  }
  .card-light-detail {    
    @extend .card-detail; 
    border-left: 1px solid #E1C4A5;
    border-right: 1px solid #E1C4A5;
    border-bottom: 1px solid #E1C4A5;
    color: #3F2D27;
    background-color: #E1C4A5;
  }
  .img-dog {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    height: 250px;
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
</style>
