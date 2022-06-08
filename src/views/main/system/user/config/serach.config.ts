import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: { padding: '10px 40px' },
  colLayout: {
    span: 8 //在所有屏幕尺寸下都分三份
  },
  formItems: [
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
}
//
