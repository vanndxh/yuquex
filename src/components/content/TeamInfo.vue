<template>
  <tabBar></tabBar>
  <br>
  <n-grid :col="24">
    <n-gi :span="16" :offset="4">
      <n-tabs type="segment" size="large">
        <n-tab-pane name="members" tab="组内成员">
          我这辈子最疯狂的事，发生在我在 Amazon 当软件工程师的时候，故事是这样的：<br /><br />
          那时我和女朋友住在一起，正在家里远程工作。忽然同事给我发来了紧急消息：”我们的服务出现了
          SEV 2 级别的故障！需要所有的人马上协助！“我们组的应用全挂掉了。<br /><br />
          当我还在费力的寻找修复方法的时候，忽然闻到隔壁房间的的焦味，防火报警器开始鸣叫。
        </n-tab-pane>
        <n-tab-pane name="articles" tab="组内文章">
          “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
          Amazon 服务，还是救公寓的火。<br /><br />
          我的脑海中忽然出现了 Amazon
          著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
          debug 这个线上问题。
        </n-tab-pane>
        <n-tab-pane name="clockInfo" tab="打卡详情">
          “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
          Amazon 服务，还是救公寓的火。<br /><br />
          我的脑海中忽然出现了 Amazon
          著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
          debug 这个线上问题。
        </n-tab-pane>
      </n-tabs>
    </n-gi>
  </n-grid>
</template>

<script>
import tabBar from "../common/tabBar";

export default {
  components: {
    tabBar
  }
}
</script>

<style scoped>

</style>