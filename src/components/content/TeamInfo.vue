<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">

      <h1 class="teamName">{{ teamData.TeamName }}</h1>
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
          {{ teamData.TeamNotice }}
        </n-gi>
      </n-grid>
      <br>
      <!--三个主要内容-->
      <n-tabs type="segment" size="large">
        <n-tab-pane name="members" tab="组内成员">
          <n-data-table :columns="columns1" :data="data1" :pagination="pagination" size="small"/>
        </n-tab-pane>
        <n-tab-pane name="articles" tab="组内文章">
          <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>
        </n-tab-pane>
        <n-tab-pane name="punchInfo" tab="打卡详情" @click="handlePunch">
          <n-grid :cols="24">

            <n-gi :span="12" :offset="3">
              <n-space vertical>
                <n-statistic tabular-nums>
                  您共在本小组打卡
                  <n-number-animation ref="numberAnimationInstRef" :from="0" :to="count" />
                  <template #suffix>
                    次
                  </template>
                </n-statistic>
                <n-button style="width: 200px" @click="punch">今日打卡</n-button>
              </n-space>
            </n-gi>

            <n-gi :span="6" :offset="1">
              打卡排行榜
            </n-gi>

          </n-grid>
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
        <n-button type="primary" ghost @click="saveInfo()" style="float: right">保存</n-button>
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
import {NButton, useDialog, useMessage} from 'naive-ui'
import { h, ref } from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, NotificationOutlined, EllipsisVerticalCircle
  },
  setup() {
    const router = useRouter()
    const message = useMessage()
    const store = useStore()
    const dialog = useDialog()

    const showAddUser = ref(false)
    const showChangeInfo = ref(false)
    const data1 = ref([])
    const data2 = ref([])
    const teamData = ref({})
    const count = ref(0)
    const newTeamName = ref("")
    const newTeamNotice = ref("")
    const newUserId = ref("")
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
    const createColumns2 = ({ lookDetail, deleteArticle }) => {
      return [
        {
          key: 'ArticleName',
          align: 'left'
        },
        {
          key: 'ArticleAuthor'
        },
        {
          key: 'lookDetail',
          align: 'right',
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
          align: 'right',
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
    const getTeamInfo = () => {
      store.state.axios({
        url: '/go/team/getTeamInfo',
        method: 'get',
        params: {
          teamId: store.state.tid
        }
      }).then(r => {
        teamData.value = r.data.data
        if(store.state.uid == r.data.data.TeamLeader) {
          count.value = r.data.data.LeaderCount
        } else if (store.state.uid == teamData.value.TeamMember1) {
          count.value = r.data.data.Member1Count
        } else if (store.state.uid == teamData.value.TeamMember2) {
          count.value = r.data.data.Member2Count
        } else if (store.state.uid == teamData.value.TeamMember3) {
          count.value = r.data.data.Member3Count
        } else if (store.state.uid == teamData.value.TeamMember4) {
          count.value = r.data.data.Member4Count
        } else {
          count.value = -1
        }
      })
    }
    const getTeamArticles = () => {
      store.state.axios({
        url: '/go/team/getTeamArticles',
        method: 'get',
        params: {
          teamId: store.state.tid
        }
      }).then(r => {
        data2.value = r.data.data
      })
    }
    const getTeamMembers = () => {
      store.state.axios({
        url: '/go/team/getTeamMembers',
        method: 'get',
        params: {
          teamId: store.state.tid
        },
      }).then(r => {
        data1.value = r.data.data
      })
    }

    return {
      showAddUser, showChangeInfo, teamData, newTeamName, newTeamNotice, count, data1, data2, newUserId,
      getTeamInfo, getTeamArticles, getTeamMembers,

      columns1: createColumns1({
        deleteUser (rowData) {
          console.log(rowData);
        },
      }),
      columns2: createColumns2({
        deleteArticle (rowData) {
          console.log(rowData);
        },
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
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
            content: '你确定要退出小组么？如果你是组长，小组将被解散',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              if(teamData.value.TeamLeader === store.state.uid) {
                let formData = new FormData()
                formData.set("teamId", teamData.value.TeamId)
                store.state.axios({
                  url: '/go/team/deleteTeam',
                  method: 'post',
                  data: formData
                }).then(() => {
                  message.success("退出小组成功!")
                  router.push("Teams")
                })
              } else {
                let formData = new FormData()
                formData.set("userId", store.state.uid)
                formData.set("teamId", store.state.tid)
                store.state.axios({
                  url: '/go/team/quitTeam',
                  method: 'post',
                  data: formData
                }).then(() => {
                  message.success("退出小组成功!")
                  router.push("Teams")
                })
              }
            },
            onNegativeClick: () => {
            }
          })
        }else if(key === "addUser") {
          showAddUser.value = !showAddUser.value
        } else if(key === "changeTeamInfo") {
          newTeamName.value = teamData.value.TeamName
          newTeamNotice.value = teamData.value.TeamNotice
          showChangeInfo.value = !showChangeInfo.value
        }
      },
      addUser() {
        let formData = new FormData()
        formData.set('teamId', store.state.tid)
        formData.set('newUserId', newUserId.value)
        store.state.axios({
          url: '/go/team/addTeamUser',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("成功添加新成员！")
          newUserId.value = ""
          showAddUser.value = false
          // getTeamMembers()
        }).catch(() => {
          message.error("添加失败!请检查输入id后再试~")
        })
      },
      saveInfo() {
        if (newTeamName.value === "") {
          message.error("小组名称不能为空！请重新填写！")
        } else {
          let formData = new FormData()
          formData.set('teamId', store.state.tid)
          formData.set('teamName', newTeamName.value)
          formData.set('teamNotice', newTeamNotice.value)
          store.state.axios({
            url: '/go/team/updateTeamInfo',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("修改小组信息成功！")
            showChangeInfo.value = !showChangeInfo.value
            getTeamInfo()
          })
        }
      },
      handlePunch() {
        if(count.value === -1) {
          message.info("您不是该组成员，没有打卡数据！")
        }
      },
      punch() {
        let formData = new FormData()
        formData.set('userId', store.state.uid)
        formData.set('teamId', store.state.tid)
        store.state.axios({
          url: '/go/team/punch',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("打卡成功！")
          getTeamInfo()
        })
      }
    }
  },
  mounted() {
    this.getTeamInfo()
    this.getTeamArticles()
    this.getTeamMembers()
  }
}
</script>

<style scoped>
.teamName {
  text-align: center;
  font-size: 40px;
}
</style>