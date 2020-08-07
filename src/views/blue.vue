<template>
  <div class="panel">
    <el-input v-model="input"
              placeholder="请输入内容"></el-input>
    <p>{{infos}}</p>
    <el-button type="primary" @click="checkSocialCreditCode(input)">校验</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      infos: ''
    }
  },
  methods: {
    //检查是否有效社会代码
    checkSocialCreditCode(Code) {
      var patrn = /^[0-9A-Z]+$/
      //18位校验及大写校验
      if (Code.length != 18 || patrn.test(Code) == false) {
        console.info('不是有效的统一社会信用编码！')
        this.infos = '不是有效的统一社会信用编码！'
      } else {
        var Ancode //统一社会信用代码的每一个值
        var Ancodevalue //统一社会信用代码每一个值的权重
        var total = 0
        var weightedfactors = [
          1,
          3,
          9,
          27,
          19,
          26,
          16,
          17,
          20,
          29,
          25,
          13,
          8,
          24,
          10,
          30,
          28
        ] //加权因子
        var str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
        //不用I、O、S、V、Z
        for (var i = 0; i < Code.length - 1; i++) {
          Ancode = Code.substring(i, i + 1)
          Ancodevalue = str.indexOf(Ancode)
          total = total + Ancodevalue * weightedfactors[i]
          //权重与加权因子相乘之和
        }
        var logiccheckcode = 31 - (total % 31)
        if (logiccheckcode == 31) {
          logiccheckcode = 0
        }
        var Str =
          '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
        var Array_Str = Str.split(',')
        logiccheckcode = Array_Str[logiccheckcode]

        var checkcode = Code.substring(17, 18)
        if (logiccheckcode != checkcode) {
          console.info('不是有效的统一社会信用编码！')
          this.infos = '不是有效的统一社会信用编码！'
        } else {
          console.info('yes')
          this.infos = '有效的统一社会信用编码！'
        }
      }
    }
  }
}
</script>

<style scoped>
.panel {
  width: 100vw;
  height: 50vh;
  background: blue;
  color: rgb(255, 255, 255);
  font-size: 30px;
  line-height: 100px;
  text-align: center;
}
</style>