<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <Yxform v-bind="modalConfig" v-model="formData"></Yxform>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleComfirmClick"
            >确 认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Yxform from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({}) // 默认为一个空对象
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    Yxform
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮逻辑
    const store = useStore()
    const handleComfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 如果有值，则点的是编辑弹出的的确定按钮
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 点击的是新建弹出的的确定按钮
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleComfirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
