<template>
  <div>
    <n-layout-header>
      <n-card>
        <n-grid :cols="15" x-gap="20">
          <n-gi span="2">
            <img src="../../assets/img/xhw.png" alt="xhw" width="120" height="40" style="outline: none">
          </n-gi>

          <n-gi span="3" >
            <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
          </n-gi>

          <n-gi span="4">
            <n-space>
              <n-input v-model:value="searchValue" type="text" placeholder="搜索" :clearable="true" maxlength="20" class="input"
                       @keyup.enter="search()">
                <template #affix>
                  <n-icon><SearchOutline /></n-icon>
                </template>
              </n-input>
              <n-button type="primary" ghost @click="search()" style="vertical-align: center">搜索</n-button>
            </n-space>
          </n-gi>

          <n-gi offset="2" :span="2">
            <n-space justify="right">
              <n-popover trigger="hover">
                <template #trigger>
                  <n-icon size="25" style="line-height: 40px" @click="clickCreate">
                    <AddCircleOutline/>
                  </n-icon>
                </template>
                <span>新建文档</span>
              </n-popover>

              <n-badge dot :show="!showRead">
                <div style="all: initial">
                  <n-popover trigger="hover">
                    <template #trigger>
                      <n-icon size="25" style="line-height: 40px" @click="clickMessage">
                        <NotificationsOutline/>
                      </n-icon>
                    </template>
                    <span>消息</span>
                  </n-popover>
                </div>
              </n-badge>

            </n-space>
          </n-gi>

          <n-gi span="2">
            <n-space>
              <n-button v-show="!log === true" @click="clickLog">登录</n-button>
              <n-button v-show="!log === true" @click="clickRegister">注册</n-button>
            </n-space>
            <n-dropdown trigger="hover" @select="handleSelect" :options="avatarOptions">
              <n-avatar
                  v-show="log === true"
                  round
                  size="medium"
                  src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c83d70cf3bc79f3dbeffa8adb8a1cd11728b2914.jpg"
              />
            </n-dropdown>

          </n-gi>

        </n-grid>
      </n-card>
    </n-layout-header>
  </div>

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
  <n-modal v-model:show="showFeedback">
    <n-card
        style="width: 600px;"
        title="提交反馈"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        <n-input v-model:value="feedbackValue" type="textarea" placeholder="Please input~" :clearable="true" maxlength="200" show-count
                 :autosize="{minRows: 3,maxRows: 15}"
                 @keyup.enter="addFeedback()"/>
        <n-button type="primary" ghost @click="addFeedback()" style="float: right">提交</n-button>
      </n-space>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showAdmin">
    <n-card
        style="width: 600px;"
        title="管理员密码"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-space vertical>
        <n-input v-model:value="adminPass" placeholder="Please input~" :clearable="true"
                 @keyup.enter="submit()" type="password"/>
        <n-button type="primary" ghost @click="submit()" style="float: right">确认</n-button>
      </n-space>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showVip">
    <n-card
        style="width: 800px;"
        :bordered="false"
        title="会员服务"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <div>
        您会员到期时间：{{ vipTime }}
      </div>
      <br>
      <n-space>
        <p style="line-height: 0">兑换码</p>
        <n-input v-model:value="code" type="text" style="width: 500px" @keyup.enter="renewVip"/>
        <n-button type="primary" ghost @click="renewVip" style="float: right">兑换</n-button>
      </n-space>
      <p style="font-size: 12px;color: darkgray">目前没有氪金服务，输入"xiaoheizhenshuai"续费一个月，感谢支持！</p>
    </n-card>
  </n-modal>

</template>

<script setup>
import {ref, h, resolveComponent, onMounted,} from 'vue'
import { AddCircleOutline, SearchOutline, NotificationsOutline} from '@vicons/ionicons5'
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import {useDialog, useMessage} from 'naive-ui'
// reactive
const message = useMessage()
const dialog = useDialog()
const router = useRouter()
const store = useStore()
// model_admin
const showAdmin = ref(false)
const adminPass = ref("")
// model_vip
const showVip = ref(false)
const vipTime = ref()
const code = ref()
// model_feedback
const showFeedback = ref(false)
const feedbackValue = ref(null)
// model_ui
const showUserInstruction = ref(false)
// 基础信息初始化
const showRead = ref(true)
const menuOptions = [
  {
    label: () =>
        h(
            resolveComponent('router-link'),
            {
              to: {
                name: 'Home',
              }
            },
            { default: () => '首页' }
        ),
    key: 'home',
  },
  {
    label: () =>
        h(
            resolveComponent('router-link'),
            {
              to: {
                name: 'Square',
              }
            },
            { default: () => '广场' }
        ),
    key: 'square',
  },
  {
    label: '关于',
    key: 'about',
    children: [
      {
        label: () =>
            h(
                resolveComponent('router-link'),
                {
                  to: {
                    name: 'Author',
                  }
                },
                { default: () => '关于作者' }
            ),
        key: 'aboutAuthor',
      },
      {
        label: () =>
            h(
                resolveComponent('router-link'),
                {
                  to: {
                    name: 'Update',
                  }
                },
                { default: () => '更新日志' }
            ),
        key: 'update',
      },
      {
        label: () =>
            h(
                resolveComponent('router-link'),
                {
                  to: {
                    name: 'Cloud',
                  }
                },
                { default: () => '热门词云' }
            ),
        key: 'cloud',
      }
    ]
  },
]
const searchValue = ref(null)
const log = ref(store.state.isLogged)
const activeKey = ref(null)
const avatarOptions = [
  {
    label: '个人信息',
    key: 'profile',
  },
  {
    label: '提交反馈',
    key: "feedback"
  },
  {
    label: '会员服务',
    key: "vip"
  },
  {
    label: '用户须知',
    key: "userInstruction"
  },
  {
    label: '管理员入口',
    key: "manager"
  },
  {
    label: '退出登录',
    key: "exit"
  },
]
// method
const getRead = () => {
  if (store.state.uid !== 0) {
    store.state.axios({
      url: '/go/message/getRead',
      method: 'get',
      params: {
        userId: store.state.uid
      }
    }).then(r => {
      showRead.value = r.data.data
    })
  } else {
    showRead.value = true
  }
}
const handleSelect = (key) => {
  if (key === "exit") {
    dialog.warning({
      title: '警告',
      content: '你确定要退出登录？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        store.state.uid = 0
        store.state.isLogged = false
        log.value = false
        showRead.value = true
        message.info('退出登录~')
        router.push("/")
      }
    })
  }else if(key === "feedback") {
    showFeedback.value = !showFeedback.value
  }else if(key === "userInstruction") {
    showUserInstruction.value = !showUserInstruction.value
  } else if (key === "profile") {
    store.state.uidTemp = store.state.uid
    router.push("Profile")
  } else if (key === "manager") {
    showAdmin.value = true
  } else if (key === "vip") {
    store.state.axios({
      url: '/go/user/getUserInfo',
      method: 'get',
      params: {
        userId: store.state.uid
      }
    }).then(r => {
      let date = new Date(r.data.data.Vip)
      vipTime.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes()
      showVip.value = true
    })
  }
}
const clickCreate = () => {
  router.push('Create')
}
const clickMessage = () => {
  if (store.state.uid === 0) {
    message.error("您尚未登录！")
  } else {
    router.push('Message')
  }
}
const clickLog = () => {
  router.push('Log')
  store.state.choice = "signin"
}
const clickRegister = () => {
  router.push('Log')
  store.state.choice = "signup"
}
const search = () => {
  store.state.axios({
    url: '/go/search',
    method: 'get',
    params: {
      searchValue: searchValue.value,
      handle: "0"
    }
  }).then(r => {
    router.push('search')
    store.state.searchData = r.data.data
    if (r.data.data.length === 0) {
      message.error("没有找到文章！")
    }
  }).catch(() => {})
}
const addFeedback = () => {
  let formData = new FormData()
  formData.set('feedbackInfo', feedbackValue.value)
  formData.set('userId', store.state.uid)
  store.state.axios({
    url: '/go/feedback/submitFeedback',
    method: 'post',
    data: formData
  }).then(r => {
    if (r.status === 200) {
      feedbackValue.value = ""
      message.success("提交反馈成功，感谢您的反馈！")
      showFeedback.value = !showFeedback.value
    } else {
      message.error("提交失败！")
    }
  })
}
const submit = () => {
  if (adminPass.value === "adminv") {
    router.push("Manager")
  } else {
    message.error("密码错误~")
  }
}
const renewVip = () => {
  let formData = new FormData()
  formData.set("userId", store.state.uid)
  formData.set("code", code.value)
  store.state.axios({
    url: '/go/user/renewVip',
    method: 'post',
    data: formData
  }).then(() => {
    message.success("续费成功！")
    code.value = ""
    showVip.value = false
  }).catch(() => {
    message.error("err")
  })
}
// lifecycle
onMounted(() => {
  getRead()
})
</script>

<style scoped>
.input{
  width: 200px;
}
</style>