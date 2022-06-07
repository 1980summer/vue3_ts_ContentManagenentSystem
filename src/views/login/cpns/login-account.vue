<template>
  <div class="login-account">
    <!-- label-width="60px"是账号和密码这两个字段的宽度 -->
    <!-- model属性可以拿到最新的值 -->
    <!-- rules之前加冒号，意思是“接收” -->
    <el-form label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary">Submit</el-button>
        <el-button>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const account = reactive({
      username: '',
      password: ''
    })

    // 编写好规则,这个格式遵循 async-validator ，来自element-plus官网
    const rules = {
      username: [
        {
          required: true,
          message: '用户名是必传内容',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10个字母或数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必传内容',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码必须是3位以上字母或数字',
          trigger: 'blur'
        }
      ]
    }
    return { account, rules }
  }
})
</script>

<style scoped lang="less"></style>
