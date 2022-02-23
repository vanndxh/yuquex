<template>
  <tabBar></tabBar>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">
      <br>
      <div>
        <n-button @click="readAll">全部已读</n-button>
      </div>
      <n-list>
        <n-list-item v-for="item in messageData" :key="item">
          <n-card hoverable>
            {{ item.Op }} {{ item.Type }} 了您的文章《 {{ item.ArticleId }} 》
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
    const getMessages = () => {
      store.state.axios({
        url: '/go/message/getMessages',
        method: 'get',
        params: {
          userId: store.state.uid
        }
      }).then(r => {
        messageData.value = r.data.data
        if(r.data.data.length === 0) {
          message.info("暂无信息~")
        }
      }).catch(e => {
        message.error("error!")
        console.log(e);
      })
    }

    return {
      messageData,
      getMessages,

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
      }
    }
  },
  mounted() {
    this.getMessages()
  }
}
</script>

<style scoped>

</style>