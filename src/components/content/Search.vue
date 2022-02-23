<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <n-grid :col="24">
        <n-gi :span="18" :offset="2">
          <n-input v-model:value="searchValue" type="text" placeholder="搜索" :clearable="true"
                   maxlength="20" class="input" size="large" round :autofocus="true"
          @keyup.enter="search()">
            <template #affix>
              <n-icon><SearchOutline /></n-icon>
            </template>
          </n-input>
        </n-gi>
        <n-gi :span="3" :offset="1">
          <n-button type="primary" ghost @click="search()" size="large">搜索</n-button>
        </n-gi>
      </n-grid>
      <n-list>
        <n-list-item v-for="item in searchData" :key="item">
          <n-card :title=item.ArticleName hoverable>
            <n-grid :col="24">
              <n-gi :span="20">
                <p style="font-size: 12px">
                  点赞：{{ item.LikeAmount}}    收藏：{{item.CollectionAmount}}
                </p>
              </n-gi>
              <n-gi :span="4" style="float: right">
                <n-button style="float: right" @click="lookDetail(item.ArticleId)">详情</n-button>
              </n-gi>
            </n-grid>
          </n-card>
        </n-list-item>
      </n-list>
<!--      <n-pagination v-model:page="page" :page-count=pageTotal />-->
    </n-gi>
  </n-grid>
  <n-back-top :right="100" />
</template>

<script>
import tabBar from "../common/tabBar";
import { ref } from "vue";
import {SearchOutline} from '@vicons/ionicons5'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useMessage} from "naive-ui";

export default {
  components: {
    tabBar, SearchOutline
  },
  setup() {
    const message = useMessage()
    const store = useStore()
    const router = useRouter()

    const searchValue = ref(null)
    const searchData = ref([])

    return {
      searchData, searchValue,

      page: 1,
      pageTotal: 10,
      search() {
        store.state.axios({
          url: '/go/article/searchArticle',
          method: 'get',
          params: {
            searchValue: searchValue.value
          },
        }).then(r => {
          if (r.data.data === "none"){
            searchData.value = []
            message.error("没有找到文章！")
          } else {
            searchData.value = r.data.data
          }
        })
      },
      lookDetail(articleId) {
        store.state.aid = articleId
        router.push('ArticleInfo')
      },
      searchInit () {
        searchData.value = store.state.searchData
      }
    }
  },
  mounted() {
    this.searchInit()
  }
}
</script>

<style scoped>
.input{
  width: 92%;
}
</style>