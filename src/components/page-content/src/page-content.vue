<template>
  <div class="page-content">
    <YxTable
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
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
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
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

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 如果没有参数就默认给个空对象
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取值
    const dataList = computed(() => store.getters[`systemModule/pageListData`](props.pageName)) // 调用函数并传入参数

    const dataCount = computed(() => store.getters[`systemModule/pageListCount`](props.pageName))

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo
    }
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
