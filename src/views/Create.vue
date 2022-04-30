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
        <n-grid :col="24">
          <n-gi span="15">
            <n-space vertical>
              <n-input v-model:value="newArticleName" type="text" placeholder="标题" size="large"
                       maxlength="15" show-count/>
              <n-space>
                <p style="line-height: 0">标签：</p>
                <n-dynamic-tags v-model:value="tags" :max="3" type="success">
                  <template #trigger="{ activate, disabled }">
                    <n-button
                        size="small"
                        type="primary"
                        dashed
                        :disabled="disabled"
                        @click="activate()"
                    >
                      <template #icon>
                        <n-icon><Add /></n-icon>
                      </template>
                      添加
                    </n-button>
                  </template>
                </n-dynamic-tags>
              </n-space>

              <div class="editor">
                <Quill-editor
                    id="toolbar"
                    v-model:content="newArticleContent"
                    contentType="html"
                    :options="editorOption"
                >
                </Quill-editor>
              </div>
              <br><br>
              <div>
                <n-button type="success" class="save" @click="createArticle()">保存</n-button>
              </div>
            </n-space>
          </n-gi>
          <n-gi span="8" :offset="1">
            <n-card hoverable>
              <h4>你也可以直接</h4>
              <el-upload
                  drag
                  with-credentials
                  name="upfile"
                  action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
                  :on-success="parseText"
                  :before-upload="checkExt"
                  :on-preview="parseTextAgain"
                  :on-error="handleError"
              >
                <el-icon class="el-icon--upload" size="50px"><upload-filled /></el-icon>
                <div class="el-upload__text" style="font-size: 16px">
                  点击或者拖动文件到该区域来上传
                </div>
                <n-p depth="3" style="margin: 8px 0 0 0">
                  请不要上传敏感数据! 文件格式目前只支持txt！
                </n-p>
              </el-upload>
              <n-divider />
              <n-input
                  v-model:value="parseTextContent"
                  type="textarea"
                  placeholder="上传txt文件可以自动解析到这哦~"
                  size="small"
                  :autosize="{minRows: 10,maxRows: 10}"
                  maxlength="2000" show-count
              />
            </n-card>
          </n-gi>
        </n-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from "vuex";
import {useMessage} from "naive-ui";
import {useRouter} from "vue-router";
import { UploadFilled } from '@element-plus/icons-vue'
import Add from "@vicons/ionicons5/Add";
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
// use
const router = useRouter()
const message = useMessage()
const store = useStore()
// state
const parseTextContent = ref("")
const newArticleName = ref(null)
const newArticleContent = ref("")
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
const editorOption = {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
      placeholder: '请输入正文~'
}
// tag
const tags = ref([])
// method
const createArticle = () => {
  if (store.state.uid === 0){
    message.error("您尚未登录！")
  } else if (newArticleName.value === null){
    message.error("文章名不能为空！")
  } else if (newArticleName.value.indexOf(" ") !== -1 || newArticleName.value.indexOf("　") !== -1) {
    message.error("文章名不能含空格！")
  } else {
    let tag = ""
    tags.value.forEach(i => {
      tag = tag + i + ","
    })
    tag = tag.slice(0, tag.length-1)
    let formData = new FormData()
    formData.set('articleName', newArticleName.value)
    formData.set('articleContent', newArticleContent.value)
    formData.set('articleAuthor', store.state.uid)
    formData.set('tag', tag)

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
}
const judgeIsLogged = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  }
}
const checkExt = (file) => {
  if (file.name.split('.')[1] !== "txt") {
    message.error("只能上传txt文件！")
    return false
  }
  return true
}
const parseText = (res, file) => {
  if (file.raw) {
    const reader = new FileReader()
    reader.readAsText(file.raw);
    reader.onload = e => {
      parseTextContent.value = e.target.result.slice(0,2000)
      message.success("自动解析成功！")
    }
  }
}
const parseTextAgain = (file) => {
  if (file.raw) {
    const reader = new FileReader()
    reader.readAsText(file.raw);
    reader.onload = e => {
      parseTextContent.value = e.target.result.slice(0,2000)
      message.success("自动解析成功！")
    }
  }
}
const handleError = () => {
  message.error("自动解析失败，请上传正常文件！")
}
// lifecycle
onMounted(() => {
  judgeIsLogged()
})
</script>

<style scoped>
.save{
  float: right;
  width: 80px;
}
.editor {
  height: 420px;
}
</style>