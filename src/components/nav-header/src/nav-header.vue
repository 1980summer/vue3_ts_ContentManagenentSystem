<template>
  <div class="nav-header">
    <el-icon class="fold-menu"
      ><component :is="isFold ? 'Fold' : 'Expand'" @click="handleFoldClick"></component
    ></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons'

export default defineComponent({
  components: {
    Fold,
    Expand
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
