<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <n-list>
        <n-list-item v-for="item in articleData" :key="item">
          <n-card :title=item.ArticleName hoverable>
            {{ item.ArticleContent.slice(0, 30) }}
            <div>
              <n-button style="float: right" @click="lookDetail(item.ArticleId)">详情</n-button>
            </div>
          </n-card>
        </n-list-item>
      </n-list>
<!--      <n-pagination v-model:page="page" :page-count=pageTotal />-->
      <n-back-top :right="100"/>
    </n-gi>
    <n-gi :span="6">
      <el-backtop visibility-height="10"/>
    </n-gi>
  </n-grid>


</template>

<script>
import tabBar from "@/components/common/tabBar";
import {useStore} from "vuex";
import { ref } from "vue";
import {useRouter} from "vue-router";

export default {
  components:{
    tabBar
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const articleData = ref([])

    return {
      articleData,

      page: 1,
      pageTotal: 10,
      lookDetail(id) {
        store.state.aid = id
        router.push('ArticleInfo')
      },
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