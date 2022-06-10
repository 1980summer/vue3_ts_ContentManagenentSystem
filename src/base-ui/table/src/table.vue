<template>
  <div class="yx-table">
    <el-table :data="listData" border style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 增加一列显示可选按钮 -->
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60">
      </el-table-column>
      <!-- 增加一列显示序号 -->
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="60">
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- 再通过:row传回去 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      defualt: false // 默认不显示
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange'],
  setup(prop, { emit }) {
    const handleSelectionChange = (value: any) => {
      // 点击选中的那条数据的函数处理
      // console.log(value)
      emit('selectionChange', value)
    }

    return {
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less"></style>
