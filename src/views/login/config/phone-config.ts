// 编写好规则,这个格式遵循 async-validator ，来自element-plus官网
export const rules = {
  phoneNumber: [
    {
      required: true,
      message: '手机号必填',
      trigger: 'blur'
    },
    {
      pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  valiCode: [
    {
      required: true,
      message: '验证码必填',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码必须是数字',
      trigger: 'blur'
    }
  ]
}
