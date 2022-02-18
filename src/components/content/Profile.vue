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
                <n-avatar
                    :size="200"
                    style="horiz-align: center"
                    round
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
              </n-space>
<!--              <h1 class="user">{{ userData.username }}</h1>-->
              <n-space justify="center">
                <n-button v-if="uid === uidt">编辑资料</n-button>
              </n-space>
<!--              <p>{{ userData.userInfo }}</p>-->
            </n-card>
            <n-card hoverable>
              <n-statistic tabular-nums>
                <n-icon size="20"><BookOutline/></n-icon>共有
                <n-number-animation ref="numberAnimationInstRef" :from=0 :to=6 />
<!--                userData.articleAmount-->
                <template #suffix>
                  篇文章
                </template>
              </n-statistic>
              <n-statistic tabular-nums>
                <n-icon size="20"><LikeOutlined/></n-icon>共收获
                <n-number-animation ref="numberAnimationInstRef" :from=0 :to=6 />
<!--                userData.likeTotal-->
                <template #suffix>
                  个赞
                </template>
              </n-statistic>
            </n-card>
          </n-space>
        </n-gi>
        <n-gi span="11">
          <n-card hoverable>
<!--            <n-tabs type="line">-->
<!--              <n-tab-pane name="articles" tab="文档">-->
<!--                <n-data-table :columns="columns" :data="data1" :pagination="pagination" size="small"/>-->
<!--              </n-tab-pane>-->
<!--              <n-tab-pane name="teams" tab="知识小组">-->
<!--                <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>-->
<!--              </n-tab-pane>-->
<!--              <n-tab-pane name="favorites" tab="收藏夹">-->
<!--                <n-data-table :columns="columns3" :data="data3" :pagination="pagination" size="small"/>-->
<!--              </n-tab-pane>-->
<!--              <n-tab-pane name="comments" tab="历史评论">-->
<!--                <n-data-table :columns="columns4" :data="data4" :pagination="pagination" size="small"/>-->
<!--              </n-tab-pane>-->
<!--            </n-tabs>-->
          </n-card>
        </n-gi>
      </n-grid>

    </n-layout-content>
  </n-layout>
</template>

<script>
import tabBar from "../common/tabBar";
import { BookOutline } from '@vicons/ionicons5'
import { LikeOutlined } from '@vicons/antd'
import { h , ref } from "vue";
import {NButton, useMessage} from "naive-ui";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, BookOutline, LikeOutlined
  },
  setup() {
    const router = useRouter()
    const message = useMessage()
    const store = useStore()

    const userData = ref(null)
    const data1 = ref(null)
    const data2 = ref(null)
    const data3 = ref(null)
    const data4 = ref(null)
    const createColumns = ({ lookDetail }) => {
      return [
        {
          key: 'ArticleName',
          align: 'center'
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
      ]
    }
    const createColumns2 = ({ lookDetail }) => {
      return [
        {
          key: 'TeamName',
          align: 'center'
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
      ]
    }
    const createColumns3 = ({ lookDetail }) => {
      return [
        {
          key: 'ArticleName',
          align: 'center'
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
      ]
    }
    const createColumns4 = ({ lookDetail, deleteComment }) => {
      return [
        {
          key: 'CommentContent',
          align: 'center'
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
        },{
          key: 'deleteComment',
          render (row) {
            return h(
                NButton,
                {
                  size: 'small',
                  type: 'info',
                  onClick: () => deleteComment(row)
                },
                { default: () => '删除' }
            )
          }
        },
      ]
    }

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
          url: '/go/star/getFavorite',
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

    return {
      data1, data2, data3, data4, userData,
      getTeams, getArticles, getFavorite, getUserComment,

      uid: store.state.uid,
      uidt: store.state.uidTemp,
      pagination: {
        pageSize: 10
      },
      columns: createColumns({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        }
      }),
      columns2: createColumns2({
        lookDetail (rowData) {
          store.state.tid = rowData.TeamId
          router.push("TeamInfo")
        }
      }),
      columns3: createColumns3({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        }
      }),
      columns4: createColumns4({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        },
        deleteComment (rowData) {
          let formData = new FormData()
          formData.set('commentId', rowData.CommentId)
          store.state.axios({
            url: '/go/comment/deleteComment',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("删除成功！")
            getUserComment()
          }).catch(() => {
            message.error("error!")
          })
        }
      }),
      getUserData() {
        store.state.axios({
          url: '/go/user/getUserInfo',
          method: 'get',
          params: {
            userId: store.state.uid
          }
        }).then(r => {
          userData.value = r.data.data
        })
      }
    }
  },
  mounted() {
    this.getUserData()
    this.getArticles()
    this.getFavorite()
    this.getTeams()
    this.getUserComment()
  }
}
</script>

<style scoped>
.user{
  text-align: center;
  font-size: 28px;
}
</style>