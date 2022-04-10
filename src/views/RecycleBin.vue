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
              <n-space vertical>
                <n-button type="error" ghost @click="clearBin">清空回收站</n-button>
                <n-data-table :columns="columns" :data="data" :pagination="pagination" />
              </n-space>
            </n-gi>
          </n-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup>
import {h, onMounted, ref} from "vue";
import {NButton, useDialog, useMessage} from "naive-ui";
import {useStore} from "vuex";
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
// use
const dialog = useDialog()
const message = useMessage()
const store = useStore()
// state
const pagination = {
  pageSize: 10
}
// columns
const data = ref([])
const createColumns = ({ recover, deleteArticle }) => {
  return [
    {
      width: 100
    },
    {
      title: '文章标题',
      key: 'ArticleName',
      align: 'left'
    },
    {
      title: '作者',
      key: 'AuthorName',
      align: 'center',
      width: 200
    },
    {
      title: '恢复',
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
              onClick: () => recover(row)
            },
            { default: () => '恢复' }
        )
      }
    },
    {
      title: '彻底删除',
      key: 'delete',
      align: 'center',
      width: 150,
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'error',
              ghost: true,
              onClick: () => deleteArticle(row)
            },
            { default: () => '删除' }
        )
      }
    },
    {
      width: 100
    }
  ]
}
const columns = createColumns({
  recover (rowData) {
    dialog.warning({
      title: '警告',
      content: '你确定要将文章移出回收站？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        let formData = new FormData()
        formData.set('articleId', rowData.ArticleId)
        formData.set('handle', "0")
        store.state.axios({
          url: '/go/article/transTrash',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("文章已移出回收站!")
          getArticles()
        })
      },
      onNegativeClick: () => {
      }
    })
  },
  deleteArticle (rowData) {
    dialog.warning({
      title: '警告',
      content: '你确定要将文章彻底删除？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        store.state.axios({
          url: '/go/article/deleteArticle',
          method: 'delete',
          params: {
            articleId: rowData.ArticleId
          }
        }).then(() => {
          message.success("文章彻底删除!")
          getArticles()
        })
      },
      onNegativeClick: () => {
      }
    })
  }
})
// method
const clearBin = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/article/deleteAllArticle',
      method: 'delete',
      params: {
        userId: store.state.uid
      }
    }).then(() => {
      message.success("清空回收站！")
      getArticles()
    })
  }
}
const getArticles = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/article/getArticles',
      method: 'get',
      params: {
        articleAuthor: store.state.uid,
        isInTrash: 1
      }
    }).then(r => {
      data.value = r.data.data
    })
  }
}
// life
onMounted(() => {
  getArticles()
})
</script>

<style scoped>

</style>