<template>
  <div>
    <n-menu v-model:value="activeKey" mode="vertical" :options="menuOptions" />
  </div>
</template>

<script>
import { ref , h , resolveComponent} from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
            { default: () => '工作台' }
        ),
    key: 'home',
    icon: renderIcon(BookIcon)
  },
  {
    label: () =>
        h(
            resolveComponent('router-link'),
            {
              to: {
                name: 'Favorites',
              }
            },
            { default: () => '收藏夹' }
        ),
    key: 'favorites',
  },
  {
    label: () =>
        h(
            resolveComponent('router-link'),
            {
              to: {
                name: 'Teams',
              }
            },
            { default: () => '知识小组' }
        ),
    key: 'teams',
  },
  {
    label: () =>
        h(
            resolveComponent('router-link'),
            {
              to: {
                name: 'RecycleBin',
              }
            },
            { default: () => '回收站' }
        ),
    key: 'recycleBin',
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
  name: "tabBarS",
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