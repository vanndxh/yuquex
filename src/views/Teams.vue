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
            <n-gi :span="20">
              <n-space vertical>
                <n-data-table :columns="columns" :data="data" :pagination="pagination" />
              </n-space>
            </n-gi>
            <n-gi :offset="2">
              <n-button type="success" ghost style="float: right" @click="showCreateTeam = !showCreateTeam">创建小组</n-button>
            </n-gi>
          </n-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
  <!--创建小组模块-->
  <n-modal v-model:show="showCreateTeam">
    <n-card
        style="width: 600px;"
        title="创建小组"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        小组名称<n-input v-model:value="newTeamName" type="text"/>
        <n-button type="primary" ghost @click="createTeam(newTeamName)" style="float: right">保存</n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import { h, ref } from "vue";
import { NButton } from "naive-ui";

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
      showCreateTeam: ref(false),
      newTeamName: ref(null),
      data: createData(),
      columns: createColumns({
        lookDetail (rowData) {
          console.log(rowData);
        }
      }),
      pagination: {
        pageSize: 10
      },
      createTeam(newTeamName) {
        this.$store.state.axios({
          url: '/go/user/register',
          method: 'post',
          data: {
            teamName: newTeamName,
            teamLeader: 1
          },
        }).then(r => {
          console.log(r.data);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>