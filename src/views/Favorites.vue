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
          <catgif></catgif>
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
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import catgif from "../components/common/catgif";
import { h, ref } from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, tabBarS, catgif
  },
  setup() {
    const message = useMessage()
    const router = useRouter()
    const store = useStore()

    const data = ref([])
    const createColumns = ({ lookDetail, removeStar }) => {
      return [
        {
          title: '文章标题',
          key: 'ArticleName',
          align: 'center'
        },
        {
          title: '作者',
          key: 'ArticleAuthor'
        },
        {
          title: '查看详情',
          key: 'lookDetail',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: () => lookDetail(row)
                },
                { default: () => '查看' }
            )
          }
        },
        {
          title: '移除收藏夹',
          key: 'delete',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => removeStar(row)
                },
                { default: () => '移除' }
            )
          }
        }
      ]
    }
    const getFavorite = () => {
      if (store.state.uid === 0) {
        message.error("您尚未登录！")
      } else {
        let formData = new FormData()
        formData.set('userId', store.state.uid)

        store.state.axios({
          url: '/go/star/getFavorite',
          method: 'post',
          data: formData,
        }).then(r => {
          data.value = r.data.data
        }).catch(() => {
          message.error("获取收藏夹出错！")
        })
      }
    }

    return {
      data, getFavorite,

      columns: createColumns({
        removeStar (rowData) {
          console.log(rowData.ArticleId);
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
      }),
      pagination: {
        pageSize: 10
      },
    }
  },
  mounted() {
    this.getFavorite()
  }
}
</script>

<style scoped>

</style>