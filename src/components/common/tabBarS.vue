<template>
  <div>
    <n-menu v-model:value="activeKey" mode="vertical" :options="menuOptions" />
  </div>
</template>

<script>
import { ref , h , resolveComponent} from 'vue'
import { NIcon } from 'naive-ui'
import {
   CloudOutline, DesktopOutline, DocumentOutline, FolderOutline, TrashBinOutline
} from '@vicons/ionicons5'


export default {
  setup () {
    const renderIcon =(icon) => {
      return () => h(NIcon, null, { default: () => h(icon) })
    }

    return {
      activeKey: ref(null),
      menuOptions : [
        {
          label: () =>
              h(
                  resolveComponent('router-link'),
                  {
                    to: {
                      name: 'DashBoard',
                    }
                  },
                  { default: () => '工作台' }
              ),
          key: 'dashBoard',
          icon: renderIcon(DesktopOutline)
        },
        {
          label: () =>
              h(
                  resolveComponent('router-link'),
                  {
                    to: {
                      name: 'Create',
                    }
                  },
                  { default: () => '新建文档' }
              ),
          key: 'create',
          icon: renderIcon(DocumentOutline)
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
          icon: renderIcon(FolderOutline)
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
          icon: renderIcon(CloudOutline)
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
          icon: renderIcon(TrashBinOutline)
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>