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
              <n-input v-model:value="articleData.articleName" type="text" placeholder="标题" size="large"
                       maxlength="20" show-count/>
              <n-input
                  v-model:value="articleData.articleContent"
                  type="textarea"
                  placeholder="正文"
                  size="small"
                  :autosize="{minRows: 20,maxRows: 30}"
                  maxlength="200" show-count
              />
              <n-button type="success" class="save">保存</n-button>
            </n-space>
          </n-gi>
          <n-gi span="6" offset="1">
            <n-card hoverable>
              <h4>你也可以直接</h4>
              <n-space justify="center">
                <n-upload
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    :headers="{'naive-info': 'hello!'}"
                    :data="{'naive-data': 'cool! naive!'}"
                >
                  <n-button>上传文件</n-button>
                </n-upload>
              </n-space>
              <h4>或者</h4>
              <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                        @before-upload="beforeUpload">
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
import { ref, } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'


export default {
  name: "Create",
  components: {
    tabBar, tabBarS, ArchiveIcon
  },
  setup() {

    return {
      articleData: ref({
        articleName: null,
        articleContent: null
      }),
      async beforeUpload ({ file }) {
        if (file.file.type !== 'docx') {
          console.log('error');
          return false
        }
        return true
      }
    }
  }
}
</script>

<style scoped>
.save{
  float: right;
  width: 80px;
}
</style>