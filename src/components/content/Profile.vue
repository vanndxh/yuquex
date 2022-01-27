<template>
  <n-layout>
    <n-layout-header>
      <tabBar></tabBar>
    </n-layout-header>
    <n-layout-content>
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
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to=userData.articleAmount />
                <template #suffix>
                  篇文章
                </template>
              </n-statistic>
              <n-statistic tabular-nums>
                <n-icon size="20"><LikeOutlined/></n-icon>共收获
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to=userData.likeTotal />
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

              </n-tab-pane>
              <n-tab-pane name="teams" tab="知识小组">

              </n-tab-pane>
              <n-tab-pane name="Favorites" tab="收藏夹">

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



export default {
  name: "Profile",
  components: {
    tabBar, BookOutline, LikeOutlined
  },
  setup() {

    return {
      userData: {
        username: "Vanndxh",
        userInfo: "暂无",
        articleAmount: 23,
        likeTotal: 24,
      }
    }
  }
}
</script>

<style scoped>
.user{
  text-align: center;
  font-size: 28px;
}
</style>