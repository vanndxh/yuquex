<template>
  <div>
    <tabBar></tabBar>
    <br>
    <n-grid :col="24">
      <n-gi span="12" offset="7">
        <n-timeline>
          <n-timeline-item
              v-for="item in timelineData" :key="item"
              :type = "item.Type"
              :title = "item.Title"
              :content = "item.Content"
              :time = "item.Time"
          />
        </n-timeline>
      </n-gi>
    </n-grid>
    <div><n-back-top :right="40"/></div>
  </div>
</template>

<script>
import tabBar from "../common/tabBar";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  components:{
    tabBar
  },
  setup() {
    const store = useStore()

    const timelineData = ref([])

    return {
      timelineData,

      getTimelineData() {
        store.state.axios({
          url: '/go/timeline/getTimeline',
          method: 'get',
        }).then(r => {
          timelineData.value = r.data.data
          console.log(r.data.data);
        })
      }
    }
  },
  mounted() {
    this.getTimelineData()
  }
}
</script>

<style scoped>

</style>