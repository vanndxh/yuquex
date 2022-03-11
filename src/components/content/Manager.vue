<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">
      <br>
      <n-card title="管理中心" style="margin-bottom: 16px">
        <n-tabs type="line">
          <n-tab-pane name="users" tab="用户">
            <n-data-table :columns="columns1" :data="data1" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="articles" tab="文章">
            <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="teams" tab="小组">
            <n-data-table :columns="columns3" :data="data3" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="comments" tab="评论">
            <n-data-table :columns="columns4" :data="data4" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="feedbacks" tab="反馈">
            <n-data-table :columns="columns5" :data="data5" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="auth" tab="认证">
            <br>
            <n-space justify="center">
              <p style="line-height: 0">认证用户Id</p>
              <n-input v-model:value="authId" type="text" style="width: 200px"/>
              <p style="line-height: 0">认证内容</p>
              <n-input v-model:value="authContent" type="text" style="width: 300px"/>
            </n-space>
            <br>
            <div style="text-align: center">
              <n-button type="primary" ghost @click="addAuth" style="width: 100px">认证</n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="update" tab="更新">
            <n-card title="发布新版本">
              <n-space justify="center">
                <p style="line-height: 0">版本</p>
                <n-input v-model:value="title" type="text" style="width: 200px" placeholder="v0.0.0"/>
                <p style="line-height: 0">日期</p>
                <n-input v-model:value="time" type="text" style="width: 200px" placeholder="2000/11/11"/>
                <p style="line-height: 0">类型</p>
                <n-input v-model:value="type" type="text" style="width: 200px" placeholder="Can be null"/>
              </n-space>
              <br>
              <n-space justify="center">
                <p style="line-height: 0">更新内容</p>
                <n-input v-model:value="content" type="text" style="width: 800px"/>
              </n-space>
              <br>
              <div style="text-align: center">
                <n-button type="primary" ghost @click="addTimeline" style="width: 100px">发布更新</n-button>
              </div>
            </n-card>
            <n-data-table :columns="columns6" :data="data6" :pagination="pagination" size="small"/>
          </n-tab-pane>
          <n-tab-pane name="notice" tab="发布新公告">
            <p style="line-height: 0">新公告</p>
            <n-input v-model:value="newNotice" type="text" style="width: 200px"/>
            <div style="text-align: center">
              <n-button type="primary" ghost @click="changeNotice" style="width: 100px">发布公告</n-button>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import {h, ref} from "vue";
import {NButton, useDialog, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar
  },
  setup() {
    const dialog = useDialog()
    const router = useRouter()
    const store = useStore()
    const message = useMessage()
    // notice
    const newNotice = ref()
    // update界面
    const content = ref()
    const type = ref()
    const title = ref()
    const time = ref()
    // auth界面
    const authId = ref()
    const authContent = ref()
    // data
    const data1 = ref([])
    const data2 = ref([])
    const data3 = ref([])
    const data4 = ref([])
    const data5 = ref([])
    const data6 = ref([])
    // tableColumn
    const createColumns1 = ({ deleteUser }) => {
      return [
        {
          width: 50
        },
        {
          title: 'Id',
          width: 50,
          key: 'UserId',
          align: 'center',
        },
        {
          title: '用户名',
          width: 100,
          key: 'Username',
          align: 'center',
        },
        {
          title: '密码',
          width: 100,
          key: 'Password',
          align: 'center',
        },
        {
          title: '简介',
          width: 200,
          key: 'UserInfo',
          align: 'left',
        },
        {
          title: '文章数',
          width: 60,
          key: 'ArticleAmount',
          align: 'center',
        },
        {
          title: '点赞数',
          width: 60,
          key: 'LikeAmount',
          align: 'center',
        },
        {
          title: '关注',
          width: 60,
          key: 'FollowAmount',
          align: 'center',
        },
        {
          title: '粉丝',
          width: 60,
          key: 'FollowerAmount',
          align: 'center',
        },
        {
          key: 'deleteUser',
          title: '删除用户',
          align: 'center',
          width: 150,
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteUser(row)
                },
                { default: () => '删除' }
            )
          }
        },
        {
          width: 50
        }
      ]
    }
    const createColumns2 = ({ lookDetail, deleteArticle }) => {
      return [
        {
          width: 50
        },
        {
          title: 'Id',
          key: 'ArticleId',
          width: 50,
          align: 'center',
        },
        {
          title: '文章名',
          key: 'ArticleName',
          align: 'left',
        },
        {
          title: '作者',
          width: 100,
          key: 'AuthorName',
          align: 'center',
        },
        {
          title: '点赞数',
          width: 60,
          key: 'LikeAmount',
          align: 'center',
        },
        {
          title: '收藏数',
          width: 60,
          key: 'CollectionAmount',
          align: 'center',
        },
        {
          title: '查看详情',
          key: 'lookDetail',
          align: 'center',
          width: 100,
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
          key: 'deleteArticle',
          align: 'center',
          width: 100,
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
        },
        {
          width: 50
        }
      ]
    }
    const createColumns3 = ({ lookDetail, deleteTeam }) => {
      return [
        {
          title: 'Id',
          key: 'TeamId',
          width: 50,
          align: 'center',
        },
        {
          title: '小组名',
          width: 200,
          key: 'TeamName',
          align: 'center',
        },
        {
          title: '小组公告',
          key: 'TeamNotice',
          align: 'left',
        },
        {
          title: '组长',
          width: 100,
          key: 'LeaderName',
          align: 'center',
        },
        {
          title: '查看详情',
          key: 'lookDetail',
          align: 'center',
          width: 100,
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
          title: '删除小组',
          key: 'deleteTeam',
          align: 'center',
          width: 100,
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteTeam(row)
                },
                { default: () => '删除' }
            )
          }
        },
      ]
    }
    const createColumns4 = ({ lookDetail, deleteComment }) => {
      return [
        {
          title: 'Id',
          key: 'CommentId',
          width: 50,
          align: 'center',
        },
        {
          title: '用户名',
          width: 100,
          key: 'Username',
          align: 'center',
        },
        {
          title: '文章名',
          key: 'ArticleName',
          width: 200,
          align: 'left',
        },
        {
          title: '评论内容',
          key: 'CommentContent',
          align: 'left',
        },
        {
          title: '查看详情',
          key: 'lookDetail',
          align: 'center',
          width: 100,
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
          title: '删除评论',
          key: 'deleteTeam',
          align: 'center',
          width: 100,
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteComment(row)
                },
                { default: () => '删除' }
            )
          }
        },
      ]
    }
    const createColumns5 = ({ deleteFeedback }) => {
      return [
        {
          title: 'Id',
          key: 'FeedbackId',
          width: 50,
          align: 'center',
        },
        {
          title: '反馈用户',
          width: 80,
          key: 'UserId',
          align: 'center',
        },
        {
          title: '反馈内容',
          key: 'FeedbackInfo',
          width: 200,
          align: 'left',
        },
        {
          title: '删除该反馈',
          key: 'deleteFeedback',
          align: 'center',
          width: 100,
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteFeedback(row)
                },
                { default: () => '删除' }
            )
          }
        },
      ]
    }
    const createColumns6 = ({ deleteTimeline }) => {
      return [
        {
          title: '版本',
          key: 'Title',
          width: 80,
          align: 'center',
        },
        {
          title: '更新时间',
          width: 120,
          key: 'Time',
          align: 'center',
        },
        {
          title: '更新内容',
          key: 'Content',
          align: 'left',
        },
        {
          title: '删除更新',
          key: 'deleteTimeline',
          align: 'center',
          width: 80,
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'warning',
                  onClick: () => deleteTimeline(row)
                },
                { default: () => '删除' }
            )
          }
        },
      ]
    }
    // get data
    const getAllUsers = () => {
      store.state.axios({
        url: '/go/user/getAllUsers',
        method: 'get',
      }).then(r => {
        data1.value = r.data.data
      })
    }
    const getAllArticles = () => {
      store.state.axios({
        url: '/go/article/getAllArticles',
        method: 'get',
      }).then(r => {
        data2.value = r.data.data
      })
    }
    const getAllTeams = () => {
      store.state.axios({
        url: '/go/team/getAllTeams',
        method: 'get',
      }).then(r => {
        data3.value = r.data.data
      })
    }
    const getAllComments = () => {
      store.state.axios({
        url: '/go/comment/getAllComments',
        method: 'get',
      }).then(r => {
        data4.value = r.data.data
      })
    }
    const getFeedbacks = () => {
      store.state.axios({
        url: '/go/feedback/getFeedbacks',
        method: 'get',
      }).then(r => {
        data5.value = r.data.data
      })
    }
    const getTimelines = () => {
      store.state.axios({
        url: '/go/timeline/getTimeline',
        method: 'get',
      }).then(r => {
        data6.value = r.data.data
      })
    }

    return {
      data1, data2, data3, data4, data5, data6, authId, authContent, type, time, title, content, newNotice,
      getAllArticles, getAllUsers, getAllTeams, getAllComments, getFeedbacks, getTimelines,

      pagination: {
        pageSize: 10
      },
      columns1: createColumns1({
        deleteUser (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这个用户？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/user/deleteUser',
                method: 'delete',
                params: {
                  userId: rowData.UserId,
                }
              }).then(() => {
                message.success("删除成功！")
                getAllUsers()
              })
            }
          })
        }
      }),
      columns2: createColumns2({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        },
        deleteArticle (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这篇文章？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/article/deleteArticle',
                method: 'delete',
                params: {
                  articleId: rowData.ArticleId,
                  userId: rowData.ArticleAuthor,
                }
              }).then(() => {
                message.success("删除成功！")
                getAllArticles()
              })
            }
          })
        }
      }),
      columns3: createColumns3({
        lookDetail (rowData) {
          store.state.tid = rowData.TeamId
          router.push("TeamInfo")
        },
        deleteTeam (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这个小组？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/team/deleteTeam',
                method: 'delete',
                params: {
                  teamId: rowData.TeamId
                }
              }).then(() => {
                message.success("删除成功！")
                getAllTeams()
              })
            }
          })
        }
      }),
      columns4: createColumns4({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        },
        deleteComment (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这条评论？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/comment/deleteComment',
                method: 'delete',
                params: {
                  commentId: rowData.CommentId
                }
              }).then(() => {
                message.success("删除成功！")
                getAllComments()
              })
            }
          })
        }
      }),
      columns5: createColumns5({
        deleteFeedback (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这条反馈？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/feedback/deleteFeedback',
                method: 'delete',
                params: {
                  feedbackId: rowData.FeedbackId
                }
              }).then(() => {
                message.success("删除成功！")
                getFeedbacks()
              })
            }
          })
        }
      }),
      columns6: createColumns6({
        deleteTimeline (rowData) {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这条更新公告？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              store.state.axios({
                url: '/go/timeline/deleteTimeline',
                method: 'delete',
                params: {
                  title: rowData.Title
                }
              }).then(() => {
                message.success("删除成功！")
                getTimelines()
              })
            }
          })
        }
      }),
      addAuth() {
        let formData = new FormData()
        formData.set('authId', authId.value)
        formData.set('authContent', authContent.value)
        store.state.axios({
          url: '/go/user/addAuth',
          method: 'post',
          data: formData
        }).then(() => {
          message.success("认证成功！")
          authId.value = ""
          authContent.value = ""
        }).catch(() => {
          message.error("error!")
        })
      },
      addTimeline() {
        let formData = new FormData()
        formData.set('time', time.value)
        formData.set('title', title.value)
        formData.set('type', type.value)
        formData.set('content', content.value)
        store.state.axios({
          url: '/go/timeline/addTimeline',
          method: 'post',
          data: formData
        }).then(() => {
          message.success("发布成功！")
          time.value = title.value = type.value = content.value = ""
          getTimelines()
        }).catch(() => {
          message.error("error!")
        })
      }
    }
  },
  mounted() {
    this.getAllArticles()
    this.getAllUsers()
    this.getAllTeams()
    this.getAllComments()
    this.getFeedbacks()
    this.getTimelines()
  }
}
</script>

<style scoped>

</style>