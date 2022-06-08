<template>
  <div class="user">
    <div class="search">
      <YxForm :formItems="formItems"></YxForm>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YxForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  components: {
    YxForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名',
        palceholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码',
        palceholder: '请输入密码'
      },
      {
        type: 'select',
        label: '喜欢的运动',
        palceholder: '请输入喜欢的运动',
        options: [
          {
            title: '篮球',
            value: 'basketball'
          },
          {
            title: '足球',
            value: 'football'
          }
        ]
      },
      {
        type: 'datepicker',
        label: '创建时间',
        otherOptions: {
          starPlaceHolder: '开始时间',
          endPlaceHolder: '结束时间',
          type: 'daterange'
        }
      }
    ]
    return { formItems }
  }
})
</script>

<style scoped></style>
