<template>
  <n-layout>
    <n-layout-header>
      <tabBar></tabBar>
    </n-layout-header>
    <n-layout-content style="background-color: rgb(250,250,250)">
      <br>
      <n-grid :col="24" x-gap="12">
        <n-gi offset="4" span="4">
          <n-space vertical>
            <n-card hoverable>
              <n-space justify="center">
                <p style="font-size: 12px">UID</p>
                <p style="font-size: 12px">{{ userData.UserId }}</p>
              </n-space>
              <n-space justify="center">
                <n-avatar
                    :size="160"
                    style="horiz-align: center"
                    round
                    src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c83d70cf3bc79f3dbeffa8adb8a1cd11728b2914.jpg"
                />
              </n-space>
              <h1 class="user">{{ userData.Username }}</h1>
              <n-space justify="center">
                <div v-if="userData.Authentication">
                  <n-tag type="info">{{ userData.Authentication }}</n-tag>
                </div>
                <div v-if="isVip">
                  <n-tag type="warning" @click="showVip = true">vip</n-tag>
                </div>
              </n-space>
              <br>
              <n-icon><MessageOutlined /></n-icon>
              {{ userData.UserInfo }}
              <n-space justify="space-around">
                <n-space vertical :size=1>
                  <p style="text-align: center" @click="clickFollow">{{userData.FollowAmount}}</p>
                  关注
                </n-space>
                <n-space vertical :size=1>
                  <p style="text-align: center" @click="clickFollower">{{userData.FollowerAmount}}</p>
                  粉丝
                </n-space>
              </n-space>
              <n-space justify="center">
                <n-button v-if="uid === uidt" style="width: 200px" @click="handleChangeInfo">编辑资料</n-button>
              </n-space>
              <n-divider />
              <div style="font-size: 14px">
                <n-statistic tabular-nums>
                  <n-icon size="20"><BookOutline/></n-icon>共有
                  <n-number-animation ref="numberAnimationInstRef" :from=0 :to= userData.ArticleAmount />
                  <template #suffix>
                    篇文章
                  </template>
                </n-statistic>
                <n-statistic tabular-nums>
                  <n-icon size="20"><LikeOutlined/></n-icon>共收获
                  <n-number-animation ref="numberAnimationInstRef" :from=0 :to=userData.LikeAmount />
                  <template #suffix>
                    个赞
                  </template>
                </n-statistic>
              </div>

            </n-card>
          </n-space>
        </n-gi>
        <n-gi span="11">
          <n-card hoverable>
            <n-tabs type="line">
              <n-tab-pane name="articles" tab="文档">
                <n-data-table :columns="columns" :data="data1" :pagination="pagination" size="small"/>
              </n-tab-pane>
              <n-tab-pane name="teams" tab="知识小组">
                <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>
              </n-tab-pane>
              <n-tab-pane name="favorites" tab="收藏夹">
                <n-data-table :columns="columns3" :data="data3" :pagination="pagination" size="small"/>
              </n-tab-pane>
              <n-tab-pane name="comments" tab="历史评论">
                <n-data-table :columns="columns4" :data="data4" :pagination="pagination" size="small"/>
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </n-gi>
      </n-grid>

    </n-layout-content>
  </n-layout>

  <n-modal v-model:show="showChangeInfo">
    <n-card
        style="width: 800px;"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        用户昵称<n-input v-model:value="newUsername" type="text"/>
        用户密码<n-input v-model:value="newPassword" type="text"/>
        个人简介<n-input v-model:value="newInfo" type="text"/>
        <n-button type="primary" ghost @click="changeInfo" style="float: right">保存</n-button>
      </n-space>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showFollow">
    <n-card
        style="width: 800px;"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space>
        <n-input v-model:value="upId" type="text" placeholder="请输入你要关注用户的id~" @keyup.enter="follow"/>
        <n-button type="primary" ghost @click="follow" style="float: right">关注</n-button>
      </n-space>

      <br>
      <n-data-table :columns="columns5" :data="data5" :pagination="pagination" size="small"/>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showFollower">
    <n-card
        style="width: 800px;"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-data-table :columns="columns6" :data="data6" :pagination="pagination" size="small"/>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showVip">
    <n-card
        style="width: 800px;"
        :bordered="false"
        title="会员服务"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <div>
        您会员到期时间：{{ userData.Vip }}
      </div>
      <br>
      <n-space>
        <p style="line-height: 0">兑换码</p>
        <n-input v-model:value="code" type="text" style="width: 500px" @keyup.enter="renewVip"/>
        <n-button type="primary" ghost @click="renewVip" style="float: right">兑换</n-button>
      </n-space>
      <p style="font-size: 12px;color: darkgray">目前没有氪金服务，输入"xiaoheizhenshuai"续费一个月，感谢支持！</p>
    </n-card>
  </n-modal>

</template>

<script setup>
import {BookOutline} from '@vicons/ionicons5'
import {LikeOutlined, MessageOutlined} from '@vicons/antd'
import {h, onMounted, ref} from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import tabBar from "../common/tabBar";
// use
const router = useRouter()
const message = useMessage()
const store = useStore()
// state
const isVip = ref(false)
const isFollowed = ref(null)
const uid = store.state.uid
const uidt = store.state.uidTemp
const pagination = {
  pageSize: 10
}
// 模块相关
const code = ref()
const showVip = ref(false)
const showFollow = ref(false)
const showFollower = ref(false)
const showChangeInfo = ref(false)
const newUsername = ref(null)
const newPassword = ref(null)
const newInfo = ref(null)
const upId = ref(null)
// 数据类初始化
const userData = ref({})
const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const data4 = ref([])
const data5 = ref([])
const data6 = ref([])
// createColumn
const createColumns = ({ lookDetail }) => {
  return [
    {
      width: 100
    },
    {
      key: 'ArticleName',
      align: 'left',
    },
    {
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
const createColumns2 = ({ lookDetail }) => {
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
      title: '查看详情',
      key: 'lookDetail',
      width: 150,
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
const createColumns3 = ({ lookDetail }) => {
  return [
    {
      width: 100
    },
    {
      title: '文章名',
      key: 'ArticleName',
      align: 'left',
    },
    {
      title: '作者',
      key: 'AuthorName',
      align: 'center',
      width: 100,
    },
    {
      title: '查看详情',
      key: 'lookDetail',
      width: 150,
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
  ]
}
const createColumns4 = ({ lookDetail, deleteComment }) => {
  return [
    {
      width: 20
    },
    {
      title: '评论内容',
      key: 'CommentContent',
      align: 'left'
    },
    {
      title: '查看',
      key: 'lookDetail',
      width: 50,
      align: 'center',
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
    },{
      title: '删除',
      key: 'deleteComment',
      align: 'center',
      width: 150,
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'error',
              ghost: true,
              onClick: () => deleteComment(row)
            },
            { default: () => '删除' }
        )
      }
    },
  ]
}
const createColumns5 = ({ unFollow }) => {
  return [
    {
      width: 50
    },
    {
      title: 'Id',
      key: 'UpId',
      width: 100,
      align: 'center'
    },
    {
      title: '用户名',
      key: 'UpName',
      align: 'left'
    },
    {
      title: '取消关注',
      key: 'unFollow',
      align: 'center',
      width: 150,
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: () => unFollow(row)
            },
            { default: () => '取消关注' }
        )
      }
    },
    {
      width: 50
    }
  ]
}
const createColumns6 = ({ follow }) => {
  return [
    {
      width: 50
    },
    {
      title: 'Id',
      key: 'FollowerId',
      width: 100,
      align: 'center'
    },
    {
      title: '用户名',
      key: 'FollowerName',
      align: 'left'
    },
    {
      title: '关注',
      key: 'follow',
      align: 'center',
      width: 150,
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: () => follow(row)
            },
            { default: () => '关注' }
        )
      }
    },
    {
      width: 50
    }
  ]
}
// columns
const columns  = createColumns({
  lookDetail (rowData) {
    store.state.aid = rowData.ArticleId
    router.push("ArticleInfo")
  }
})
const columns2 = createColumns2({
  lookDetail (rowData) {
    store.state.tid = rowData.TeamId
    router.push("TeamInfo")
  }
})
const columns3 = createColumns3({
  lookDetail (rowData) {
    store.state.aid = rowData.ArticleId
    router.push("ArticleInfo")
  }
})
const columns4 = createColumns4({
  lookDetail (rowData) {
    store.state.aid = rowData.ArticleId
    router.push("ArticleInfo")
  },
  deleteComment (rowData) {
    store.state.axios({
      url: '/go/comment/deleteComment',
      method: 'delete',
      params: {
        commentId: rowData.CommentId
      }
    }).then(() => {
      message.success("删除成功！")
      getUserComment()
    }).catch(() => {
      message.error("error!")
    })
  }
})
const columns5 = createColumns5({
  unFollow (rowData) {
    let formData = new FormData()
    formData.set('up', rowData.UpId)
    formData.set('follower', store.state.uid)
    formData.set('handle', "1")
    store.state.axios({
      url: '/go/follow/handleFollow',
      method: 'post',
      data: formData,
    }).then(() => {
      message.success("取消关注成功！")
      getFollows()
      getUserData()
    }).catch(() => {
      message.error("error!")
    })
  }
})
const columns6 = createColumns6({
  follow (rowData) {
    getIsFollowed(store.state.uid, rowData.FollowerId)
    setTimeout(() => {
      if (isFollowed.value) {
        message.error("您已经关注，不能重复关注！")
      } else {
        let formData = new FormData()
        formData.set('up', rowData.FollowerId)
        formData.set('follower', store.state.uid)
        formData.set('handle', "0")
        store.state.axios({
          url: '/go/follow/handleFollow',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("关注成功！")
          getFollows()
          getUserData()
        }).catch(() => {
          message.error("error!")
        })
      }
    }, 500)
  }
})
// get data
const getArticles = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/article/getArticles',
      method: 'get',
      params: {
        articleAuthor: store.state.uid,
        isInTrash: 0
      }
    }).then(r => {
      data1.value = r.data.data
    })
  }
}
const getTeams = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/team/getTeams',
      method: 'get',
      params: {
        userId: store.state.uid
      }
    }).then(r => {
      data2.value = r.data.data
    }).catch(() => {
      message.error("获取小组信息出错！")
    })
  }
}
const getFavorite = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    store.state.axios({
      url: '/go/collection/getFavorite',
      method: 'get',
      params: {
        userId: store.state.uid
      }
    }).then(r => {
      data3.value = r.data.data
    }).catch(() => {
      message.error("获取收藏夹出错！")
    })
  }
}
const getUserComment = () => {
  store.state.axios({
    url: '/go/comment/getUserComment',
    method: 'get',
    params: {
      userId: store.state.uid
    }
  }).then(r => {
    data4.value = r.data.data
  }).catch(() => {
    message.error("获取收藏夹出错！")
  })
}
const getUserData = () => {
  store.state.axios({
    url: '/go/user/getUserInfo',
    method: 'get',
    params: {
      userId: store.state.uid
    }
  }).then(r => {
    userData.value = r.data.data
    let vip = new Date(r.data.data.Vip)
    let now = new Date()
    if (vip > now) {
      isVip.value = true
    } else {
      isVip.value = false
    }
    userData.value.Vip = vip.getFullYear() + '-' + (vip.getMonth() + 1) + '-' + vip.getDate() + "  " + vip.getHours() + ":" + vip.getMinutes()
  })
}
const getFollows = () => {
  store.state.axios({
    url: '/go/follow/getFollows',
    method: 'get',
    params: {
      userId: store.state.uid
    }
  }).then(r => {
    data5.value = r.data.upData
    data6.value = r.data.followerData
  })
}
const getIsFollowed = (followerId, upId) => {
  store.state.axios({
    url: '/go/follow/getIsFollowed',
    method: 'get',
    params: {
      userId: followerId,
      upId: upId,
    }
  }).then(r => {
    isFollowed.value = r.data.data
  })
  return isFollowed.value
}
// method
const handleChangeInfo = () => {
  newUsername.value = userData.value.Username
  newPassword.value = userData.value.Password
  newInfo.value = userData.value.UserInfo
  showChangeInfo.value = true
}
const changeInfo = () => {
  let formData = new FormData()
  formData.set('username', newUsername.value)
  formData.set('password', newPassword.value)
  formData.set('userInfo', newInfo.value)
  store.state.axios({
    url: '/go/user/updateUserInfo',
    method: 'post',
    data: formData
  }).then(() => {
    message.success("修改个人信息成功！")
    showChangeInfo.value = false
    getUserData()
  }).catch(() => {
    message.error("error!")
  })
}
const clickFollow = () => {
  getFollows()
  showFollow.value = true
}
const clickFollower = () => {
  getFollows()
  showFollower.value = true
}
const follow = () => {
  if (upId.value == store.state.uid) {
    message.error("您不能关注你自己！")
  }
  getIsFollowed(store.state.uid, upId.value)
  setTimeout(() => {
    if (isFollowed.value) {
      message.error("您已经关注，不能重复关注！")
    } else {
      let formData = new FormData()
      formData.set('up', upId.value)
      formData.set('follower', store.state.uid)
      formData.set('handle', "0")
      store.state.axios({
        url: '/go/follow/handleFollow',
        method: 'post',
        data: formData,
      }).then(() => {
        message.success("关注成功！")
        getFollows()
        getUserData()
      }).catch(() => {
        message.error("error!")
      })
    }
  }, 500)
}
const renewVip = () => {
  let formData = new FormData()
  formData.set("userId", store.state.uid)
  formData.set("code", code.value)
  store.state.axios({
    url: '/go/user/renewVip',
    method: 'post',
    data: formData
  }).then(() => {
    message.success("续费成功！")
    code.value = ""
    showVip.value = false
  }).catch(() => {
    message.error("err")
  })
}
// lifecycle
onMounted(() => {
  getUserData()
  getArticles()
  getFavorite()
  getTeams()
  getUserComment()
})
</script>

<style scoped>
.user{
  text-align: center;
  font-size: 28px;
}
</style>