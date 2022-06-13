<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

// 使用setup新特性
<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import { EChartsOption } from 'echarts'

import useEchart from '../hooks/useEchart'

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
  const { setOptions } = useEchart(echartDivRef.value!)

  // 当options发生改变时
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
