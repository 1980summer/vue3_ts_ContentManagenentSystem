<template>
  <div class="login-panel">
    <div class="title">
      <h1>后台管理系统</h1>
      <el-tabs type="border-card" class="demo-tabs" stretch>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          账号
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          手机
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons'
// import calendar from 'element-plus/es/components/calendar'
export default defineComponent({
  components: {
    UserFilled,
    Iphone
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 400px;
  .title {
    text-align: center;
  }
}
// 直接复制element-plus官网的样式
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
