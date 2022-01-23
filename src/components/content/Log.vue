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
              <n-tabs :default-value="choice" size="large" justify-content="space-evenly"  type="segment">
                <!--登录表单-->
                <n-tab-pane name="signin" tab="登录">
                  <n-form :model="modelSignin" ref="SigninRef"  :rules="rulesSignin" label-placement="left" label-width="80px">
                    <n-form-item-row label="用户名" path="usernameSignin" :show-require-mark="false">
                      <n-input
                          v-model:value="modelSignin.usernameSignin"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row label="密码" path="passwordSignin" :show-require-mark="false">
                      <n-input
                          v-model:value="modelSignin.passwordSignin"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                  </n-form>
                  <n-button type="primary" block>登录</n-button>
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
                          v-model:value="modelSignup.passwordSignup"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row label="重复密码" path="repasswordSignup" :show-require-mark="true">
                      <n-input
                          v-model:value="modelSignup.repasswordSignup"
                          @keydown.enter.prevent
                      />
                    </n-form-item-row>
                    <n-form-item-row path="isAgree">
                      <n-checkbox v-model:checked="modelSignup.isAgree">我已阅读并同意用户协议</n-checkbox>
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
</template>

<script>
import tabBar from "../common/tabBar";
import { ref , } from 'vue'
import { useStore } from "vuex";


export default {
  name: "Log",
  components:{
    tabBar
  },
  setup () {
    const store = useStore()
    const SigninRef = ref(null)
    const modelRefSignin = ref({
      usernameSignin: null,
      passwordSignin: null,
    })
    const SignupRef = ref(null)
    const modelRefSignup = ref({
      usernameSignup: null,
      passwordSignup: null,
      repasswordSignup: null,
      isAgree: null,
    })
    const modelSignup = modelRefSignup
    const isAgree = ref(false)

    return {
      SigninRef, SignupRef, modelSignup, isAgree,

      choice: store.state.choice,
      modelSignin: modelRefSignin,
      rulesSignin: {
        usernameSignin:[{
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
            return true
          },
          trigger: ['input', 'blur']
        }],
        passwordSignin:[{
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
      },
      rulesSignup:{
        usernameSignup:[{
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
        passwordSignup:[{
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else
              return true
          },
          trigger: ['input', 'blur']
        }],
        repasswordSignup:[{
          required: true,
          validator (rule, value) {
            if (!value) {
              return new Error('不能为空')
            } else if (modelSignup.value.passwordSignup !== modelSignup.value.repasswordSignup) {
              return new Error('两次密码不一致')
            }
              return true
          },
          trigger: ['input', 'blur']
        }],
        isAgree:[{
          validator (rule, value) {
            if (!value) {
              return new Error('请勾选此项~')
            } else
            return true
          },
          trigger: ['change','blur'],
        }],
      },
      register() {
        this.$store.state.axios({
          url: '/go/user/register',
          method: 'post',
          data: {
            username: modelSignup.value.usernameSignup,
            password: modelSignup.value.passwordSignup,
            repassword: modelSignup.value.repasswordSignup,
          },
        }).then(r => {
          console.log(r);
          console.log(r.data);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>