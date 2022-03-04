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
              <div class="ql-container ql-snow" style="border:none;height: fit-content">
                <div class="ql-editor" style="height: fit-content">
                  <div v-html="articleData.ArticleContent"></div>
                </div>
              </div>
              <div id="content"></div>
              <n-grid :col="24">
                <n-gi span="1" offset="6">
                  <n-space justify="center" vertical>
                    <h1 style="text-align: center">{{ articleData.LikeAmount }}</h1>
                    <n-icon size="40" v-if="isLiked" @click="clickLike()"><LikeFilled /></n-icon>
                    <n-icon size="40" v-else @click="clickLike()"><LikeOutlined /></n-icon>
                  </n-space>
                </n-gi>
                <n-gi span="1" offset="8" >
                  <n-space justify="center" vertical>
                    <h1 style="text-align: center">{{ articleData.CollectionAmount }}</h1>
                    <n-icon size="40" v-if="isCollected" @click="clickCollection()"><StarFilled /></n-icon>
                    <n-icon size="40" v-else @click="clickCollection()"><StarOutlined /></n-icon>
                  </n-space>
                </n-gi>
              </n-grid>
              <n-divider />
              <!--评论区板块-->
              <n-list>
                <n-list-item v-for="item in commentData" :key="item">
                  <n-card hoverable>
                    <h3>{{ item.Username }}</h3>
                    {{ item.CommentContent }}
                    <div>
                      <n-button type="error" style="float: right"
                                v-if="uid == 1 || uid == item.UserId || uid == articleData.ArticleAuthor"
                                @click="deleteComment(item.UserId, item.CommentId)" ghost>删除</n-button>
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
                <h1 class="user">{{ authorData.Username }}</h1>
                <n-icon><MessageOutlined /></n-icon>
                {{ authorData.UserInfo }}

                <n-space justify="space-around">
                  <n-space vertical :size=1>
                    <p style="text-align: center">{{authorData.FollowAmount}}</p>
                    关注
                  </n-space>
                  <n-space vertical :size=1>
                    <p style="text-align: center">{{authorData.FollowerAmount}}</p>
                    粉丝
                  </n-space>
                </n-space>
                <br>
                <n-space justify="space-around">
                  <n-button @click="follow()" ghost style="width: 120px" v-if="uid != articleData.ArticleAuthor && !isFollowed">关注</n-button>
                  <n-button @click="unFollow()" ghost style="width: 120px" v-if="uid != articleData.ArticleAuthor && isFollowed">取消关注</n-button>
                  <n-button @click="clickUpdata()" type="success" ghost style="width: 120px" v-if="uid == articleData.ArticleAuthor">编辑文章</n-button>
                </n-space>
              </n-card>
            </n-gi>
          </n-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>

  <n-modal v-model:show="showUpdate">
    <n-card
        style="width: 600px;"
        title="修改文章"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        <n-select v-model:value="secretValue" :options="secretOptions" :consistent-menu-width="false" style="width: 200px;"
                  placeholder="选择他人是否可见"/>
        <n-input v-model:value="newArticleName" type="text" placeholder="标题" size="large"
                 maxlength="20" show-count/>
        <n-input
            v-model:value="newArticleContent"
            type="textarea"
            placeholder="正文"
            size="small"
            :autosize="{minRows: 20,maxRows: 30}"
            maxlength="200" show-count
        />
        <div style="float: right">
          <n-button type="success" class="save" @click="updateArticle()">保存</n-button>
        </div>
      </n-space>
    </n-card>
  </n-modal>
  <el-backtop/>
</template>

<script>
import tabBar from "../common/tabBar";
import tabBarS from "../common/tabBarS";
import { ref } from "vue";
import { LikeOutlined, LikeFilled, StarOutlined, StarFilled, MessageOutlined } from "@vicons/antd";
import {useStore} from "vuex";
import {useDialog, useMessage} from "naive-ui";

export default {
  components: {
    tabBar, tabBarS, LikeOutlined, LikeFilled, StarOutlined, StarFilled, MessageOutlined
  },
  setup() {
    const dialog = useDialog()
    const message = useMessage()
    const store = useStore()

    // 模块相关
    const secretValue = ref(null)
    const newArticleName = ref(null)
    const newArticleContent = ref(null)
    const showUpdate = ref(false)
    const showAuthor = ref(false)
    // 文章初始化信息
    const isLiked =  ref(false)
    const isCollected = ref(false)
    const isFollowed = ref(false)
    const commentValue = ref(null)
    // 数据初始化
    const articleData = ref({})
    const authorData = ref({})
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
        })
      }
    }
    const getIsCollected = () => {
      if (store.state.uid === 0) {
        isCollected.value = false
      } else {
        store.state.axios({
          url: '/go/collection/getIsCollected',
          method: 'get',
          params: {
            articleId: store.state.aid,
            userId: store.state.uid
          },
        }).then(r => {
          isCollected.value = r.data.data
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
        getAuthorData()
        getIsFollowed()
      })
    }
    const getAuthorData = () => {
      store.state.axios({
        url: '/go/user/getUserInfo',
        method: 'get',
        params: {
          userId: articleData.value.ArticleAuthor,
        }
      }).then(r => {
        authorData.value = r.data.data
      })
    }
    const getIsFollowed = () => {
      if (store.state.uid === 0) {
        isFollowed.value = false
      } else {
        store.state.axios({
          url: '/go/follow/getIsFollowed',
          method: 'get',
          params: {
            userId: store.state.uid,
            upId: articleData.value.ArticleAuthor
          }
        }).then(r => {
          isFollowed.value = r.data.data
        })
      }
    }

    return {
      isLiked, isCollected, commentValue, articleData, userData, commentData, secretValue,
      showUpdate, newArticleName, newArticleContent, isFollowed, authorData, showAuthor,
      getCommentData, getIsLiked, getIsCollected, getArticleData, getAuthorData, getIsFollowed,

      secretOptions:[
        {
          label: '公开',
          value: 0
        },
        {
          label: '私密',
          value: 1
        },
      ],
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
          formData.set('handle', 0)
          store.state.axios({
            url: '/go/like/handleLike',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("点赞成功")
            isLiked.value = true
            articleData.value.LikeAmount++
          })
        } else if (isLiked.value === true) {
          let formData = new FormData()
          formData.set('userId', store.state.uid)
          formData.set('articleId', store.state.aid)
          formData.set('handle', 1)
          store.state.axios({
            url: '/go/like/handleLike',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("取消点赞成功")
            isLiked.value = false
            articleData.value.LikeAmount--
          })
        }
      },
      clickCollection() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else {
          if (isCollected.value === false) {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            formData.set('handle', 0)
            store.state.axios({
              url: '/go/collection/handleCollection',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("收藏成功")
              isCollected.value = true
              articleData.value.CollectionAmount++
            })
          } else if (isCollected.value === true) {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            formData.set('handle', 1)
            store.state.axios({
              url: '/go/collection/handleCollection',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("取消收藏成功!")
              isCollected.value = false
              articleData.value.CollectionAmount--
            })
          }
        }
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
              store.state.axios({
                url: '/go/comment/deleteComment',
                method: 'delete',
                params: {
                  commentId: c
                }
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
        if (store.state.uid === 0) {
          message.error("您尚未登录！")
        } else {
          let formData = new FormData()
          formData.set('up', articleData.value.ArticleAuthor)
          formData.set('follower', store.state.uid)
          formData.set('handle', 0)
          store.state.axios({
            url: '/go/follow/handleFollow',
            method: 'post',
            data: formData,
          }).then(() => {
            message.success("关注成功！")
            isFollowed.value = true
          }).catch(() => {
            message.error("error!")
          })
        }
      },
      unFollow() {
        let formData = new FormData()
        formData.set('up', articleData.value.ArticleAuthor)
        formData.set('follower', store.state.uid)
        formData.set('handle', 1)
        store.state.axios({
          url: '/go/follow/handleFollow',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("取消关注成功！")
          isFollowed.value = false
        }).catch(() => {
          message.error("error!")
        })
      },
      clickUpdata() {
        newArticleName.value = articleData.value.ArticleName
        newArticleContent.value = articleData.value.ArticleContent
        secretValue.value = articleData.value.Secret
        showUpdate.value = true
      },
      updateArticle() {
        let formData = new FormData()
        formData.set('articleId', store.state.aid)
        formData.set('newArticleName', newArticleName.value)
        formData.set('newArticleContent', newArticleContent.value)
        formData.set('newSecret', secretValue.value)
        store.state.axios({
          url: '/go/article/updateArticle',
          method: 'post',
          data: formData,
        }).then(() => {
          message.success("修改成功！")
          showUpdate.value = false
          getArticleData()
        })
      },
      test() {
        document.getElementById('content').innerHTML = articleData.value.ArticleContent
      }
    }
  },
  mounted() {
    this.getArticleData()
    this.getUserData()
    this.getCommentData()
    this.getIsLiked()
    this.getIsCollected()
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