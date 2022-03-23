<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">
      <br>
      <n-space>
        <n-button @click="readAll">全部已读</n-button>
        <n-select v-model:value="messageValue1" :options="messageOptions1" :consistent-menu-width="false" style="width: 160px;"
        @update:value="changeType" placeholder="选择是否已读"/>
        <n-select v-model:value="messageValue2" :options="messageOptions2" :consistent-menu-width="false" style="width: 160px;"
                  @update:value="changeType" placeholder="选择消息类型"/>
      </n-space>
      <n-list>
        <n-list-item v-for="item in messageData" :key="item">
          <n-card hoverable>
            {{ item.Content }}
            <n-grid :col="24">
              <n-gi :span="22">
                <div style="line-height: 30px;font-size: 13px;color: darkgray">
                  <n-time :time="new Date(item.Time)" format="yyyy-MM-dd hh:mm"/>
                </div>
              </n-gi>
              <n-gi :span="2">
                <n-button v-if="item.Read === 1" size="small" @click="read(item.MessageId)" type="info" ghost>已读</n-button>
              </n-gi>
            </n-grid>
          </n-card>
        </n-list-item>
      </n-list>
    </n-gi>
  </n-grid>
  <el-backtop />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useMessage} from "naive-ui";
import tabBar from "@/components/common/tabBar";
// use
const message = useMessage()
const store = useStore()
// state
const messageData = ref([])
const messageValue1 = ref(null)
const messageValue2 = ref(null)
const messageOptions1 = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '未读',
    value: '1'
  },
  {
    label: '已读',
    value: '2'
  },
]
const messageOptions2 = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '点赞',
    value: '1'
  },
  {
    label: '收藏',
    value: '2'
  },
  {
    label: '评论',
    value: '3'
  },
  {
    label: '关注',
    value: '4'
  },
  {
    label: '其他',
    value: '5'
  }
]
// method
const getMessages = (handle1, handle2) => {
  store.state.axios({
    url: '/go/message/getMessages',
    method: 'get',
    params: {
      userId: store.state.uid,
      handle1: handle1,
      handle2: handle2,
    }
  }).then(r => {
    messageData.value = r.data.data
    if(r.data.data.length === 0) {
      message.info("暂无信息~")
    }
  })
}
const read = (id) => {
  let formData = new FormData()
  formData.set('messageId', id)
  store.state.axios({
    url: '/go/message/readMessage',
    method: 'post',
    data: formData
  }).then(() => {
    message.success("已读~")
    getMessages(messageValue1.value, messageValue2.value)

  })
}
const readAll = () => {
  let formData = new FormData()
  formData.set('userId', store.state.uid)
  store.state.axios({
    url: '/go/message/readAllMessages',
    method: 'post',
    data: formData
  }).then(() => {
    message.success("全部已读~")
    getMessages(messageValue1.value, messageValue2.value)
  })
}
const changeType = () => {
  getMessages(messageValue1.value, messageValue2.value)
}
// lifecycle
onMounted(() => {
  getMessages(0, 0)
})
</script>

<style scoped>

</style>