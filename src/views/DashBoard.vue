<template>
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
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import catgif from "@/components/common/catgif"
import { h, ref } from "vue";
import {NButton, useDialog, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, tabBarS, catgif
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    const router = useRouter()
    const store = useStore()

    const createColumns = ({ lookDetail, deleteArticle }) => {
      return [
        {
          title: '文章标题',
          key: 'ArticleName',
          align: 'center'
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
          title: '删除文章',
          key: 'delete',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteArticle(row)
                },
                { default: () => '删除' }
            )
          }
        }
      ]
    }
    const data = ref([])
    const getArticles = () => {
      if (store.state.uid === 0) {
        message.error("您尚未登录！")
      } else {
        let formData = new FormData()
        formData.set("articleAuthor", store.state.uid)
        formData.set('isInTrash', "0")

        store.state.axios({
          url: '/go/article/getArticles',
          method: 'post',
          data: formData
        }).then(r => {
          data.value = r.data.data
        })
      }
    }

    return {
      data, getArticles,

      columns: createColumns({
        deleteArticle (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要将文章移入回收站？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              let formData = new FormData()
              formData.set('articleId', rowData.ArticleId)
              formData.set('handle', "1")
              store.state.axios({
                url: '/go/article/transTrash',
                method: 'post',
                data: formData,
              }).then(() => {
                message.error("文章已移入回收站!")
                getArticles()
              })
            },
            onNegativeClick: () => {
            }
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
    this.getArticles()
  }
}
</script>

<style scoped>

</style>