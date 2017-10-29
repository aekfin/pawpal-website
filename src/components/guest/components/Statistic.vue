<template>
  <div id="statistics">
    <div class="white-card col-xs-12">
      <h2>{{GetRegion()}}</h2>
      <h4>{{selectedProvince}}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['selectedRegion', 'selectedProvince'],
    methods: {
      GetRegion () {
        switch (this.selectedRegion) {
          case 'all':
            return 'ภูมิภาคทั้งหมด'
          case 'northern':
            return 'ภาคเหนือ'
          case 'northeastern':
            return 'ภาคตะวันออกเฉียงเหนือ'
          case 'central':
            return 'ภาคกลาง'
          case 'southern':
            return 'ภาคใต้'
        }
      }
    }
  }
</script>

<style lang="scss">
  #statistics {
    h2 {
      margin-top: 10px;
    }
  }
</style>