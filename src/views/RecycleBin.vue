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
import {h} from "vue";
import {NButton} from "naive-ui";

const createColumns = ({ recover, deleteArticle }) => {
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
      title: '恢复',
      titleColSpan: 1,
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
  name: "RecycleBin",
  components: {
    tabBar, tabBarS
  },
  setup() {
    return {
      data: createData(),
      columns: createColumns({
        recover (rowData) {
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