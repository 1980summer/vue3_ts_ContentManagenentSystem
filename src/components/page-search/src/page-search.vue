<template>
  <div class="page-search">
    <YxForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button>
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </YxForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YxForm from '@/base-ui/form'
import { Refresh, Search } from '@element-plus/icons'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    Refresh,
    Search,

    YxForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  }
})
</script>

<style scoped lang="less">
.header {
  font-size: 18px;
  // text-align: left;
}
.handle-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
