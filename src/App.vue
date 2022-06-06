<template>
  <div class="app">
    <router-link to="/login">Login</router-link>
    <router-link to="/main">Main</router-link>
    <router-view></router-view>

    <el-button type="primary">hahhahahha</el-button>
    <el-button type="danger">hahhahahha</el-button>
    <div></div>
    <el-tabs class="demo-tabs">
      <el-tab-pane label="User" name="first"
        >User
        <el-icon><Avatar /></el-icon>
      </el-tab-pane>

      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Avatar } from '@element-plus/icons'
export default defineComponent({
  name: 'App',
  components: { Avatar }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
