export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },

    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  showIndexColumn: false, // 是否显示序号
  showSelectColumn: false, // 是否显示可选按钮

  // 针对当前页面，是需要展开的, 这个属性最后会被传递给table
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },

  // 不显示分页器
  showFooter: false
}
