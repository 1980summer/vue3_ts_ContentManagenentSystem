<template>
  <div class="user">
    <div class="search"></div>
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'

import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    return { searchFormConfig }
  }
})
</script>

<style scoped lang="less"></style>
