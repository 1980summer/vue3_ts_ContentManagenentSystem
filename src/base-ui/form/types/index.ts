type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  palceholder?: any
  options?: any[]
  otherOptions?: any
}

//
