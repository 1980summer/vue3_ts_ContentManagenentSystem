<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  // background: url('../../assets/img/login-bg.svg');
  background: linear-gradient(217deg, #4474dc, rgba(255, 0, 0, 0) 70.71%),
    linear-gradient(127deg, rgba(0, 170, 255, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, #919fe5, rgba(0, 0, 255, 0) 70.71%);
}
</style>
