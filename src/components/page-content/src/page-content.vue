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
        <el-button type="primary" v-if="isCreate" @click="handleNewClick">
          新建用户
        </el-button>
      </template>

      <!-- 2 列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-link
            type="primary"
            class="edit"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><Edit /></el-icon>
            编辑
          </el-link>
          <el-link
            type="danger"
            class="del"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><Delete /></el-icon>

            删除
          </el-link>
        </div>
      </template>

      <!-- 4 剩余的动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
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
import { usePermission } from '@/hooks/usePermission'

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
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0 获取菜单操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return // 如果没有查询权限， 就return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3 从vuex中获取值
    const dataList = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    ) // 调用函数并传入参数

    const dataCount = computed(() =>
      store.getters[`systemModule/pageListCount`](props.pageName)
    )

    // 4 获取其他的动态插槽名称
    // eslint-disable-next-line prettier/prettier
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // 如果是false就会被过滤出去
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false

        return true // 其他的就return true，就会被命中
      }
    )

    // 5 删除、编辑、新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
