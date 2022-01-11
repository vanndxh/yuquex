<template>
  <div>
    <n-layout-header>
      <n-card>
        <img src="@/assets/img/xhw.png" alt="xhw" width="120" height="40" align="left" style="outline: none">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
      </n-card>
    </n-layout-header>
  </div>
</template>

<script>
import { ref , h , resolveComponent} from 'vue'

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
        label: '关于作者',
        key: 'aboutAuthor',
      },
      {
        label: '关于网站',
        key: 'aboutPage',
      }
    ]
  },
]


export default {
  name: "tabBar",
  components:{

  },
  setup () {
    return {
      activeKey: ref(null),
      menuOptions
    }
  }
}
</script>

<style scoped>

</style>