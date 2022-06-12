<template>
  <div class="dashboard">
    <!-- :gutter="10" 的意思是el-rol的间距为10px -->
    <el-row :gutter="10">
      <el-col :span="7">
        <HyCard title="分类商品数量（饼图）"></HyCard>
      </el-col>
      <el-col :span="10">
        <HyCard title="不同城市商品销量"></HyCard>
      </el-col>
      <el-col :span="7">
        <HyCard title="分类商品数量(玫瑰图)"></HyCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <HyCard title="分类商品的销量">
          <BaseEchart :options="options"></BaseEchart>
        </HyCard>
      </el-col>
      <el-col :span="12">
        <HyCard title="分类商品的收藏"></HyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import HyCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    BaseEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboardModule/getDashboardDataAction')

    const options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }

    return {
      options
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
