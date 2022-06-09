<template>
  <div class="user">
    <div class="search"></div>
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>

    <div class="content">
      <YxTable :listData="useList" :propList="propList">
        <template #status="scope">
          <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>

        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>

        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
      </YxTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import YxTable from '@/base-ui/table'

import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    YxTable
  },
  setup() {
    const store = useStore()

    // 发送请求
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const useList = computed(() => store.state.systemModule.userList)
    const userCount = computed(() => store.state.systemModule.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' }
    ]

    return { searchFormConfig, useList, propList }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 40px;
  border-top: solid 1px #f5f5f5;
}
</style>
