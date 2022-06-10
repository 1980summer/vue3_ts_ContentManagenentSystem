<template>
  <div class="page-content">
    <YxTable :listData="dataList" v-bind="contentTableConfig">
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
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import YxTable from '@/base-ui/table'
import { Edit, Delete } from '@element-plus/icons'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    Edit,
    Delete,

    YxTable
  },
  setup(props) {
    const store = useStore()

    // 发送请求
    store.dispatch('systemModule/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() => store.getters[`systemModule/pageListData`](props.pageName)) // 调用函数并传入参数
    // const userCount = computed(() => store.state.systemModule.userCount)

    return { dataList }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 40px;
  border-top: solid 1px #f5f5f5;
  .handle-btns {
    .edit {
      margin-right: 12px;
    }
  }
}
</style>
