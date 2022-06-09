<template>
  <div class="user">
    <div class="search">
      <YxForm v-bind="searchFormConfig" v-model="formData"></YxForm>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YxForm from '@/base-ui/form'
import { searchFormConfig } from './config/serach.config'

export default defineComponent({
  name: 'user',
  components: {
    YxForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { searchFormConfig, formData }
  }
})
</script>

<style scoped lang="less"></style>
