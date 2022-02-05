<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">

      <h1 class="teamName">{{ teamData.teamName }}</h1>
      <n-dropdown trigger="hover" @select="handleSelect" :options="options">
        <n-icon size="30" style="float: right;width: 200px">
          <EllipsisVerticalCircle/>
        </n-icon>
      </n-dropdown>

      <n-grid :col="24">
        <n-gi :span="2" :offset="2">
          <n-icon size="25">
            <NotificationOutlined/>
          </n-icon>
        </n-gi>
        <n-gi :span="18">
          {{ teamData.teamNotice }}
        </n-gi>
      </n-grid>
      <br>
<!--      三个主要内容-->
      <n-tabs type="segment" size="large">
        <n-tab-pane name="members" tab="组内成员">
          <n-data-table :columns="columns1" :data="data1" :pagination="pagination" size="small"/>
        </n-tab-pane>
        <n-tab-pane name="articles" tab="组内文章">
          <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>
        </n-tab-pane>
        <n-tab-pane name="clockInfo" tab="打卡详情">
          <n-statistic tabular-nums>
            共在本小组打卡
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="666" />
            <template #suffix>
              次
            </template>
          </n-statistic>
        </n-tab-pane>
      </n-tabs>
    </n-gi>
  </n-grid>
  <!--修改信息模块-->
  <n-modal v-model:show="showChangeInfo">
    <n-card
        style="width: 600px;"
        title="修改小组信息"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        小组名称<n-input v-model:value="newTeamName" type="text"/>
        小组公告<n-input v-model:value="newTeamNotice" type="text"/>
        <n-button type="primary" ghost @click="saveInfo(newTeamName, newTeamNotice)" style="float: right">保存</n-button>
      </n-space>
    </n-card>
  </n-modal>
  <!--新增用户模块  -->
  <n-modal v-model:show="showAddUser">
    <n-card
        style="width: 600px;"
        title="添加组员"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-input v-model:value="newUserId" type="text" placeholder="请输入添加用户的id~" style="width: 80%"/>
      <n-button type="primary" ghost @click="addUser(newUserId)">添加</n-button>
    </n-card>
  </n-modal>
</template>

<script>
import tabBar from "../common/tabBar";
import { NotificationOutlined } from '@vicons/antd'
import { EllipsisVerticalCircle } from '@vicons/ionicons5'
import {NButton, useDialog} from 'naive-ui'
import { h, ref } from "vue";
import {useStore} from "vuex";

export default {
  components: {
    tabBar, NotificationOutlined, EllipsisVerticalCircle
  },
  setup() {
    const store = useStore()
    const dialog = useDialog()

    const showAddUser = ref(false)
    const showChangeInfo = ref(false)
    const teamData = ref({
      teamId: 1,
      teamName: "teamName",
      teamNotice: "testTeamNotice"
    })
    const createColumns1 = ({ deleteUser }) => {
      return [
        {
          title: '用户',
          key: 'username'
        },
        {
          title: '职位',
          key: 'position'
        },
        {
          title: '操作',
          key: 'delete',
          align: 'canter',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteUser(row)
                },
                { default: () => '踢出' }
            )
          }
        }
      ]
    }
    const createData1 = () => [
      {
        username: 'John Brown',
        position: '组长'
      },
    ]
    const createColumns2 = ({ lookDetail, deleteArticle }) => {
      return [
        {
          key: 'articleName',
          align: 'center'
        },
        {
          key: 'articleAuthor'
        },
        {
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
    const createData2 = () => [
      {
        articleName: 'John Brownaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        articleAuthor: 'John Brown',
      },
    ]

    return {
      showAddUser, showChangeInfo, teamData,

      newTeamName: teamData.value.teamName,
      newTeamNotice: teamData.value.teamNotice,
      newUserId: null,

      data1: createData1(),
      columns1: createColumns1({
        deleteUser (rowData) {
          console.log(rowData);
        },
      }),
      data2: createData2(),
      columns2: createColumns2({
        deleteArticle (rowData) {
          console.log(rowData);
        },
        lookDetail (rowData) {
          console.log(rowData);
        }
      }),
      pagination: {
        pageSize: 10
      },
      options: [
        {
          label: '修改信息',
          key: "changeTeamInfo"
        },
        {
          label: '添加组员',
          key: "addUser"
        },
        {
          label: '退出小组',
          key: 'exitTeam'
        },
      ],
      handleSelect (key) {
        if (key === "exitTeam") {
          dialog.warning({
            title: '警告',
            content: '你确定要退出登录？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              console.log('退出登录');
            },
            onNegativeClick: () => {
            }
          })
        }else if(key === "addUser") {
          showAddUser.value = !showAddUser.value
        } else if(key === "changeTeamInfo") {
          showChangeInfo.value = !showChangeInfo.value
        }
      },
      addUser(newUserId) {
        store.state.axios({
          url: '/go/team/addTeamUser',
          method: 'put',
          data: {
            teamId: teamData.value.teamId,
            newUserId: newUserId,
          },
        })
      },
      saveInfo(newTeamName, newTeamNotice) {
        store.state.axios({
          url: '/go/team/updateTeamInfo',
          method: 'put',
          data: {
            newTeamName: newTeamName,
            newTeamNotice: newTeamNotice,
          },
        })
      },
      getTeamInfo() {
        store.state.axios({
          url: '/go/team/getTeamInfo',
          method: 'get',
          data: {
            teamId: store.state.tid
          }
        }).then(r => {
          teamData.value = r.data.data
        })
      }
    }
  },
  mounted() {
    this.getTeamInfo()
  }
}
</script>

<style scoped>
.teamName {
  text-align: center;
  font-size: 40px;
}
</style>