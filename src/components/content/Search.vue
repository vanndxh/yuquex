<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <n-grid :col="24">
        <n-gi :span="18" :offset="2">
          <n-input v-model:value="searchValue" type="text" placeholder="搜索" :clearable="true"
                   maxlength="20" class="input" size="large" round :autofocus="true"
          @keyup.enter="search(searchValue)">
            <template #affix>
              <n-icon><SearchOutline /></n-icon>
            </template>
          </n-input>
        </n-gi>
        <n-gi :span="3" :offset="1">
          <n-button type="primary" ghost @click="search(searchValue)" size="large">搜索</n-button>
        </n-gi>
      </n-grid>
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
import tabBar from "../common/tabBar";
import { ref } from "vue";
import {SearchOutline} from '@vicons/ionicons5'

export default {
  components: {
    tabBar, SearchOutline
  },
  setup() {
    const search = (searchInfo) => {
      this.$store.state.axios({
        url: '/go/article/searchArticle',
        method: 'get',
        data: {
          searchValue: searchInfo
        },
      }).then(r => {
        this.searchData = r.data.data
      })
    }

    return {
      search,

      searchValue: ref(null),
      searchData: [],
      page: 1,
      pageTotal: 10,
    }
  }
}
</script>

<style scoped>
.input{
  width: 92%;
}
</style>