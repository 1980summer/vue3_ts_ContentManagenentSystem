<template>
  <div class="user">
    <div class="search"></div>
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>

    <div class="content">
      <YxTable
        :listData="useList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        :title="title"
      >
        <!-- 1 header中的插槽 -->
        <template #headerHandler>
          <el-button type="primary">新建用户</el-button>
        </template>

        <!-- 2 列中的插槽 -->
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

        <template #handler>
          <div class="handle-btns">
            <el-link type="primary" class="edit">
              <el-icon><Edit /></el-icon>
              编辑
            </el-link>
            <el-link type="danger" class="del">
              <el-icon><Delete /></el-icon>

              删除
            </el-link>
          </div>
        </template>

        <!-- 3 footer中的插槽 -->
        <template #footer> </template>
      </YxTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import YxTable from '@/base-ui/table'
import { Edit, Delete } from '@element-plus/icons'

import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    Edit,
    Delete,

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
      { prop: 'cellphone', label: '手机号码', minWidth: '150' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]

    const showIndexColumn = true // 是否显示序号
    const showSelectColumn = true // 是否显示可选按钮

    const title = '用户列表'

    return { searchFormConfig, useList, propList, showIndexColumn, showSelectColumn, title }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 40px;
  border-top: solid 1px #f5f5f5;
  .handle-btns {
    .edit {
      margin-right: 12px;
    }
  }
}
</style>
