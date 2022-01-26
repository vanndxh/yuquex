<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi offset="6" span="12">

      <n-list>
        <n-list-item>
          <n-card title="{{ articleName }}" hoverable>
            articleContent前15字
            <div>
              <n-button style="float: right">详情</n-button>
            </div>
          </n-card>
        </n-list-item>
      </n-list>
      <n-pagination v-model:page="page" :page-count=pageTotal />

    </n-gi>
  </n-grid>
</template>

<script>
import tabBar from "@/components/common/tabBar";

export default {
  components:{
    tabBar
  },
  setup() {
    return {
      page: 1,
      pageTotal: 10,
    }
  }
}
</script>

<style scoped>

</style>