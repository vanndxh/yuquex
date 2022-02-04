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
              <h1>{{ articleData.articleName }}</h1>
              <p class="content">{{ articleData.articleContent }}</p>
              <n-grid :col="24">
                <n-gi span="1" offset="6">
                  <n-space justify="center" vertical>
                    <h4 style="text-align: center">24</h4>
                    <n-icon size="40" v-if="!isLiked" @click="clickLike()"><LikeOutlined /></n-icon>
                    <n-icon size="40" v-else @click="clickLike()"><LikeFilled /></n-icon>
                  </n-space>
                </n-gi>
                <n-gi span="1" offset="8">
                  <n-space justify="center">
                    <h4 style="text-align: center">24</h4>
                    <n-icon size="40" v-if="!isStared" @click="clickStar()"><StarOutlined /></n-icon>
                    <n-icon size="40" v-else @click="clickStar()"><StarFilled /></n-icon>
                  </n-space>
                </n-gi>
              </n-grid>
              <n-divider />
              <!--评论区板块-->
              <n-space vertical>
                <n-avatar
                    size="medium"
                    style="horiz-align: center"
                    round
                    src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c83d70cf3bc79f3dbeffa8adb8a1cd11728b2914.jpg"
                />
                <n-input
                    v-model:value="commentValue"
                    type="textarea"
                    :autosize="{minRows: 5,maxRows: 10}"
                    maxlength="100" show-count
                />
                <n-button type="success" @click="clickComment()">回复</n-button>
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
                <h1 class="user">{{ articleData.articleAuthor }}</h1>
              </n-card>
            </n-gi>
          </n-grid>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script>
import tabBar from "../common/tabBar";
import tabBarS from "../common/tabBarS";
import { ref } from "vue";
import { LikeOutlined, LikeFilled, StarOutlined, StarFilled } from "@vicons/antd";
import {useStore} from "vuex";

export default {
  components: {
    tabBar, tabBarS, LikeOutlined, LikeFilled, StarOutlined, StarFilled
  },
  setup() {
    const store = useStore()

    const isLiked = ref(false)
    const isStared = ref(false)
    const commentValue = ref(null)
    const articleData = ref({
      articleId: null,
      articleName: null,
      articleContent: null,
      articleAuthor: null,
      LikeAmount: null,
      StarAmount: null,
    })
    const userData = ref({
      userId: 1,
      username: "Vanndxh",
      userInfo: "暂无",
      articleAmount: 23,
      likeTotal: 24,
    })

    return {
      isLiked, isStared, commentValue, articleData, userData,

      getUserData() {
        store.state.axios({
          url: '/go/user/getUserInfo',
          method: 'get',
          data: {
            userId: store.state.uid,
          },
        }).then(r => {
          userData.value = r.data.data
        })
      },
      getArticleData() {
        store.state.axios({
          url: '/go/article/getArticleInfo',
          method: 'get',
          data: {
            articleId: articleData.value.articleId,
          },
        }).then(r => {
          articleData.value = r.data.data
        })
      },
      getIsLiked() {
        store.state.axios({
          url: '/go/like/getIsLiked',
          method: 'get',
          data: {
            userId: userData.value.userId,
            articleId: articleData.value.articleId
          },
        }).then(r => {
          isLiked.value = r.data.data
        })
      },
      getIsStared() {
        store.state.axios({
          url: '/go/star/getIsStared',
          method: 'get',
          data: {
            userId: userData.value.userId,
            articleId: articleData.value.articleId
          },
        }).then(r => {
          isStared.value = r.data.data
        })
      },

      clickLike() {
        isLiked.value = !isLiked.value;
        if (isLiked.value === false){
          store.state.axios({
            url: '/go/like/addLike',
            method: 'post',
            data: {
              userId: userData.value.userId,
              articleId: articleData.value.articleId,
            },
          })
        }else if (isLiked.value === true){
          store.state.axios({
            url: '/go/like/cancelLike',
            method: 'post',
            data: {
              userId: userData.value.userId,
              articleId: articleData.value.articleId,
            },
          })
        }
      },
      clickStar() {
        isStared.value = !isStared.value;
        if (isStared.value === false){
          store.state.axios({
            url: '/go/star/addStar',
            method: 'post',
            data: {
              userId: userData.value.userId,
              articleId: articleData.value.articleId,
            },
          })
        }else if (isStared.value === true){
          store.state.axios({
            url: '/go/star/cancelStar',
            method: 'post',
            data: {
              userId: userData.value.userId,
              articleId: articleData.value.articleId,
            },
          })
        }
      },
      clickComment() {
        store.state.axios({
          url: '/go/comment/createComment',
          method: 'post',
          data: {
            userId: userData.value.userId,
            articleId: articleData.value.articleId,
            commentContent: commentValue,
          },
        })
      },
    }
  },
  mounted() {
    this.getArticleData()
    this.getUserData()
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