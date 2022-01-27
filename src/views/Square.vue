<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi offset="6" span="12">

      <n-list>
        <n-list-item>
          <n-card :title=articleData.articleName hoverable>
            {{ articleData.articleInfo }}
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
      articleData: {
        articleName: "articleName",
        articleInfo: "articleInfo"
      }
    }
  }
}
</script>

<style scoped>

</style>