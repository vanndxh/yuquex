<template>
  <n-layout>
    <n-layout-header>
      <tabBar></tabBar>
    </n-layout-header>
    <n-layout-content style="background-color: rgb(250,250,250)">
      <br>
      <n-grid :col="24" x-gap="12">
        <n-gi offset="5" span="5">
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
              <h1 class="user">{{ userData.username }}</h1>
              <n-space justify="center">
                <n-button style="">编辑资料</n-button>
              </n-space>
              <p>{{ userData.userInfo }}</p>
            </n-card>
            <n-card hoverable>
              <n-statistic tabular-nums>
                <n-icon size="20"><BookOutline/></n-icon>共有
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to=userData.ArticleAmount />
                <template #suffix>
                  篇文章
                </template>
              </n-statistic>
              <n-statistic tabular-nums>
                <n-icon size="20"><LikeOutlined/></n-icon>共收获
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to=userData.LikeTotal />
                <template #suffix>
                  个赞
                </template>
              </n-statistic>
            </n-card>
          </n-space>
        </n-gi>
        <n-gi span="9">
          <n-card hoverable>
            <n-tabs type="line">
              <n-tab-pane name="articles" tab="文档">
                <n-data-table :columns="columns" :data="data1" :pagination="pagination" size="small"/>
              </n-tab-pane>
              <n-tab-pane name="teams" tab="知识小组">
                <n-data-table :columns="columns2" :data="data2" :pagination="pagination" size="small"/>
              </n-tab-pane>
              <n-tab-pane name="Favorites" tab="收藏夹">
                <n-data-table :columns="columns" :data="data3" :pagination="pagination" size="small"/>
              </n-tab-pane>
            </n-tabs>
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

export default {
  components: {
    tabBar, BookOutline, LikeOutlined
  },
  setup() {
    const message = useMessage()
    const store = useStore()

    const userData = ref(null)
    const data1 = ref(null)
    const data2 = ref(null)
    const data3 = ref(null)
    const createColumns = ({ lookDetail }) => {
      return [
        {
          key: 'articleName',
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
          key: 'teamName',
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

    const getArticles = () => {
      if (store.state.uid === 0) {
        message.error("您尚未登录！")
      } else {
        let formData = new FormData()
        formData.set("articleAuthor", store.state.uid)
        formData.set('isInTrash', "0")

        store.state.axios({
          url: '/go/article/getArticles',
          method: 'post',
          data: formData
        }).then(r => {
          data1.value = r.data.data
        })
      }
    }
    const getTeams = () => {
      if (store.state.uid === 0) {
        message.error("您尚未登录！")
      } else {
        let formData = new FormData()
        formData.set('userId', store.state.uid)

        store.state.axios({
          url: '/go/team/getTeams',
          method: 'post',
          data: formData,
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
        let formData = new FormData()
        formData.set('userId', store.state.uid)

        store.state.axios({
          url: '/go/star/getFavorite',
          method: 'post',
          data: formData,
        }).then(r => {
          data3.value = r.data.data
        }).catch(() => {
          message.error("获取收藏夹出错！")
        })
      }
    }

    return {
      data1, data2, data3, userData,
      getTeams, getArticles, getFavorite,

      columns: createColumns({
        lookDetail (rowData) {
          console.log(rowData);
        }
      }),
      columns2: createColumns2({
        lookDetail (rowData) {
          console.log(rowData);
        }
      }),
      pagination: {
        pageSize: 10
      },
      getUserData() {
        let formData = new FormData()
        formData.set("userId", store.state.uid)
        store.state.axios({
          url: '/go/user/getUserInfo',
          method: 'post',
          data: formData,
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
  }
}
</script>

<style scoped>
.user{
  text-align: center;
  font-size: 28px;
}
</style>