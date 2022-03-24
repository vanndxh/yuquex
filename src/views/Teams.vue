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
                <n-button type="success" ghost @click="showCreateTeam.value = !showCreateTeam">创建小组</n-button>
                <n-data-table :columns="columns" :data="data" :pagination="pagination" />
              </n-space>
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
        <n-button type="primary" ghost @click="createTeam()" style="float: right">保存</n-button>
      </n-space>
    </n-card>
  </n-modal>
  <div><n-back-top :right="40"/></div>
</template>

<script setup>
import {h, onMounted, ref} from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
// use
const message = useMessage()
const router = useRouter()
const store = useStore()
// columns
const pagination = {
  pageSize: 10
}
const data = ref([])
const createColumns = ({ lookDetail }) => {
  return [
    {
      width: 100
    },
    {
      title: '小组名称',
      key: 'TeamName',
      align: 'left'
    },
    {
      title: '组长',
      key: 'LeaderName',
      align: 'center',
      width: 100
    },
    {
      title: '查看详情',
      align: 'center',
      width: 150,
      key: 'lookDetail',
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'info',
              ghost: true,
              onClick: () => lookDetail(row)
            },
            { default: () => '查看' }
        )
      }
    },
    {
      width: 50
    }
  ]
}
const columns = createColumns({
  lookDetail (rowData) {
    store.state.tid = rowData.TeamId
    router.push("/TeamInfo")
  }
})
// modelCreateTeam
const newTeamName = ref(null)
const showCreateTeam = ref(false)
// method
const getTeams = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/team/getTeams',
      method: 'get',
      params: {
        userId: store.state.uid
      },
    }).then(r => {
      data.value = r.data.data
    }).catch(() => {
      message.error("没有获取到小组！")
    })
  }
}
const createTeam = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else if (newTeamName.value.indexOf(" ") !== -1 || newTeamName.value.indexOf(" ") !== -1) {
    message.error("小组名不能有空格！")
  } else {
    let formData = new FormData()
    formData.set('teamName', newTeamName.value)
    formData.set('userId', store.state.uid)
    store.state.axios({
      url: '/go/team/createTeam',
      method: 'post',
      data: formData,
    }).then(() => {
      message.success("创建小组成功")
      newTeamName.value = null
      showCreateTeam.value = false
      getTeams()
    }).catch(() => {
      message.error("创建小组出错！")
    })
  }
}
// life
onMounted(() => {
  getTeams()
})
</script>

<style scoped>

</style>