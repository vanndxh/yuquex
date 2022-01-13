<template>
  <div>
    <tabBar></tabBar>
    <n-grid :col="24">
      <n-gi span="14" offset="5">
        <h1 class="vanndxh">van能的小黑</h1>
        <n-data-table :columns="columns" :data="data" :striped="true"/>

      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import tabBar from "../components/common/tabBar";
import { h } from 'vue'
import { NButton, useNotification } from 'naive-ui'

const createColumns = ({ jump }) => {
  return [
    {
      title: '平台',
      key: 'platform',
      align: 'center'
    },
    {
      title: '账号',
      key: 'account',
      align: "center"
    },
    {
      title: '操作',
      key: 'actions',
      align: "center",
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => jump(row)
            },
            { default: () => '跳转' }
        )
      }
    }
  ]
}

const createData = () => [
  {
    key: 0,
    platform: 'QQ',
    account: '1025196468',
    url:"https://space.bilibili.com/363270906"
  },
  {
    key: 1,
    platform: 'Bilibili',
    account: 'van能的小黑',
    url:"https://space.bilibili.com/363270906"
  },
  {
    key: 2,
    platform: '微博',
    account: 'van能的小黑',
    url:"https://weibo.com/6864286293/profile?rightmod=1&wvr=6&mod=personinfo"
  },
  {
    key: 3,
    platform: 'Github',
    account: 'vanndxh',
    url:"https://github.com/vanndxh?tab=repositories"
  },
]

export default {
  components:{
    tabBar
  },
  setup () {
    const notification = useNotification()
    const handleClick= ()=> {
      notification.info({
        title: '注意',
        content: '没有设置链接，可以自己添加',
        duration: 2500
      })
    }
    return {

      data: createData(),
      columns: createColumns({
        jump (rowData) {
          if(rowData.key === 0){
            handleClick()
          }else{
            let tempWindow = window.open('_blank');
            tempWindow.location = rowData.url;
          }
        }
      }),
    }
  }
}
</script>

<style scoped>
.vanndxh{
  align-items: center;
  font-family: 华文行楷;
  font-size: 40px;
  text-align: center;
}
</style>