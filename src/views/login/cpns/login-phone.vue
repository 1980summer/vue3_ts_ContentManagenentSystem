<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="phone.phoneNumber" />
      </el-form-item>

      <el-form-item label="验证码" prop="valiCode">
        <div class="get-code">
          <el-input type="password" v-model="phone.valiCode" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'
export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      valiCode: ''

      /**
       * 手机登录的逻辑： 点击获取验证码按钮就发送网络请求， 服务器返回验证码， 再把手机号和验证码一起发给服务器，
       * 后端就会验证，通过后就登录成功了
       */
    })
    return { phone, rules }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 20px;
}
</style>
