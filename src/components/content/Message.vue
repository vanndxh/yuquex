<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">
      <br>
      <n-space>
        <n-button @click="readAll">全部已读</n-button>
        <n-select v-model:value="messageValue" :options="messageOptions" :consistent-menu-width="false" style="width: 160px;"
        @update:value="changeType"/>
      </n-space>
      <n-list>
        <n-list-item v-for="item in messageData" :key="item">
          <n-card hoverable>
            {{ item.OpName }} {{ item.TypeName }} 了您的文章《 {{ item.ArticleName }} 》
            <n-grid :col="24">
              <n-gi :span="22">
                <div style="line-height: 30px">
                  <n-time :time="new Date(item.Time)" format="yyyy-MM-dd hh:mm"/>
                </div>
              </n-gi>
              <n-gi :span="2">
                <n-button v-if="!item.Read" size="small" @click="read(item.MessageId)" type="info" ghost>已读</n-button>
              </n-gi>
            </n-grid>
          </n-card>
        </n-list-item>
      </n-list>
    </n-gi>
  </n-grid>
  <n-back-top :right="100"/>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import { ref } from "vue";
import {useStore} from "vuex";
import {useMessage} from "naive-ui";

export default {
  components: {
    tabBar
  },
  setup() {
    const message = useMessage()
    const store = useStore()

    const messageData = ref([])
    const messageValue = ref("all")
    const getMessages = (type) => {
      store.state.axios({
        url: '/go/message/getMessages',
        method: 'get',
        params: {
          userId: store.state.uid,
          type: type
        }
      }).then(r => {
        messageData.value = r.data.data
        if(r.data.data.length === 0) {
          message.info("暂无信息~")
        }
      })
    }

    return {
      messageData, messageValue,
      getMessages,


      messageOptions:[
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '已读',
          value: 'yes'
        },
        {
          label: '未读',
          value: 'no'
        },
      ],
      read(id) {
        let formData = new FormData()
        formData.set('messageId', id)
        store.state.axios({
          url: '/go/message/readMessage',
          method: 'post',
          data: formData
        }).then(() => {
          message.success("已读~")
          getMessages()
        })
      },
      readAll() {
        let formData = new FormData()
        formData.set('userId', store.state.uid)
        store.state.axios({
          url: '/go/message/readAllMessages',
          method: 'post',
          data: formData
        }).then(() => {
          message.success("全部已读~")
          getMessages()
        })
      },
      changeType() {
        if (messageValue.value === "all") {
          getMessages(0)
        } else if (messageValue.value === "yes") {
          getMessages(1)
        } else if (messageValue.value === "no") {
          getMessages(2)
        }
      }
    }
  },
  mounted() {
    this.getMessages(0)
  }
}
</script>

<style scoped>

</style>