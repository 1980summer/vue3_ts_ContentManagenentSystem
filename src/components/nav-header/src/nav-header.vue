<template>
  <div class="nav-header">
    <el-icon class="fold-menu"
      ><component
        :is="isFold ? 'Fold' : 'Expand'"
        @click="handleFoldClick"
      ></component
    ></el-icon>
    <div class="content">
      <div class="div">
        <YxBreadcrumb :breadcrumbs="breadcrumbs"></YxBreadcrumb>
      </div>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'
import UserInfo from './user-info.vue'
import YxBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapToBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    Fold,
    Expand,

    UserInfo,
    YxBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据： [{name:, path:}]
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const route = useRoute()
      const currrentPath = route.path
      return pathMapToBreadcrumbs(userMenus, currrentPath)
    })

    return { isFold, handleFoldClick, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
