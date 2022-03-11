<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <!--搜索框条-->
      <n-grid :col="24">
        <n-gi :span="18" :offset="2">
          <n-input v-model:value="searchValue" type="text" placeholder="根据name模糊搜索" :clearable="true"
                   maxlength="20" class="input" size="large" round :autofocus="true"
          @keyup.enter="search()">
            <template #affix>
              <n-icon><SearchOutline /></n-icon>
            </template>
          </n-input>
        </n-gi>
        <n-gi :span="3" :offset="1">
          <n-button type="primary" ghost @click="search()" size="large">搜索</n-button>
        </n-gi>
      </n-grid>
      <br>
      <n-select v-model:value="searchCheck" :options="searchOptions" :consistent-menu-width="false" style="width: 160px;"
                @update:value="search()" placeholder="选择搜索内容"/>
      <br>
      <!--搜索内容-->
      <div v-if="searchCheck === '0' || searchCheck === null">
        <n-data-table :columns="columns1" :data="searchData" :pagination="pagination" size="small"/>
      </div>
      <div v-if="searchCheck === '1'">
        <n-data-table :columns="columns2" :data="searchData" :pagination="pagination" size="small"/>
      </div>
      <div v-if="searchCheck === '2'">
        <n-data-table :columns="columns3" :data="searchData" :pagination="pagination" size="small"/>
      </div>

    </n-gi>
  </n-grid>
</template>

<script>
import tabBar from "../common/tabBar";
import { ref, h } from "vue";
import {SearchOutline} from '@vicons/ionicons5'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {NButton, useMessage} from "naive-ui";

export default {
  components: {
    tabBar, SearchOutline
  },
  setup() {
    const message = useMessage()
    const store = useStore()
    const router = useRouter()

    const isFollowed = ref(null)
    const searchCheck = ref(null)
    const searchValue = ref(null)
    const searchData = ref([])
    const createColumns1 = ({ lookDetail }) => {
      return [
        {
          width: 50
        },
        {
          title: 'Id',
          key: 'ArticleId',
          align: 'center'
        },
        {
          title: '文章名',
          key: 'ArticleName',
          align: 'left'
        },
        {
          title: '作者',
          key: 'AuthorName',
          align: 'center',
          width: 100,
        },
        {
          title: '浏览量',
          key: 'ViewAmount',
          align: 'center',
          width: 80,
        },
        {
          title: '点赞数',
          key: 'LikeAmount',
          align: 'center',
          width: 80,
        },
        {
          title: '收藏数',
          key: 'CollectionAmount',
          align: 'center',
          width: 80,
        },
        {
          title: '查看详情',
          key: 'lookDetail',
          width: 100,
          align: 'right',
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
          width: 50
        }
      ]
    }
    const createColumns2 = ({ follow, unFollow }) => {
      return [
        {
          width: 50
        },
        {
          title: 'Id',
          key: 'UserId',
          width: 80,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'Username',
          width: 100,
          align: 'center'
        },
        {
          title: '文章数',
          key: 'ArticleAmount',
          width: 70,
          align: 'center'
        },
        {
          title: '点赞数',
          key: 'LikeAmount',
          width: 70,
          align: 'center'
        },
        {
          title: '关注',
          key: 'follow',
          width: 100,
          align: 'center',
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
          title: '取消关注',
          key: 'unFollow',
          width: 100,
          align: 'center',
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
    const createColumns3 = ({ lookDetail }) => {
      return [
        {
          width: 50
        },
        {
          title: 'Id',
          key: 'TeamId',
          width: 70,
          align: 'center'
        },
        {
          title: '小组名',
          key: 'TeamName',
          align: 'left'
        },
        {
          title: '组长',
          key: 'LeaderName',
          width: 100,
          align: 'center'
        },
        {
          title: '查看详情',
          key: 'lookDetail',
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
          width: 50
        }
      ]
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

    return {
      searchData, searchValue, searchCheck, isFollowed,
      getIsFollowed,

      columns1: createColumns1({
        lookDetail (rowData) {
          store.state.aid = rowData.ArticleId
          router.push("ArticleInfo")
        }
      }),
      columns2: createColumns2({
        follow (rowData) {
          if (store.state.uid <= 0) {
            message.error("您尚未登录!")
          } else if (store.state.uid == rowData.UserId) {
            message.error("您不能关注您自己！")
          } else {
            getIsFollowed(store.state.uid, rowData.UserId)
            setTimeout(() => {
              if (isFollowed.value) {
                message.error("您已经关注，不能重复关注！")
              } else {
                let formData = new FormData()
                formData.set('up', rowData.UserId)
                formData.set('follower', store.state.uid)
                formData.set('handle', "0")
                store.state.axios({
                  url: '/go/follow/handleFollow',
                  method: 'post',
                  data: formData,
                }).then(() => {
                  message.success("关注成功！")
                }).catch(() => {
                  message.error("error!")
                })
              }
            }, 500)
          }
        },
        unFollow(rowData) {
          if (store.state.uid <= 0) {
            message.error("您尚未登录!")
          } else if (store.state.uid == rowData.UserId) {
            message.error("您不能操作您自己！")
          } else {
            getIsFollowed(store.state.uid, rowData.UserId)
            setTimeout(() => {
              if (!isFollowed.value) {
                message.error("您没有关注该用户，不能取消关注！")
              } else {
                let formData = new FormData()
                formData.set('up', rowData.UserId)
                formData.set('follower', store.state.uid)
                formData.set('handle', "1")
                store.state.axios({
                  url: '/go/follow/handleFollow',
                  method: 'post',
                  data: formData,
                }).then(() => {
                  message.success("取消关注成功！")
                }).catch(() => {
                  message.error("error!")
                })
              }
            }, 500)
          }
        }
      }),
      columns3: createColumns3({
        lookDetail (rowData) {
          store.state.tid = rowData.TeamId
          router.push("TeamInfo")
        }
      }),
      pagination: {
        pageSize: 10
      },
      searchOptions:[
        {
          label: '文章',
          value: '0'
        },
        {
          label: '用户',
          value: '1'
        },
        {
          label: '小组',
          value: '2'
        },
      ],
      searchInit () {
        searchData.value = store.state.searchData
      },
      search() {
        store.state.axios({
          url: '/go/search',
          method: 'get',
          params: {
            searchValue: searchValue.value,
            handle: searchCheck.value
          },
        }).then(r => {
          router.push('search')
          searchData.value = r.data.data
          if (r.data.data.length === 0) {
            message.error("没有找到相关信息！")
          }
        }).catch(() => {})
      }
    }
  },
  mounted() {
    this.searchInit()
  }
}
</script>

<style scoped>
.input{
  width: 92%;
}
</style>