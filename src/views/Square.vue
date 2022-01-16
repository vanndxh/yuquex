<template>
  <div>
    <tabBar></tabBar>
    <n-grid :col="24">
      <n-gi offset="6" span="12">
        Square
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import tabBar from "@/components/common/tabBar";

export default {
  name: "Square",
  components:{
    tabBar
  }
}
</script>

<style scoped>

</style>