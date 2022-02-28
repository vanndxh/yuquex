<template>
  <div>
    <n-layout>
      <n-layout-header>
        <tabBar></tabBar>
      </n-layout-header>
      <n-layout-content>
        <br>
        <n-grid :col="24">
          <n-gi span="12" offset="6">
            <n-card>
              <n-tabs :default-value="tabDef" size="large" type="segment" :value="tabValue">
                <!--登录表单-->
                <n-tab-pane name="signin" tab="登录">
                  <n-form :model="modelSignin" ref="SigninRef"  :rules="rulesSignin" label-placement="left" label-width="80px">
                    <n-form-item-row label="账号" path="useridSignin" :show-require-mark="false">
                      <n-input
                          v-model:value="modelSignin.useridSignin"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row label="密码" path="passwordSignin" :show-require-mark="false">
                      <n-input
                          type="password"
                          v-model:value="modelSignin.passwordSignin"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                  </n-form>
                  <n-button type="primary" block @click="signIn()">登录</n-button>
                  <p class="forget" @click="showForget = true">忘记密码</p>
                </n-tab-pane>
                <!--注册表单-->
                <n-tab-pane name="signup" tab="注册">
                  <n-form :model="modelSignup" ref="SignupRef"  :rules="rulesSignup" label-placement="left"
                          label-width="80px">
                    <n-form-item-row label="用户名" path="usernameSignup" :show-require-mark="true">
                      <n-input
                          v-model:value="modelSignup.usernameSignup"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row label="密码" path="passwordSignup" :show-require-mark="true">
                      <n-input
                          type="password"
                          v-model:value="modelSignup.passwordSignup"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row label="重复密码" path="repasswordSignup" :show-require-mark="true">
                      <n-input
                          type="password"
                          v-model:value="modelSignup.repasswordSignup"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row path="isAgree">
                      <n-checkbox v-model:checked="modelSignup.isAgree">
                        我已阅读并同意
                        <a @click="showUserInstruction = !showUserInstruction" class="userInstruction">用户须知</a>
                      </n-checkbox>
                    </n-form-item-row>
                  </n-form>
                  <n-button type="primary" block @click="register">注册</n-button>
                </n-tab-pane>
              </n-tabs>
            </n-card>
          </n-gi>
        </n-grid>

      </n-layout-content>
    </n-layout>
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
  <n-modal v-model:show="showForget">
    <n-card
        style="width: 800px;"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      请联系管理员:1025196468@qq.com
    </n-card>
  </n-modal>
</template>

<script>
import tabBar from "../common/tabBar";
import {ref} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { useMessage, useNotification } from 'naive-ui'

export default {
  components: {
    tabBar
  },
  setup() {
    const notification = useNotification()
    const message = useMessage()
    const router = useRouter()
    const store = useStore()

    const SigninRef = ref(null)
    const modelSignin = ref({
      useridSignin: null,
      passwordSignin: null,
    })
    const SignupRef = ref(null)
    const modelSignup = ref({
      usernameSignup: null,
      passwordSignup: null,
      repasswordSignup: null,
      isAgree: null,
    })
    const showForget = ref(false)
    const showUserInstruction = ref(false)
    const tabDef = ref(store.state.choice)
    let tabValue = ref()

    return {
      SigninRef, SignupRef, modelSignin, modelSignup, showUserInstruction, tabValue, tabDef, showForget,

      rulesSignin: {
        useridSignin: [{
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
        passwordSignin: [{
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else if (value.length < 6){
              return new Error('密码不能小于6位')
            } else {
              return true
            }
          },
          trigger: ['input', 'blur']
        }],
      },
      rulesSignup: {
        usernameSignup: [{
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
        passwordSignup: [{
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else if (value.length < 6) {
              return new Error('密码不能小于6位')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
        repasswordSignup: [{
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else if (modelSignup.value.passwordSignup !== modelSignup.value.repasswordSignup) {
              return new Error('两次密码不一致')
            }
            return true
          },
          trigger: ['input', 'blur']
        }],
        isAgree: [{
          validator(rule, value) {
            if (!value) {
              return new Error('请勾选此项~')
            } else
              return true
          },
          trigger: ['change', 'blur'],
        }],
      },
      register() {
        let formData = new FormData()
        formData.set('username', modelSignup.value.usernameSignup)
        formData.set('password', modelSignup.value.passwordSignup)
        formData.set('rePassword', modelSignup.value.repasswordSignup)

        store.state.axios({
          url: '/go/user/register',
          method: 'post',
          data: formData
        }).then(r => {
          if (r.status === 200) {
            store.state.choice = "signin"
            modelSignin.value.useridSignin = r.data.userId
            modelSignin.value.passwordSignin = r.data.password
            message.success("注册成功！")
            notification.warning({
              title: "请牢记你的信息!",
              content: "账号: " + r.data.userId + "\n" + "密码:" + r.data.password
            })
            tabValue.value = "signin"
          }
        }).catch(() => {
          message.error("注册信息错误，请按提示修改！")
        })
      },
      signIn() {
        let formData = new FormData()
        formData.set('userId', modelSignin.value.useridSignin)
        formData.set('password', modelSignin.value.passwordSignin)

        store.state.axios({
          url: '/go/user/login',
          method: 'post',
          data: formData
        }).then(r => {
            if (r.status === 200) {
              message.success("登录成功，将自动跳转！")
              store.state.isLogged = true
              store.state.uid = modelSignin.value.useridSignin
              router.push("/")
            } else if (r.status === 404) {
              message.error("账号或密码错误！")
            }
          }).catch(() => {
          message.error("账号或密码错误！")
        })
      },
    }
  },
}
</script>

<style scoped>
.userInstruction {
  color: blue;
}
.forget{
  font-size: 12px;
  color: darkgray;
  float: right;
}
</style>