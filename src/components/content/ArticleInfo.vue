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
          <n-grid :col="24" x-gap="12">
            <!--文章部分-->
            <n-gi span="14">
              <h1>{{ articleData.ArticleName }}</h1>
              <p class="content">{{ articleData.ArticleContent }}</p>
              <n-grid :col="24">
                <n-gi span="1" offset="6">
                  <n-space justify="center" vertical>
                    <h1 style="text-align: center">{{ articleData.LikeAmount }}</h1>
                    <n-icon size="40" @click="clickLike()" :component="isLiked ? LikeFilled : LikeOutlined"/>
                    <n-icon size="40" v-show="isLiked" @click="clickLike()"><LikeFilled /></n-icon>
                    <n-icon size="40" v-show="!isLiked" @click="clickLike()"><LikeOutlined /></n-icon>
                  </n-space>
                </n-gi>
                <n-gi span="1" offset="8" >
                  <n-space justify="center" vertical>
                    <h1 style="text-align: center">{{ articleData.StarAmount }}</h1>
                    <n-icon size="40" @click="clickStar()" :component="isStared === true ? StarFilled : StarOutlined"/>
                    <n-icon size="40" v-show="isStared" @click="clickStar()"><StarFilled /></n-icon>
                    <n-icon size="40" v-show="!isStared" @click="clickStar()"><StarOutlined /></n-icon>
                  </n-space>
                </n-gi>
              </n-grid>
              <n-divider />
              <!--评论区板块-->
              <n-list>
                <n-list-item v-for="item in commentData" :key="item">
                  <n-card hoverable>
                    <h3>{{ item.UserName }}</h3>
                    {{ item.CommentContent }}
                    <div>
                      <n-button type="error" style="float: right" @click="deleteComment(item.UserId, item.CommentId)" ghost>删除</n-button>
                    </div>
                  </n-card>
                </n-list-item>
              </n-list>
              <n-space vertical>
                <n-input
                    v-model:value="commentValue"
                    type="textarea"
                    :autosize="{minRows: 3,maxRows: 5}"
                    maxlength="50" show-count
                />
                <n-button type="success" @click="clickComment()" :disabled="uid === 0">回复</n-button>
              </n-space>
            </n-gi>
            <!--作者信息card-->
            <n-gi span="6" offset="2">
              <n-card title="作者" hoverable>
                <n-space justify="center">
                  <n-avatar
                      :size="120"
                      style="horiz-align: center"
                      round
                      src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c83d70cf3bc79f3dbeffa8adb8a1cd11728b2914.jpg"
                  />
                </n-space>
                <h1 class="user">{{ authorName }}</h1>
                <n-space justify="space-around">
                  <n-button @click="follow()" ghost style="width: 80px">关注</n-button>
                  <n-button @click="lookDetail()" ghost style="width: 80px">详情</n-button>
                </n-space>
              </n-card>
            </n-gi>
          </n-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
  <n-back-top :right="100" :visibility-height="300"/>
</template>

<script>
import tabBar from "../common/tabBar";
import tabBarS from "../common/tabBarS";
import { ref } from "vue";
import { LikeOutlined, LikeFilled, StarOutlined, StarFilled } from "@vicons/antd";
import {useStore} from "vuex";
import {useDialog, useMessage} from "naive-ui";

export default {
  components: {
    tabBar, tabBarS, LikeOutlined, LikeFilled, StarOutlined, StarFilled
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    const store = useStore()

    const isLiked =  ref(false)
    const isStared = ref(false)
    const commentValue = ref(null)
    const articleData = ref({})
    const authorName = ref(null)
    const userData = ref({})
    const commentData = ref([])
    const getCommentData = () => {
      store.state.axios({
        url: '/go/comment/getArticleComment',
        method: 'get',
        params: {
          articleId: store.state.aid
        }
      }).then(r => {
        commentData.value = r.data.data
      })
    }
    const getIsLiked = () => {
      if (store.state.uid === 0) {
        isLiked.value = false
      } else {
        store.state.axios({
          url: '/go/like/getIsLiked',
          method: 'get',
          params: {
            articleId: store.state.aid,
            userId: store.state.uid
          },
        }).then(r => {
          isLiked.value = r.data.data
          message.success("like:" + isLiked.value)
        })
      }
    }
    const getIsStared = () => {
      if (store.state.uid === 0) {
        isStared.value = false
      } else {
        store.state.axios({
          url: '/go/star/getIsStared',
          method: 'get',
          params: {
            articleId: store.state.aid,
            userId: store.state.uid
          },
        }).then(r => {
          isStared.value = r.data.data
          message.success("star:" + isStared.value)
        })
      }
    }
    const getArticleData = () => {
      store.state.axios({
        url: '/go/article/getArticleInfo',
        method: 'get',
        params: {
          articleId: store.state.aid
        }
      }).then(r => {
        articleData.value = r.data.data
        authorName.value = r.data.authorName
      })
    }

    return {
      isLiked, isStared, commentValue, articleData, userData, commentData, authorName,
      getCommentData, getIsLiked, getIsStared, getArticleData,

      iconName: null,
      uid: store.state.uid,
      getUserData() {
        store.state.axios({
          url: '/go/user/getUserInfo',
          method: 'get',
          params: {
            userId: store.state.uid
          },
        }).then(r => {
          userData.value = r.data.data
        })
      },
      clickLike() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else if (isLiked.value === false) {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/like/addLike',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("点赞成功")
            })
        } else if (isLiked.value === true) {
          let formData = new FormData()
          formData.set('userId', store.state.uid)
          formData.set('articleId', store.state.aid)
          store.state.axios({
            url: '/go/like/cancelLike',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("取消点赞成功")
          })
        }
        getIsLiked()
        getArticleData()
      },
      clickStar() {
        console.log(isStared.value);
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else {
          if (isStared.value === false) {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/star/addStar',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("收藏成功", isStared.value)
            })
          } else if (isStared.value === true) {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/star/cancelStar',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("取消收藏成功")
            })
          }
        }
        getIsStared()
        getArticleData()
      },
      clickComment() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else if (commentValue.value === null) {
          message.error("不能评论空！")
        } else {
          let formData = new FormData()
          formData.set('userId', store.state.uid)
          formData.set('articleId', store.state.aid)
          formData.set('commentContent', commentValue.value)
          store.state.axios({
            url: '/go/comment/createComment',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("评论成功！")
            commentValue.value = null
            getCommentData()
          })
        }
      },
      deleteComment(u, c) {
        if (store.state.uid != 1 && store.state.uid != u && store.state.uid != articleData.value.ArticleAuthor) {
          message.error("您没有权限删除这条评论！")
        } else {
          dialog.warning({
            title: '警告',
            content: '你确定要删除这条评论？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              let formData = new FormData()
              formData.set('commentId', c)
              store.state.axios({
                url: '/go/comment/deleteComment',
                method: 'delete',
                data: formData,
              }).then(() => {
                message.success("删除成功！")
                getCommentData()
              }).catch(() => {
                message.error("error!")
              })
            }
          })
        }
      },
      follow() {
        let formData = new FormData()
        formData.set('up', articleData.value.ArticleAuthor)
        formData.set('follower', store.state.uid)
        store.state.axios({
          url: '/go/follow/addFollow',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("关注成功！")

        }).catch(() => {
          message.error("error!")
        })
      },
      lookDetail() {

      }
    }
  },
  mounted() {
    this.getArticleData()
    this.getUserData()
    this.getCommentData()
    this.getIsLiked()
    this.getIsStared()
  }
}
</script>

<style scoped>
.user{
  text-align: center;
}
.content{
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
}
</style>