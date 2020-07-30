<template>
  <div class="main-panel">
    <el-form class="form"  label-position="right" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="model.name"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.pwd"
                  type="password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary"
                   @click="loginClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      model: {
        pwd: 123456
      }
    }
  },
  computed: {
    ...mapState(['roles'])
  },
  methods: {
    loginClick() {
      this.getRoles(this.model).then(() => {
          if(this.roles){
              this.$router.push({ path: '/home/red' })
          }
      })
    },
    ...mapActions(['getRoles'])
  },
  created() {
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which
      if (keycode == 13) {
        this.loginClick() // 登录方法名
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.main-panel {
  width: 280px;
    position: fixed;
    left: 39%;
    top: 200px;
    border: 1px solid skyblue;
    border-radius: 15px;
    padding: 38px 60px 5px 25px;
    text-align: center;
}
</style>