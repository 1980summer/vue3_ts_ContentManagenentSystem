<template>
  <div class="login-account">
    <!-- label-width="60px"是账号和密码这两个字段的宽度 -->
    <!-- model属性可以拿到最新的值 -->
    <!-- rules之前加冒号，意思是“接收” -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const account = reactive({
      username: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正的登录逻辑')
        }
      })
    }
    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped lang="less"></style>
