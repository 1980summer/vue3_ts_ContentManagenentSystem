<template>
  <div class="login-panel">
    <div class="title">
      <h1>后台管理系统</h1>
      <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </span>
          </template>

          <LoginAccount ref="accountRef"></LoginAccount>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>

          <LoginPhone ref="phoneRef"></LoginPhone>
        </el-tab-pane>
      </el-tabs>

      <div class="account-control">
        <el-checkbox v-model="isKeepPassword" class="remember">记住密码</el-checkbox>
        <el-link type="primary" class="forget">忘记密码</el-link>
      </div>

      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    UserFilled,
    Iphone,

    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1 定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>() // 绑定给LoginAccount组件，用来获取LoginAccount这个组件里的大对象. ref的类型是LoginAccount
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('phone')

    // 2 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value) // 调用LoginAccount组件的loginAction方法
      } else {
        console.log('phoneRef调用对应的组件方法')
      }
    }
    return { isKeepPassword, handleLoginClick, accountRef, phoneRef, currentTab }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 400px;
  margin-bottom: 253px;
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
// ===============
.account-control {
  display: flex;
  justify-content: space-between;
  .forget,
  .remember {
    color: rgb(71, 91, 224);
    // font-size: 16px;
    // font-weight: bold;
  }
}
.login-btn {
  width: 100%;
  height: 45px;
  margin-top: 10px;
}
</style>
