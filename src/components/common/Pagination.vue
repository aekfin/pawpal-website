<template>
  <div id="pagination">
    <!-- <div @click="$emit('close')">Hello</div> -->
    <nav aria-label="..." v-if="display">
      <ul class="pager">
        <li class="pull-left">
          <i v-if="prev" class="material-icons btn btn-page btn-lg" :class="innerClass" @click="GoToPage(pagination.current-1)">&#xE5CB;</i>
          <i v-else class="material-icons btn btn-page btn-lg page-disabled" :class="innerClass">&#xE5CB;</i>
        </li>
        <li class="numbers" v-for="(page, i) in pages" :key="i">
          <div class="btn btn-page-number-active btn-lg" v-if="page === pagination.current">{{page}}</div>
          <div class="btn btn-page-number btn-lg" @click="GoToPage(page)" v-else>{{page}}</div>
        </li>
        <li class="pull-right">
          <i v-if="next" class="material-icons btn btn-page btn-lg" :class="innerClass" @click="GoToPage(pagination.current+1)">&#xE5CC;</i>
          <i v-else class="material-icons btn btn-page btn-lg page-disabled" :class="innerClass">&#xE5CC;</i>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['innerClass', 'pagination'],
  created () {
    this.GoToPage(1)
    if (this.pagination.total === 0) {
      this.display = false
    }
  },
  methods: {
    ProcessingPage () {
      this.pages = []
      var half = parseInt(this.pagination.showPages / 2)
      if (this.pagination.current <= half) {
        for (var i = 1; i <= this.pagination.showPages; i++) {
          if (i <= this.pagination.total && i > 0) {
            this.pages.push(i)
          }
        }
      } else {
        if (this.pagination.current + half >= this.pagination.total) {
          for (i = this.pagination.showPages - 1; i >= 0; i--) {
            if (this.pagination.total - i <= this.pagination.total && this.pagination.total - i > 0) {
              this.pages.push(this.pagination.total - i)
            }
          }
        } else {
          var lower = this.pagination.current - half
          var upper = this.pagination.current + half
          for (i = lower; i <= upper; i++) {
            if (i <= this.pagination.total && i > 0) {
              this.pages.push(i)
            }
          }
        }
      }
      this.$emit('changePage')
    },
    GoToPage (index) {
      if (index > 0 && index <= this.pagination.total) {
        this.pagination.current = index
        this.ProcessingPage()
        if (index === 1) {
          this.prev = false
        } else {
          this.prev = true
        }
        if (index === this.pagination.total) {
          this.next = false
        } else {
          this.next = true
        }
      }
    }
  },
  data () {
    return {
      display: true,
      pages: [],
      prev: false,
      next: false
    }
  }
}
</script>

<style lang="scss">
  #pagination {
    .btn-page {
      color: white;
      background-color: lighten(#49392C, 10%);
      border-radius: 5px;
      padding: 10px 30px;
      margin-right: 5px;
      margin-right: 0px;
      padding: 10px 30px;
      font-weight: bold;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .btn-page-number {
      color: #49392C;
      background-color: white;
      border-radius: 5px;
      padding: 10px 20px;
      margin-right: 5px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .btn-page-number-active {
      @extend .btn-page-number;
      color: white;
      background-color: lighten(#49392C, 10%);
    }
    .btn-page-active {
      @extend .btn-page;
      background-color: darken(#49392C, 5%);
    }
    .btn-page-number:hover {
      color: white;
      background-color: darken(#49392C, 5%);
    }
    .btn-page:hover {
      background-color: darken(#49392C, 5%);
    }
    .border {
      border: 3px solid white;
      border-radius: 5px;
    }
    .sm {
      font-size: 24px !important;
      padding: 10px 30px !important; 
    }
    .numbers {
      .border {
        border: 2px solid white;
      }
    }
    .page-disabled {
      cursor: not-allowed;
      background-color: gray;
    }
    .page-disabled:hover {
      cursor: not-allowed;
      background-color: gray;
    }
  }
</style>
