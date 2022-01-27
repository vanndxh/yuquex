<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <n-grid :col="24">
        <n-gi :span="18" :offset="2">
          <n-input v-model:value="searchValue" type="text" placeholder="搜索" :clearable="true" maxlength="20" class="input" size="large" round :autofocus="true"/>
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
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    tabBar
  },
  setup() {
    const router = useRouter()
    return {
      searchValue: ref(null),
      page: 1,
      pageTotal: 10,
      search(searchInfo) {
        console.log(searchInfo);
        router.push('search')
      }
    }
  }
}
</script>

<style scoped>
.input{
  width: 92%;
}
</style>