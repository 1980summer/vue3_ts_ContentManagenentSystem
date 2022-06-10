<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent :contentTableConfig="contentTableConfig" pageName="role"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content-config'
import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped></style>
