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
import {NButton} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, tabBarS, catgif
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const data = ref([])
    const createColumns = ({ lookDetail, removeStar }) => {
      return [
        {
          title: '文章标题',
          key: 'articleName',
          align: 'center'
        },
        {
          title: '作者',
          key: 'articleAuthor'
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

    return {
      data,

      columns: createColumns({
        removeStar (rowData) {
          store.state.axios({
            url: '/go/star/cancelStar',
            method: 'post',
            data: {
              userId: store.state.uid,
              articleId: rowData.articleId
            },
          })
        },
        lookDetail (rowData) {
          store.state.aid = rowData.articleId
          router.push("articleInfo")
        }
      }),
      pagination: {
        pageSize: 10
      },
      getFavorite() {
        store.state.axios({
          url: '/go/star/getFavorite',
          method: 'get',
          data: {
            userId: store.state.uid
          },
        }).then(r => {
          data.value = r.data.data
        })
      }
    }
  },
  mounted() {
    this.getFavorite()
  }
}
</script>

<style scoped>

</style>