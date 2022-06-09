<template>
  <div class="user">
    <div class="search"></div>
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'

import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped lang="less"></style>
