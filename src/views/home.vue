<template>
  <div>
    <el-header class='header'>
      <el-row>
        <el-col :span="23">
          <el-menu :default-active="defaultActive"
                   class="el-menu-demo nav_box"
                   mode="horizontal"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-menu-item :index="item.path"
                          v-for="(item,index) in this.routers[0].children"
                          :key="index">
              <router-link :to="item.path">{{ item.name}}</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="1">
          <div class="logout_box"
               @click="logout()">退出</div>
        </el-col>
      </el-row>
    </el-header>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        defaultActive:''
    }
  },
  computed: {
    ...mapState(['routers'])
  },
  methods: {
    logout() {
      this.$store
        .dispatch('Logout')
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  },
  created() {
      let array = this.$route.path.split('/')
      this.defaultActive = array[2]
  }
}
</script>

<style scoped>
.header {
  padding: 0px;
}
.nav_box {
  border-bottom: 0px;
}
.logout_box {
  background-color: #545c64;
  line-height: 60px;
  width: 100%;
  color: #fff;
  cursor: pointer;
}
</style>