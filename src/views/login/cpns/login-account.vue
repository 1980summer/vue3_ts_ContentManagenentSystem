<template>
  <div class="login-account">
    <!-- label-width="60px"是账号和密码这两个字段的宽度 -->
    <!-- model属性可以拿到最新的值 -->
    <!-- rules之前加冒号，意思是“接收” -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import LocalCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: LocalCache.getItem('name') ?? '',
      password: LocalCache.getItem('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // ElForm里面有一个validate属性，是个布尔值
        if (valid) {
          // 1 判断是否勾选了记住密码，如果是就保存账号密码，否则就不保存
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteItem('name')
            LocalCache.deleteItem('password')
          }
          // 2 开始进行登录验证
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }
    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped lang="less"></style>
