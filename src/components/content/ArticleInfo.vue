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
                  <n-space justify="center" vertical style="color: #4fbcfa">
                    <h1 style="text-align: center">{{ articleData.LikeAmount }}</h1>
                    <n-icon size="40" v-if="isLiked" @click="clickLike()"><LikeFilled /></n-icon>
                    <n-icon size="40" v-else @click="clickLike()"><LikeOutlined /></n-icon>
                  </n-space>
                </n-gi>
                <n-gi span="1" offset="8" >
                  <n-space justify="center" vertical style="color: #4fbcfa">
                    <h1 style="text-align: center">{{ articleData.CollectionAmount }}</h1>
                    <n-icon size="40" v-if="isCollected" @click="clickCollection()"><StarFilled /></n-icon>
                    <n-icon size="40" v-else @click="clickCollection()"><StarOutlined /></n-icon>
                  </n-space>
                </n-gi>
              </n-grid>
              <n-divider />
              <!--评论区板块-->
              <n-space vertical>
                <n-input
                    v-model:value="commentValue"
                    type="textarea"
                    :autosize="{minRows: 3,maxRows: 5}"
                    maxlength="50" show-count
                />
                <n-button type="success" @click="clickComment()" :disabled="uid === 0">回复</n-button>
              </n-space>
              <n-list>
                <n-list-item v-for="item in commentData" :key="item">
                  <n-card hoverable size="small">
                    <n-space>
                      <h3 style="line-height: 0">{{ item.Username }}</h3>
                      <div v-if="item.UserAuth && item.UserAuth.length > 0 && item.UserAuth !== 'undefined'">
                        <n-tag type="info" size="small">{{ item.UserAuth }}</n-tag>
                      </div>
                      <div v-if="item.UserVip === 1">
                        <n-tag type="warning" size="small">vip</n-tag>
                      </div>
                      <div v-if="item.UserId === articleData.ArticleAuthor">
                        <n-tag type="warning" size="small">作者</n-tag>
                      </div>
                    </n-space>

                    <p class="small">{{ item.CommentContent }}</p>
                    <div>
                      <n-button type="error" style="float: right"
                                class="small"
                                v-if="uid == 1 || uid == item.UserId || uid == articleData.ArticleAuthor"
                                @click="deleteComment(item.UserId, item.CommentId)" ghost size="small">删除</n-button>
                    </div>
                  </n-card>
                </n-list-item>
              </n-list>
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
                <n-space justify="center">
                  <div v-if="authorData.Authentication">
                    <n-tag type="info">{{ authorData.Authentication }}</n-tag>
                  </div>
                  <div v-if="authorData.Vip == 1">
                    <n-tag type="warning">vip</n-tag>
                  </div>
                </n-space>
                <br>
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
        <n-select v-model:value="secretValue" :options="secretOptions" :consistent-menu-width="false" style="width: 150px;float: right"
                  placeholder="选择他人是否可见"/>
        <n-input v-model:value="newArticleName" type="text" placeholder="标题" size="large"
                 maxlength="20" show-count/>
        <div class="editor">
          <Quill-editor
              id="toolbar"
              v-model:content="newArticleContent"
              contentType="html"
              :options="editorOption"
          >
          </Quill-editor>
        </div>
        <br><br><br>
        <div style="float: right">
          <n-button type="success" class="save" @click="updateArticle()">保存</n-button>
        </div>
      </n-space>
    </n-card>
  </n-modal>

  <el-backtop/>
</template>

<script setup>
import tabBar from "../common/tabBar";
import tabBarS from "../common/tabBarS";
import {onMounted, ref} from "vue";
import { LikeOutlined, LikeFilled, StarOutlined, StarFilled, MessageOutlined } from "@vicons/antd";
import {useStore} from "vuex";
import {useDialog, useMessage} from "naive-ui";
// state
const dialog = useDialog()
const message = useMessage()
const store = useStore()
// init
const editorOption = {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
      placeholder: '请输入正文~'
}
const secretOptions = [
  {
    label: '公开',
    value: 0
  },
  {
    label: '私密',
    value: 1
  },
]
const uid = store.state.uid
// model
const secretValue = ref(null)
const newArticleName = ref(null)
const newArticleContent = ref(null)
const showUpdate = ref(false)
const toolbarOptions = [
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['bold', 'italic', 'underline', 'strike'],
  // 引用  代码块-----['blockquote', 'code-block']
  ['blockquote', 'code-block'],
  // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ script: 'sub' }, { script: 'super' }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ indent: '-1' }, { indent: '+1' }],
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: ['small', false, 'large', 'huge'] }],
  // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],
  // 对齐方式-----[{ align: [] }]
  [{ align: [] }],
  // 清除文本格式-----['clean']
  ['clean'],
  // 链接、图片、视频-----['link', 'image', 'video']
  ['image']
]
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
// method get
const getCommentData = () => {
  store.state.axios({
    url: '/go/comment/getArticleComment',
    method: 'get',
    params: {
      articleId: store.state.aid
    }
  }).then(r => {
    commentData.value = r.data.data
    for (let i in r.data.data) {
      let now = new Date()
      let date = new Date(r.data.data[i].UserVip)
      if (date > now) {
        r.data.data[i].UserVip = 1
      } else {
        r.data.data[i].UserVip = 0
      }
    }
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
      articleId: store.state.aid,
      userId: store.state.uid
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
    let now = new Date()
    let date = new Date(r.data.data.Vip)
    if (date > now) {
      r.data.data.Vip = 1
    } else {
      r.data.data.Vip = 0
    }
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
// method other
const getUserData = () => {
  store.state.axios({
    url: '/go/user/getUserInfo',
    method: 'get',
    params: {
      userId: store.state.uid
    },
  }).then(r => {
    userData.value = r.data.data
  })
}
const clickLike = () => {
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
}
const clickCollection = () => {
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
}
const clickComment = () => {
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
}
const deleteComment = (u, c) => {
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
}
const follow = () => {
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
      getAuthorData()
    }).catch(() => {
      message.error("error!")
    })
  }
}
const unFollow = () => {
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
    getAuthorData()
  }).catch(() => {
    message.error("error!")
  })
}
const clickUpdata = () => {
  newArticleName.value = articleData.value.ArticleName
  newArticleContent.value = articleData.value.ArticleContent
  secretValue.value = articleData.value.Secret
  showUpdate.value = true
}
const updateArticle = () => {
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
}
// lifecycle
onMounted(() => {
  getArticleData()
  getUserData()
  getCommentData()
  getIsLiked()
  getIsCollected()
})
</script>

<style scoped>
.user{
  text-align: center;
}
.editor {
  height: 380px;
}
.small {
  line-height: 0px;
}
</style>