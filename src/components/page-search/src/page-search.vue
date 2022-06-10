<template>
  <div class="page-search">
    <YxForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定的
    // 1 优化一 formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = '' // 默认值是一个空串
    }

    const formData = ref(formOriginData)

    // 2 优化二： 当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3 优化三： 当用户点击搜索
    const handleQueryClick = () => {
      console.log('dianjilesousuo')
      emit('queryBtnClick', formData.value)
    }

    return { formData, handleResetClick, handleQueryClick }
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
