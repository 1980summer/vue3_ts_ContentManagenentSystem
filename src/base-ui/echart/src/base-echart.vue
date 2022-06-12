<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

// 使用setup新特性
<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue'

import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const echartsInstance = echarts.init(echartDivRef.value!)

  echartsInstance.setOption(props.options)
})
</script>

<style scoped lang="less"></style>
