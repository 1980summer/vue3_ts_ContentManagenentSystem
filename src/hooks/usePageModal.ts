import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = () => void // 是一个函数类型

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {} // 新建就不需要输入框里有内容，给个空对象
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    newCb && newCb() // 意思是当newCb有值的时候就调用
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item } // 编辑就需要回显数据，所以要赋值
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCb && editCb() // 意思是当editCb有值的时候就调用
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}

//
