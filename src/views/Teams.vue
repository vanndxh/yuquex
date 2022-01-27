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

const createColumns = ({ lookDetail }) => {
  return [
    {
      title: '小组名称',
      titleColSpan: 1,
      key: 'teamName',
      align: 'center'
    },
    {
      title: '组长',
      titleColSpan: 1,
      key: 'teamLeader'
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
  ]
}
const createData = () => [
  {
    teamName: 'John Brownaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    teamLeader: 'John Brown',
  },
]

export default {
  components: {
    tabBar, tabBarS
  },
  setup() {
    return {
      data: createData(),
      columns: createColumns({
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