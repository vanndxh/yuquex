<template>
  <div>
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

          <n-grid :col="24">
            <n-gi :span="20" :offset="1">
              <n-data-table :columns="columns" :data="data" :pagination="pagination" />
            </n-gi>
          </n-grid>

        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
  <div><n-back-top :right="40"/></div>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import {h, onMounted, ref} from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
// use
const message = useMessage()
const router = useRouter()
const store = useStore()
// state
const data = ref([])
const pagination = {
  pageSize: 10
}
// columns
const createColumns = ({ lookDetail, removeStar }) => {
  return [
    {
      width: 50
    },
    {
      title: '文章标题',
      key: 'ArticleName',
      align: 'left'
    },
    {
      title: '作者',
      align: 'center',
      width: 100,
      key: 'AuthorName'
    },
    {
      title: '查看详情',
      key: 'lookDetail',
      align: 'center',
      width: 150,
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'info',
              ghost: true,
              onClick: () => lookDetail(row)
            },
            { default: () => '查看' }
        )
      }
    },
    {
      title: '移除收藏夹',
      align: 'center',
      width: 150,
      key: 'delete',
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'error',
              ghost: true,
              onClick: () => removeStar(row)
            },
            { default: () => '移除' }
        )
      }
    },
    {
      width: 100
    }
  ]
}
const columns = createColumns({
  removeStar (rowData) {
    let formData = new FormData()
    formData.set('userId', store.state.uid)
    formData.set('articleId', rowData.ArticleId)
    store.state.axios({
      url: '/go/star/cancelStar',
      method: 'post',
      data: formData,
    }).then(() => {
      message.success("成功取消收藏！")
      getFavorite()
    })
  },
  lookDetail (rowData) {
    store.state.aid = rowData.ArticleId
    router.push("ArticleInfo")
  }
})
// get data
const getFavorite = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/collection/getFavorite',
      method: 'get',
      params: {
        userId: store.state.uid
      },
    }).then(r => {
      data.value = r.data.data
    }).catch(() => {
      message.error("获取收藏夹出错！")
    })
  }
}
// life
onMounted(() => {
  getFavorite()
})
</script>

<style scoped>

</style>