<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi offset="6" span="12">
      <n-card>
        <n-tabs default-value="recommend" justify-content="space-evenly" type="line">

          <n-tab-pane name="follow" tab="关注">
            <div v-if="followArticleData.length === 0">
              <h3 class="zwdt">暂无动态~</h3>
            </div>
            <n-list>
              <n-list-item v-for="item in followArticleData" :key="item">
                <n-card hoverable>
                  <n-space>
                    <h2 style="line-height: 0" @click="lookDetail(item.ArticleId)">{{ item.ArticleName }}</h2>
                    <div style="line-height: 32px" v-if="item.Hot > 5">
                      <n-tag type="error" size="small">火</n-tag>
                    </div>
                    <div v-if="item.isToday" style="line-height: 32px">
                      <n-tag type="info" size="small">新</n-tag>
                    </div>
                  </n-space>
                  <p>{{ item.ArticleContent.slice(0, 30) }}</p>
                  <n-grid :col="24">
                    <n-gi :span="21">
                      <n-space>
                        <n-icon size="small" style="line-height: 55px"><PersonOutline /></n-icon>
                        <p>{{ item.AuthorName}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><BookOutline /></n-icon>
                        <p>{{ item.ViewAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><LikeOutlined /></n-icon>
                        <p>{{ item.LikeAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><StarOutlined /></n-icon>
                        <p>{{ item.CollectionAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><TimeOutline /></n-icon>
                        <p>{{ item.Time }}</p>
                      </n-space>
                    </n-gi>
                    <n-gi :span="3">
                      <div style="line-height: 55px;">
                        <n-button @click="lookDetail(item.ArticleId)" size="small">查看详情</n-button>
                      </div>
                    </n-gi>
                  </n-grid>

                </n-card>
              </n-list-item>
            </n-list>
          </n-tab-pane>

          <n-tab-pane name="recommend" tab="推荐">
            <n-space justify="right">
              <n-button @click="recRandom"><n-icon><RefreshOutline /></n-icon>换一批</n-button>
            </n-space>
            <n-list>
              <n-list-item v-for="item in recommendArticleDataReal" :key="item">
                <n-card hoverable>
                  <n-space>
                    <h2 style="line-height: 0" @click="lookDetail(item.ArticleId)">{{ item.ArticleName }}</h2>
                    <div style="line-height: 32px" v-if="item.Hot > 5">
                      <n-tag type="error" size="small">火</n-tag>
                    </div>
                    <div v-if="item.IsToday" style="line-height: 32px">
                      <n-tag type="info" size="small">新</n-tag>
                    </div>
                  </n-space>
                  <p>{{ item.ArticleContent.slice(0, 30) }}</p>
                  <n-grid :col="24">
                    <n-gi :span="21">
                      <n-space>
                        <n-icon size="small" style="line-height: 55px"><PersonOutline /></n-icon>
                        <p>{{ item.AuthorName}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><BookOutline /></n-icon>
                        <p>{{ item.ViewAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><LikeOutlined /></n-icon>
                        <p>{{ item.LikeAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><StarOutlined /></n-icon>
                        <p>{{ item.CollectionAmount}}</p>
                        <div style="line-height: 45px"><n-divider vertical></n-divider></div>
                        <n-icon size="small" style="line-height: 55px"><TimeOutline /></n-icon>
                        <p>{{ item.Time }}</p>
                      </n-space>
                    </n-gi>
                    <n-gi :span="3">
                      <div style="line-height: 55px;">
                        <n-button @click="lookDetail(item.ArticleId)" size="small">查看详情</n-button>
                      </div>
                    </n-gi>
                  </n-grid>

                </n-card>
              </n-list-item>
            </n-list>
          </n-tab-pane>

        </n-tabs>
      </n-card>
    </n-gi>
    <n-gi :span="6">
      <el-backtop :visibility-height="10"/>
    </n-gi>
  </n-grid>


</template>

<script>
import tabBar from "@/components/common/tabBar";
import {useStore} from "vuex";
import { ref } from "vue";
import {useRouter} from "vue-router";
import {useMessage} from "naive-ui";
import { PersonOutline, BookOutline, TimeOutline, RefreshOutline } from "@vicons/ionicons5";
import { LikeOutlined, StarOutlined } from "@vicons/antd";

export default {
  components:{
    tabBar, PersonOutline, BookOutline, LikeOutlined, StarOutlined, TimeOutline, RefreshOutline
  },
  setup() {
    const message = useMessage()
    const router = useRouter()
    const store = useStore()

    const followArticleData = ref([])
    const recommendArticleData = ref([])
    const recommendArticleDataReal = ref([])
    const last = ref([])

    return {
      followArticleData, recommendArticleData, recommendArticleDataReal, last,

      lookDetail(id) {
        store.state.aid = id
        router.push('ArticleInfo')
      },
      getFollowArticle() {
        if (store.state.uid <= 0) {
          message.error("您尚未登录！关注动态无法查看！")
        } else {
          store.state.axios({
            url: '/go/article/getFollowArticles',
            method: 'get',
            params: {
              userId: store.state.uid
            }
          }).then(r => {
            followArticleData.value = r.data.data
            for (let i in r.data.data) {
              let now = new Date()
              let date = new Date(r.data.data[i].Time)
              r.data.data[i].isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDay() === now.getDay()
              r.data.data[i].Time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "  " + date.getHours()+ ":" + date.getMinutes();
            }
          })
        }
      },
      getHotArticle() {
        store.state.axios({
          url: '/go/article/getHotArticles',
          method: 'get',
        }).then(r => {
          recommendArticleData.value = r.data.data
          for (let i in r.data.data) {
            let now = new Date()
            let date = new Date(r.data.data[i].Time)
            r.data.data[i].Time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "  " + date.getHours()+ ":" + date.getMinutes();
            r.data.data[i].IsToday = date.getFullYear() == now.toLocaleDateString().split('/')[0] && (date.getMonth()+1) == now.toLocaleDateString().split('/')[1] && date.getDate() == now.toLocaleDateString().split('/')[2]
          }
          this.recRandom()
        })
      },
      recRandom() {
        // 计算三个流量池容量
        let n = recommendArticleData.value.length
        let aAmount = parseInt(n/10)
        let bAmount = parseInt(n/10*3)
        let cAmount = n-aAmount-bAmount
        // 随机获取a
        let a = parseInt(Math.random()*aAmount)
        while(last.value.indexOf(a) >= 0) {
          a = parseInt(Math.random()*aAmount)
        }
        last.value[0] = a
        // b
        let b1 = parseInt(Math.random()*bAmount + aAmount)
        while(last.value.indexOf(b1) >= 0) {
          b1 = parseInt(Math.random()*bAmount + aAmount)
        }
        let b2 = parseInt(Math.random()*bAmount + aAmount)
        while(b2 == b1 || last.value.indexOf(b2) >= 0) {
          b2 = parseInt(Math.random()*bAmount + aAmount)
        }
        let b3 = parseInt(Math.random()*bAmount + aAmount)
        while (b3 == b1 || b3 == b2 || last.value.indexOf(b3) >= 0) {
          b3 = parseInt(Math.random()*bAmount + aAmount)
        }
        last.value[1] = b1
        last.value[2] = b2
        last.value[3] = b3
        // c
        let c = parseInt(Math.random()*cAmount + aAmount + bAmount)
        while(last.value.indexOf(c) >= 0) {
          c = parseInt(Math.random()*cAmount + aAmount + bAmount)
        }
        last.value[4] = c
        // 数据搬运
        recommendArticleDataReal.value[0] = recommendArticleData.value[a]
        recommendArticleDataReal.value[1] = recommendArticleData.value[b1]
        recommendArticleDataReal.value[2] = recommendArticleData.value[b2]
        recommendArticleDataReal.value[3] = recommendArticleData.value[b3]
        recommendArticleDataReal.value[4] = recommendArticleData.value[c]
      },
    }
  },
  mounted() {
    this.getHotArticle()
    this.getFollowArticle()
  }
}
</script>

<style scoped>
.zwdt {
  text-align: center;
}
</style>