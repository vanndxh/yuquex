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

            <n-gi :span="6" :offset="1">
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

            <n-gi :span="15" :offset="1">
              <n-data-table :columns="columns" :data="data" :pagination="pagination" size="small"/>
            </n-gi>

          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-gi>
  </n-grid>

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
  <n-modal v-model:show="showUser">
    <n-card
        style="width: 600px;"
        title="组员管理"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space>
        <n-space>
          <n-input v-model:value="userId" type="text" placeholder="请输入用户的id~" style="width: 300px"/>
          <n-button type="primary" ghost @click="handleUser(0)">添加</n-button>
          <n-button type="primary" ghost @click="handleUser(1)">删除</n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showManager">
    <n-card
        style="width: 600px;"
        title="管理员管理"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space>
        <n-space>
          <n-input v-model:value="managerId" type="text" placeholder="请输入管理员的id~" style="width: 350px"/>
          <n-button type="primary" ghost @click="handleManager(0)">添加</n-button>
          <n-button type="primary" ghost @click="handleManager(1)">删除</n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-modal>

</template>

<script setup>
import {NotificationOutlined} from '@vicons/antd'
import {EllipsisVerticalCircle} from '@vicons/ionicons5'
import {NButton, useDialog, useMessage} from 'naive-ui'
import {h, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import tabBar from "../common/tabBar";
// use
const router = useRouter()
const message = useMessage()
const store = useStore()
const dialog = useDialog()
// state
const pagination = {
  pageSize: 10
}
const options = [
  {
    label: '修改信息',
    key: "changeTeamInfo"
  },
  {
    label: '组员管理',
    key: "user"
  },
  {
    label: '管理员管理',
    key: "manager"
  },
  {
    label: '退出小组',
    key: 'exitTeam'
  },
]
// 数据初始化
const data = ref([])
const data1 = ref([])
const data2 = ref([])
const teamData = ref({})
// 当前用户信息初始化
const pos = ref(null)
const count = ref(0)
// 模块信息初始化
const showManager = ref(false)
const showUser = ref(false)
const showChangeInfo = ref(false)
const newTeamName = ref("")
const newTeamNotice = ref("")
const userId = ref(null)
const managerId = ref(null)
// createColumns
const createColumns = () => {
  return [
    {
      width: 50
    },
    {
      title: '用户',
      width: 100,
      key: 'Username'
    },
    {
      title: '职位',
      width: 80,
      key: 'PositionName',
      align: 'center',
    },
    {
      title: '打卡数',
      width: 60,
      key: 'Punch',
      align: 'center',
    },
    {
      title: '最后一次打卡时间',
      key: 'LastPunchTime',
      align: 'center',
    },
    {
      width: 50,
    }
  ]
}
const createColumns1 = () => {
  return [
    {
      width: 100
    },
    {
      title: 'Id',
      key: 'UserId',
      width: 100,
    },
    {
      title: '用户名',
      width: 100,
      key: 'Username'
    },
    {
      title: '职位',
      key: 'PositionName',
      width: 100,
      align: 'center',
    },
    {
      title: '打卡数',
      key: 'Punch',
      width: 100,
      align: 'center',
    },
    {
      width: 100,
    }
  ]
}
const createColumns2 = ({ lookDetail }) => {
  return [
    {
      width: 100
    },
    {
      title: '文章名',
      key: 'ArticleName',
      align: 'left'
    },
    {
      title: '作者',
      key: 'AuthorName',
      align: 'center',
      width: 100,
    },
    {
      title: '点赞数',
      key: 'LikeAmount',
      align: 'center',
      width: 80,
    },
    {
      title: '收藏数',
      key: 'CollectionAmount',
      align: 'center',
      width: 80,
    },
    {
      title: '查看详情',
      key: 'lookDetail',
      width: 100,
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
      width: 100
    }
  ]
}
// get data
const getTeamInfo = () => {
  store.state.axios({
    url: '/go/team/getTeamInfo',
    method: 'get',
    params: {
      teamId: store.state.tid
    }
  }).then(r => {
    teamData.value = r.data.data
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
    }
  }).then(r => {
    data1.value = r.data.data
    data.value = r.data.data
    for (let i in r.data.data) {
      if (r.data.data[i].UserId == store.state.uid) {
        count.value = r.data.data[i].Punch
        pos.value = r.data.data[i].Position
      }
      let date = new Date(r.data.data[i].LastPunchTime)
      r.data.data[i].LastPunchTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes()
    }
  })
}
// columns
const columns = createColumns({})
const columns1 = createColumns1({})
const columns2 = createColumns2({
  lookDetail (rowData) {
    store.state.aid = rowData.ArticleId
    router.push("ArticleInfo")
  }
})
// method
const handleSelect = (key) => {
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
    })
  } else if (key === "user") {
    if (pos.value == 2) {
      message.error("您没有权限！")
    } else {
      showUser.value = true
    }
  } else if (key === "changeTeamInfo") {
    if (store.state.uid != teamData.value.TeamLeader) {
      message.error("您没有权限！")
    } else {
      newTeamName.value = teamData.value.TeamName
      newTeamNotice.value = teamData.value.TeamNotice
      showChangeInfo.value = !showChangeInfo.value
    }
  } else if (key === "manager") {
    if (store.state.uid != teamData.value.TeamLeader) {
      message.error("您没有权限！")
    } else {
      showManager.value = true
    }
  }
}
const handleUser = (handle) => {
  if (userId.value == teamData.value.TeamLeader) {
    message.error("您不能操作您自己！")
  }
  let formData = new FormData()
  formData.set('teamId', store.state.tid)
  formData.set('teamUser', userId.value)
  formData.set('handle', handle)
  store.state.axios({
    url: '/go/team/handleTeamUser',
    method: 'post',
    data: formData,
  }).then(() => {
    message.success("操作成功！")
    userId.value = ""
    showUser.value = false
    getTeamMembers()
  }).catch(() => {
    message.error("操作失败!请检查输入id后再试~")
  })
}
const handleManager = (handle) => {
  if (managerId.value == teamData.value.TeamLeader) {
    message.error("您不能操作您自己！")
  }
  let formData = new FormData()
  formData.set('teamId', store.state.tid)
  formData.set('teamUser', managerId.value)
  formData.set('handle', handle)
  store.state.axios({
    url: '/go/team/handleManager',
    method: 'post',
    data: formData,
  }).then(() => {
    message.success("操作成功！")
    managerId.value = ""
    showManager.value = false
    getTeamMembers()
  }).catch(() => {
    message.error("操作失败!请检查输入id后再试~")
  })
}
const saveInfo = () => {
  if (newTeamName.value === "") {
    message.error("小组名称不能为空！请重新填写！")
  } else if (newTeamName.value.indexOf(" ") !== -1 || newTeamName.value.indexOf(" ") !== -1) {
    message.error("小组名不能有空格！")
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
}
const handlePunch = () => {
  if(count.value === -1) {
    message.info("您不是该组成员，没有打卡数据！")
  }
}
const punch = () => {
  let formData = new FormData()
  formData.set('userId', store.state.uid)
  formData.set('teamId', store.state.tid)
  store.state.axios({
    url: '/go/team/punch',
    method: 'post',
    data: formData,
  }).then(() => {
    message.success("打卡成功！")
    getTeamMembers()
  }).catch(() => {
    message.error("您今日已经打卡，不能重复打卡！")
  })
}
// lifecycle
onMounted(() => {
  getTeamInfo()
  getTeamArticles()
  getTeamMembers()
})
</script>

<style scoped>
.teamName {
  text-align: center;
  font-size: 40px;
}
</style>