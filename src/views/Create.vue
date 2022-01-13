<template>
  <n-layout>
    <!--顶部栏-->
    <tabBar></tabBar>
    <!--侧边栏以及主要内容-->
    <n-layout has-sider>
      <!--侧边栏-->
      <n-layout-sider content-style="padding: 24px;">
        <tabBarS></tabBarS>
      </n-layout-sider>
      <!--主要内容-->
      <n-layout-content content-style="padding: 24px;">
        暂时没内容，先放个按钮玩玩吧
        <n-button>Default</n-button>

      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";

export default {
  name: "Create",
  components: {
    tabBar, tabBarS
  }
}
</script>

<style scoped>

</style>