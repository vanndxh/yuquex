<template>
  <div class="home">
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
// @ is an alias to /src
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import catgif from "@/components/common/catgif"
import {h} from "vue";
import {NButton} from "naive-ui";

const createColumns = ({ lookDetail, deleteArticle }) => {
  return [
    {
      title: '文章标题',
      titleColSpan: 1,
      key: 'articleName',
      align: 'center'
    },
    {
      title: '作者',
      titleColSpan: 1,
      key: 'articleAuthor'
    },
    {
      title: '查看详情',
      titleColSpan: 1,
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
      titleColSpan: 1,
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
const createData = () => [
  {
    articleName: 'John Brownaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    articleAuthor: 'John Brown',
  },
]

export default {
  name: 'Home',
  components: {
    tabBar, tabBarS, catgif
  },
  setup() {
    return {
      data: createData(),
      columns: createColumns({
        deleteArticle (rowData) {
          console.log(rowData);
        },
        lookDetail (rowData) {
          console.log(rowData);
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }

}
</script>

<style scoped>

</style>