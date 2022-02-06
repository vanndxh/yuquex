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
import {useStore} from "vuex";

export default {
  components:{
    tabBar
  },
  setup() {
    const store = useStore()

    const articleData = [{
      articleName: "articleName",
      articleInfo: "articleInfo"
    }]

    return {
      articleData,

      page: 1,
      pageTotal: 10,
      getHotArticle() {
        store.state.axios({
          url: '/go/article/getHotArticle',
          method: 'get',
        }).then(r => {
          articleData.value = r.data.data
        })
      }
    }
  },
  mounted() {
    this.getHotArticle()
  }
}
</script>

<style scoped>

</style>