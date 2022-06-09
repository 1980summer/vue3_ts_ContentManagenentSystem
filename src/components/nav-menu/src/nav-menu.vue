<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">Vue3+ Ts</span>
    </div>

    <el-menu
      :collapse="collapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 有children的一级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 一级菜单标题 需要用插槽 -->
            <template #title>
              <el-icon v-if="item.icon" :class="item.icon">
                <!-- 动态icon组件 -->
                <component :is="splitIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历二级菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <!-- 二级菜单标题 -->
                <el-icon v-if="subItem.icon" :class="subItem.icon">
                  <!-- 动态icon组件 -->
                  <component :is="splitIcon(subItem.icon)"></component>
                </el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <!-- 没有children的菜单 -->
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon" :class="item.icon">
              <!-- 动态icon组件 -->
              <component :is="splitIcon(item.icon)"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store' //使用自己的useStore
import { Monitor, Setting, Goods, ChatRound } from '@element-plus/icons'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Monitor,
    Setting,
    Goods,
    ChatRound // 这个好像不显示
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    //对菜单中的 icon 进行处理 因为返回的数据是 el-icon-xx 但是 el-icon需要引入对应组件 所以用动态组件来实现
    const splitIcon = computed(() => {
      return function (icon: string) {
        icon = icon.split('el-icon-')[1]
        icon = icon.split('')[0].toUpperCase() + icon.slice(1)
        return icon
      }
    })

    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      // console.log(item)
      /**
       * 想要导航到不同的 URL，使用 router.push 方法。这个方法会向 history 栈添加一个新记录，
       * 所以，当用户点击浏览器后退按钮时，可以返回到之前的 URL。
       */
      router.push({
        path: item.url ?? 'not-found' // 此时点击菜单选项，网址栏内容会更改
      })
    }
    return {
      userMenus,
      splitIcon,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
