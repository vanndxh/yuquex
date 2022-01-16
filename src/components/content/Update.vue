<template>
  <div>
    <tabBar></tabBar>
    <br>
    <n-grid :col="24">
      <n-gi span="12" offset="7">
        <n-timeline>
          <n-timeline-item
              type="success"
              title="v1.0.4"
              content="完成新建文档页面设计，文档详情页设计，前端基本完成，等待后端联调"
              time="2022/1/16"
          />

          <n-timeline-item
              title="v1.0.3"
              content="调整部分ui，创建个人信息界面，修复注册表单bug"
              time="2022/1/15"
          />

          <n-timeline-item
              title="v1.0.2"
              content="修复前端bug，创建登录注册表单，创建后端"
              time="2022/1/14"
          />

          <n-timeline-item
              title="v1.0.1"
              content="新增注册登录，ui优化，新增动画小猫，新增日志功能，个人信息界面，完善前端功能"
              time="2022/1/13"
          />

          <n-timeline-item
              type="success"
              title="v1.0.0"
              content="新建文件夹，配置环境，搭建框架"
              time="2022/1/11"
          />

        </n-timeline>
      </n-gi>
    </n-grid>
    <n-back-top :right="100" :visibility-height="300"/>
  </div>
</template>

<script>
import tabBar from "../common/tabBar";

export default {
  name: "Update",
  components:{
    tabBar
  }
}
</script>

<style scoped>

</style>