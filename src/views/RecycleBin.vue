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
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import { h , ref } from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";

export default {
  components: {
    tabBar, tabBarS
  },
  setup() {
    const message = useMessage()
    const store = useStore()

    const createColumns = ({ recover, deleteArticle }) => {
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
          title: '恢复',
          key: 'lookDetail',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: () => recover(row)
                },
                { default: () => '恢复' }
            )
          }
        },
        {
          title: '彻底删除',
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

    return {
      data,

      columns: createColumns({
        recover (rowData) {
          store.state.axios({
            url: '/go/article/transTrash',
            method: 'put',
            data: {
              articleId: rowData.articleId,
              handle: 0,
            },
          })
        },
        deleteArticle (rowData) {
          store.state.axios({
            url: '/go/article/deleteArticle',
            method: 'delete',
            data: {
              articleId: rowData.articleId,
            },
          })
        }
      }),
      pagination: {
        pageSize: 10
      },
      getArticles() {
        if (store.state.uid === 0) {
          message.error("您尚未登录！")
        } else {
          let formData = new FormData()
          formData.set('userId', store.state.uid)
          formData.set('isInTrash', "1")
          store.state.axios({
            url: '/go/article/getArticles',
            method: 'post',
            data: formData,
          }).then(r => {
            data.value = r.data.data
          })
        }
      }
    }
  },
  mounted() {
    this.getArticles()
  }
}
</script>

<style scoped>

</style>