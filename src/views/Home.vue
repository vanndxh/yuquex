<template>
  <div class="home">
    <n-layout>
      <!--顶部栏-->
      <tabBar></tabBar>
      <!--侧边栏以及主要内容-->
      <n-layout has-sider>
        <!--侧边栏-->
        <n-layout-sider content-style="padding: 24px;">
          <tabBarS></tabBarS>
          <catgif></catgif>
        </n-layout-sider>
        <!--主要内容-->
        <n-layout-content content-style="padding: 24px;">
          暂时没内容，先放个按钮玩玩吧
          <n-button @click="test">Default</n-button>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import catgif from "@/components/common/catgif"


export default {
  name: 'Home',
  components: {
    tabBar, tabBarS, catgif
  },
  setup() {
    return {
    }
  }

}
</script>

<style scoped>

</style>