<template>
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
          <n-gi span="16">
            <n-space vertical>
              <n-input v-model:value="newArticleName" type="text" placeholder="标题" size="large"
                       maxlength="15" show-count/>
              <n-input
                  v-model:value="newArticleContent"
                  type="textarea"
                  placeholder="正文"
                  size="small"
                  :autosize="{minRows: 20,maxRows: 30}"
                  maxlength="200" show-count
              />
              <n-button type="success" class="save" @click="createArticle()">保存</n-button>
            </n-space>
          </n-gi>
          <n-gi span="6" offset="1">
            <n-card hoverable>
              <h4>你也可以直接</h4>
              <n-space justify="center">
                <n-upload
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    @before-upload="beforeUpload" @finish="handleFinish">
                  <n-button>上传文件</n-button>
                </n-upload>
              </n-space>
              <h4>或者</h4>
              <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        @before-upload="beforeUpload" @finish="handleFinish">
                <n-upload-dragger>
                  <div style="margin-bottom: 12px;">
                    <n-icon size="48" :depth="3">
                      <archive-icon />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px;">点击或者拖动文件到该区域来上传</n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0;">
                    请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                  </n-p>
                </n-upload-dragger>
              </n-upload>

              <n-button @click="readFile">上传文件</n-button>
            </n-card>
          </n-gi>
        </n-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import { ref } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import {useStore} from "vuex";
import {useMessage} from "naive-ui";
import {useRouter} from "vue-router";

export default {
  components: {
    tabBar, tabBarS, ArchiveIcon
  },
  setup() {
    const router = useRouter()
    const message = useMessage()
    const store = useStore()

    const newArticleName = ref(null)
    const newArticleContent = ref(null)
    const articleData = ref({
      articleName: null,
      articleContent: null
    })
    const handleFinish = ({file}) => {
      message.info("上传成功，但是自动解析功能未实装！")
      // file的Blob
      console.log(file.name);
      console.log(file);
      console.log(typeof (file.file));
      let fileBlob = new Blob([file.name], {type: 'application/msword'})
      console.log(fileBlob);

      // 能正常使用的测试Blob
      var debug = {hello: "world"};
      var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
      console.log(blob);

      const reader = new FileReader()
      reader.readAsText(fileBlob, 'GB2312');
      reader.onload = e => {
        console.log(e.target.result);
      }
    }

    return {
      articleData, newArticleName, newArticleContent,
      handleFinish,

      async beforeUpload ( data ) {
        if (data.file.file?.type !== "application/msword" && data.file.file?.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          message.error("只能上传doc或者docx文件！")
          return false
        }
        return true
      },
      createArticle() {
        if (store.state.uid === 0){
          message.error("您尚未登录！")
        } else if (newArticleName.value === null){
          message.error("文章名不能为空！")
        } else if (newArticleName.value.indexOf(" ") !== -1 || newArticleName.value.indexOf("　") !== -1) {
          message.error("文章名不能含空格！")
        } else {
          let formData = new FormData()
          formData.set('articleName', newArticleName.value)
          formData.set('articleContent', newArticleContent.value)
          formData.set('articleAuthor', store.state.uid)

          store.state.axios({
            url: '/go/article/createArticle',
            method: 'post',
            data: formData,
          }).then(r => {
            newArticleName.value = ""
            newArticleContent.value = ""
            message.success("创建文章成功！")
            store.state.aid = r.data.articleId
            router.push("/ArticleInfo")
          }).catch(() => {
            message.error("新建文章出错！")
          })
        }
      },
      judgeIsLogged() {
        if (store.state.uid === 0) {
          message.error("您尚未登录！")
        }
      },
      readFile() {
        let fileSelect = document.querySelector('input[type=file]').files[0]//找到文件上传的元素
        let reader = new FileReader()
        if (typeof FileReader === 'undefined') {
          console.log('您的浏览器不支持FileReader接口')
          return
        }
        reader.readAsText(fileSelect, 'gb2312')//注意读取中文的是用这个编码，不是utf-8
        reader.onload = function(e) {
          console.log(e.target.result);
        }
        console.log(reader)
      }
    }
  },
  mounted() {
    this.judgeIsLogged()
  }
}
</script>

<style scoped>
.save{
  float: right;
  width: 80px;
}
</style>