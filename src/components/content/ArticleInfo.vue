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
                    <h4 style="text-align: center">{{ articleData.LikeAmount }}</h4>
                    <n-icon size="40" v-if="!isLiked" @click="clickLike()"><LikeOutlined /></n-icon>
                    <n-icon size="40" v-else @click="clickLike()"><LikeFilled /></n-icon>
                  </n-space>
                </n-gi>
                <n-gi span="1" offset="8">
                  <n-space justify="center">
                    <h4 style="text-align: center">{{ articleData.StarAmount }}</h4>
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
                <h1 class="user">{{ articleData.ArticleAuthor }}</h1>
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
import {useMessage} from "naive-ui";

export default {
  components: {
    tabBar, tabBarS, LikeOutlined, LikeFilled, StarOutlined, StarFilled
  },
  setup() {
    const message = useMessage()
    const store = useStore()

    const isLiked = ref(false)
    const isStared = ref(false)
    const commentValue = ref(null)
    const articleData = ref(null)
    const userData = ref(null)

    return {
      isLiked, isStared, commentValue, articleData, userData,

      getUserData() {
        let formData = new FormData()
        formData.set('userId', store.state.uid)
        store.state.axios({
          url: '/go/user/getUserInfo',
          method: 'post',
          data: formData,
        }).then(r => {
          userData.value = r.data.data
        })
      },
      getArticleData() {
        let formData = new FormData()
        formData.set('articleId', store.state.aid)
        store.state.axios({
          url: '/go/article/getArticleInfo',
          method: 'post',
          data: formData,
        }).then(r => {
          console.log(r.data.data);

          articleData.value = r.data.data
        })
      },
      getIsLiked() {
        let formData = new FormData()
        formData.set('articleId', store.state.aid)
        formData.set('userId', store.state.uid)
        store.state.axios({
          url: '/go/like/judgeIsLiked',
          method: 'post',
          data: formData,
        }).then(r => {
          isLiked.value = r.data.data
        })
      },
      getIsStared() {
        let formData = new FormData()
        formData.set('articleId', store.state.aid)
        formData.set('userId', store.state.uid)
        store.state.axios({
          url: '/go/star/judgeIsStared',
          method: 'post',
          data: formData,
        }).then(r => {
          isStared.value = r.data.data
        })
      },

      clickLike() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else {
          isLiked.value = !isLiked.value;
          if (isLiked.value === false){
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/like/addLike',
              method: 'post',
              data: formData,
            })
          }else if (isLiked.value === true){
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/like/cancelLike',
              method: 'post',
              data: formData,
            })
          }
        }

      },
      clickStar() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else {
          isStared.value = !isStared.value;
          if (isStared.value === false){
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/star/addStar',
              method: 'post',
              data: formData,
            })
          }else if (isStared.value === true){
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            store.state.axios({
              url: '/go/star/cancelStar',
              method: 'post',
              data: formData,
            })
          }
        }

      },
      clickComment() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else {
          if (commentValue.value === null){
            message.error("不能评论空！")
          } else {
            let formData = new FormData()
            formData.set('userId', store.state.uid)
            formData.set('articleId', store.state.aid)
            formData.set('commentContent', commentValue)
            store.state.axios({
              url: '/go/comment/createComment',
              method: 'post',
              data: formData,
            }).then(() => {
              message.success("评论成功！")
              commentValue.value = null
            })
          }
        }
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