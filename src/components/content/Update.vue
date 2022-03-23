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
    <el-backtop visibility-height="10"/>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {onMounted, ref} from "vue";
import tabBar from "../common/tabBar";
// use
const store = useStore()
const timelineData = ref([])

const getTimelineData = () => {
  store.state.axios({
    url: '/go/timeline/getTimeline',
    method: 'get',
  }).then(r => {
    timelineData.value = r.data.data
  })
}

onMounted(() => {
  getTimelineData()
})
</script>

<style scoped>

</style>