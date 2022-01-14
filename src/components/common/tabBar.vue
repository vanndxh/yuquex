<template>
  <div>
    <n-layout-header>
      <n-card>
        <n-grid :cols="15" x-gap="20">
          <n-gi span="2">
            <img src="../../assets/img/xhw.png" alt="xhw" width="120" height="40" align="left" style="outline: none">
          </n-gi>

          <n-gi span="3" >
            <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
          </n-gi>

          <n-gi span="3">
            <n-input v-model:value="searchValue" type="text" placeholder="搜索" :clearable="true" maxlength="20" class="input"/>
            <n-button type="primary" ghost>搜索</n-button>
          </n-gi>

          <n-gi offset="4">
            <n-popover trigger="hover">
              <template #trigger>
                <n-icon size="30" class="create" @click="clickCreate">
                  <AddCircleOutline/>
                </n-icon>
              </template>
              <span>新建文档</span>
            </n-popover>
          </n-gi>

          <n-gi span="2">
            <n-space>
              <n-button v-show="!isLogged === true" @click="clickLog">登录</n-button>
              <n-button v-show="!isLogged === true" @click="clickRegister">注册</n-button>
            </n-space>
            <n-dropdown trigger="hover" @select="handleSelect" :options="avatarOptions">
              <n-avatar
                  v-show="isLogged === true"
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
</template>

<script>
import { ref , h , resolveComponent, } from 'vue'
import { AddCircleOutline } from '@vicons/ionicons5'
import {useRouter} from "vue-router";


export default {
  components:{
    AddCircleOutline,
  },
  setup () {
    const router = useRouter()
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
          }
        ]
      },
    ]

    return {
      menuOptions,

      searchValue: ref(null),
      activeKey: ref(null),
      isLogged: false,
      avatarOptions: [
        {
          label: '个人信息',
          key: 'personalInfo',
        },
        {
          label: '退出登录',
          key: "exit"
        },
      ],
      handleSelect (key) {
        console.log(key);
      },
      clickCreate () {
        router.push('create')
      },
      clickLog () {
        router.push('Log')
      },
      clickRegister () {
        router.push('Log')
      }
    }
  },
}
</script>

<style scoped>
.create{
  /*float: right;*/
  line-height: 45px;
}
.input{
  width: 200px;
}
</style>