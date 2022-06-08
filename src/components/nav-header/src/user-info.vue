<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span>{{ name }}</span>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><Close /></el-icon>
            退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>
            <el-icon><Document /></el-icon>
            用户信息</el-dropdown-item
          >
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { Close, Document, Setting } from '@element-plus/icons'

export default defineComponent({
  components: {
    Close,
    Document,
    Setting
  },
  setup() {
    const store = useStore()
    const name = computed(() => store.state.loginModule.userInfo.name)
    return { name }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
