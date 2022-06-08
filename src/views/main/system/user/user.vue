<template>
  <div class="user">
    <div class="search">
      <YxForm v-bind="searchFormConfig"></YxForm>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YxForm from '@/base-ui/form'
import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    YxForm
  },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped lang="less"></style>
