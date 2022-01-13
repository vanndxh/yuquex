<template>
  <div>
    <tabBar></tabBar>
    <br>
    <n-grid :col="24">
      <n-gi span="12" offset="7">
        <n-timeline>

          <n-timeline-item
              title="v1.0.1"
              content="新增注册登录，ui优化，新增动画小猫，新增日志功能，个人信息界面，前端功能完善"
              time="2022/1/13"
          />

          <n-timeline-item
              type="success"
              title="v1.0.0"
              content="新建文件夹，配置环境，框架的搭建"
              time="2022/1/11"
          />

        </n-timeline>
      </n-gi>
    </n-grid>
    <n-back-top :right="100" :visibility-height="300"/>
  </div>
</template>

<script>
import tabBar from "../components/common/tabBar";

export default {
  name: "Update",
  components:{
    tabBar
  }
}
</script>

<style scoped>

</style>