<template>
  <div class="home">
    <n-layout>
      <!--顶部栏-->
      <tabBar></tabBar>
      <!--侧边栏以及主要内容-->
      <n-layout has-sider>
        <!--侧边栏-->
        <n-layout-sider content-style="padding: 24px;">
          <tabBarS></tabBarS>
          <catgif></catgif>
        </n-layout-sider>
        <!--主要内容-->
        <n-layout-content content-style="padding: 24px;">

          <n-grid :col="24">
            <n-gi :span="20" :offset="1">
              <div class="content">
                <n-card>
                  <n-calendar
                      @update:value="handleUpdateValue"
                      #="{ year, month, date }"
                      v-model:value="value"
                  >
                    {{ year }}-{{ month }}-{{ date }}
                  </n-calendar>
                </n-card>
              </div>
            </n-gi>
          </n-grid>

        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
  <!--用户须知-->
  <n-modal v-model:show="showUserInstruction">
    <n-card
        style="width: 800px;"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <h1>用户须知</h1>
      <h2>(一) 关于用户</h2>
      <h4>1.用户注册注意事项</h4>
      <p>您在注册内容时，必须：<br>
        (1) 提供真实、准确、完整、最新的资料；<br>
        (2) 不断更新您的资料，以符合上述要求；<br>
        注意：若您提供的资料存在任何错误、不实、过时或不完整的情况，或者小黑屋有合理理由认为您的资料存在上述问题，则有权自行暂停或终止您的帐号，并拒绝您现在或将来使用本服务（全部或部分），直至问题得以解决。<br>
        (3) 严守个人注册名、帐号及密码；<br>
        注意：小黑屋要求您严格保守个人注册名及密码。任何由于您个人原因泄露注册名及密码，并由此引发的一切后果均由您个人完全负责。 同时，如果您发现任何人未经授权使用您的注册名或密码，或发生违反保密规定的任何其它情况，请立即通知小黑屋做出紧急处理；并确保您在每次上网操作中，均以正确步骤退出网站。小黑屋不能对因您未能遵守本协议规定而发生的任何损失负责。<br>
      </p>
      <h4>2. 用户责任</h4>
      (1) 您在使用服务时，必须遵守中《中华人民共和国保密法》、《中华人民共和国版权法》、《计算机信息系统国际联网保密管理规定》、《中华人民共和国计算机信息系统安全保护条例》、《计算机信息网络国际联网安全保护管理办法》、《中华人民共和国计算机信息网络国际联网管理暂行规定》及其实施办法等相关法律法规的任何及所有的规定。<br>
      注意：如果小黑屋有合理理由认为您的行为可能违反相关法律、法规、规章及条例，小黑屋可以在任何时候，不经事先通知终止向您提供服务。<br>
      (2) 关于你的资料的规定：<br>
      a. 您向小黑屋提交的信息必须是真实、完整和有效的；<br>
      b. 不涉及欺诈、伪造、盗窃等项犯罪行为；<br>
      c. 不会构成对任何第三者权益的损害，包括物权，或版权、专利、商标、商业秘密或其他知识产权，隐私权、名誉权等；<br>
      d. 不会违反任何法律、法规、条例或规章 (包括但不限于关于规范出口管理、贸易配额、保护消费者、不正当竞争或虚假广告的法律、法规、条例或规章)；<br>
      e. 不会含有任何诽谤（包括商业诽谤）、侮辱、恐吓或非法骚扰的内容；<br>
      f. 不会含有任何淫秽、暴力及儿童色情内容；<br>
      g. 不会含有任何蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序。<br>
      <h4>3.用户隐私制度</h4>
      本公司承诺，在未经您合法授权时不会对外公开、编辑或透露您的注册信息及保存在小黑屋中的非公开内容，除非有下列情况：<br>
      (1) 有关法律规定或小黑屋合法服务程序规定；<br>
      (2) 在紧急情况下，为维护您及公众的权益；<br>
      <h2>(二) 免责声明</h2>
      (1) 小黑屋不保证服务一定会满足用户的使用要求，也不保证服务不会受中断，且适时、安全和不带任何错误；对服务的及时性、安全性、准确性以及最终获取的结果的准确、可靠程度也不作担保。<br>
      (2) 小黑屋对于您与其他用户之间在交易过程中所涉及商品的质量、安全、服务、合法性、产生的一切费用、商贸信息的真实性、准确性、完整性，以及交易各方是否履行其在贸易协议中的相应义务，不负有任何责任。<br>
      (3) 您的资料，包括您在注册、交易或列举商品等过程中，向小黑屋或其他用户提供的任何资料，如：数据、文本、软件、音像、图片及其他材料等，均是真实可靠的，并对其负有完全责任；小黑屋对由此引起的一切后果不负有任何法律责任。但是，如果小黑屋有理由认为您的资料可能使其承担任何法律或道义上的责任，或可能使其(全部或部分地) 失去互联网服务供应商或其他供应商的服务，则小黑屋有权自行决定对您的资料采取任何被认为必要或适当的决定（包括但不限于删除该类资料）。<br>
      (4) 小黑屋不对链接到其网站的其他网站的资源、信息、产品或服务的真实性、准确性和完整性负责，因此对于任何因信赖或使用此类网站上的信息资源、产品或服务，而给用户造成任何直接或间接损失，小黑屋均不承担责任。<br>
      (5) 为了维护广大个人消费者及个人用户的合法权益，我公司只保证小黑屋网站www.vanndxh.ltd的服务质量。<br>
      (6) 我公司仅通过小黑屋网站www.vanndxh.ltd面向个人用户的产品和服务，反对私下转让、买卖小黑屋知识服务平台的产品和服务。<br>
      (7) 对于在合理控制力以外发生的事件，包括自然灾害、罢工、骚乱、物质短缺、暴动、战争、政府行为、通讯及其他设施故障等一切非人力可抗拒的因素，导致小黑屋延迟或未能履行协议的，小黑屋不承担任何责任及其损失。<br>
      <h2>(三) 小黑屋的知识产权及其他权利</h2>
      <p>(1) 小黑屋对服务及服务所使用的软件包含受知识产权或其他法律保护的资料享有相应的权利；<br>
        (2) 经由服务传送的资讯及内容，受到著作权法、商标法、专利法或其他法律的保护；未经小黑屋明确授权许可，用户不得进行复制、修改、出租、散布或衍生其他作品，或用以商业性目的。<br>
        (3) 小黑屋字样，以及与小黑屋相关的设计图样、标识、产品及其服务名称，任何人不得使用、复制或用作其他用途。<br>
        注意：如果您认为自己或他人的版权、著作权或其他合法权益在本网上受到他人侵害，请立即与小黑屋联系,并提供相关证据。</p>
    </n-card>
  </n-modal>

</template>

<script setup>
import {h, onMounted, ref} from "vue";
import { addDays } from 'date-fns'
import {NButton, useMessage, useNotification} from "naive-ui";
import {useStore} from "vuex";
import tabBar from "@/components/common/tabBar";
import tabBarS from "@/components/common/tabBarS";
import catgif from "@/components/common/catGif"
// use
const message = useMessage()
const notification = useNotification()
const store = useStore()
// reactive state
const noticeContent = ref()
const noticeTime = ref()
const showUserInstruction = ref(false)
const value = ref(addDays(Date.now(), 1).valueOf())
// method
const welcome = () => {
  if (store.state.uid <= 0) {
    // 没登录x
    const n = notification.info({
      title: '小黑屋',
      content: noticeContent.value,
      meta: noticeTime.value,
      action: () => h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              n.destroy()
              message.info("登录后本消息不再弹出~")
            }
          },
          {
            default: () => '朕知道了~'
          }
      ),
      onClose: () => {
        message.info("登录后本消息不再弹出~")
      }
    })
  } else {
    // 登录了，就判定一下
    store.state.axios({
      url: '/go/user/getUserInfo',
      method: 'get',
      params: {
        userId: store.state.uid
      }
    }).then(r => {
      if (r.data.data.ReadNotice != 1) {
        const n = notification.info({
          title: '小黑屋',
          content: noticeContent.value,
          meta: noticeTime.value,
          action: () => h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  n.destroy()
                  let formData = new FormData()
                  formData.set("userId", store.state.uid)
                  store.state.axios({
                    url: '/go/user/readNotice',
                    method: 'post',
                    data: formData,
                  })
                }
              },
              {
                default: () => '朕知道了~'
              }
          ),
          onClose: () => {
            message.info("点击'朕知道了'下次不再弹出~")
          }
        })
      }
    })
  }
}
const handleUpdateValue = () => {}
const getNotice = () => {
  store.state.axios({
    url: '/go/notice/getNotice',
    method: 'get',
  }).then(r => {
    noticeContent.value = r.data.data.NoticeContent
    let date = new Date(r.data.data.Time)
    noticeTime.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes()
    welcome()
  })
}

// lifecycle
onMounted(() => {
  getNotice()
})
</script>

<style scoped>
.content {
  text-align: center;
}
</style>