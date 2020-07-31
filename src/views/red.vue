<template>
  <div class="panel">
    <div style="height:150vh;">是是是</div>
    <h1 style="height:180px">
      <span ref='countup'
            class="text"></span>
    </h1>
  </div>
</template>

<script>
import { CountUp } from 'countup.js'
export default {
  data() {
    return {
      options: {
        startVal: 0
      },
      ofH:0,
      endCount: 2019
    }
  },
  computed: {
    offsetFlag() {
      return this.ofH
    }
  },
  mounted() {
    window.addEventListener('scroll', this.aaa, true)
  },
  methods: {
    aaa() {
      console.log(this.offsetFlag)
      this.ofH = window.pageYOffset
      if (window.pageYOffset > 669) {
        this.initCountUp()
      }
    },
    initCountUp() {
      let demo = new CountUp(this.$refs.countup, this.endCount, this.options)
      if (!demo.error) {
        demo.start()
      } else {
        console.error(demo.error)
      }
    }
  }
}
</script>

<style scoped>
.panel {
  height: 50vh;
  font-size: 30px;
  line-height: 100px;
  text-align: center;
}
</style>