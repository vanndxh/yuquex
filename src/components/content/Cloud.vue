<template>
  <div>
    <n-space justify="center" vertical>

      <tabBar></tabBar>
      <div id="cloud" style="width: 1000px; height: 500px;margin: auto"></div>
    </n-space>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {onMounted} from "vue";
import js2wordcloud from 'js2wordcloud'
import tabBar from "@/components/common/tabBar";
// use
const store = useStore()
const list = ref([])
// method
const getTags = () => {
  store.state.axios({
    url: '/go/article/getTags',
    method: 'get',
  }).then(r => {
    for (let key in r.data.data) {
      if (key !== "") {
        list.value.push([
          key, r.data.data[key]
        ])
      }
    }
    renderCloud(list.value)
  })
}
const renderCloud = (words) => {
  let wc = new js2wordcloud(document.getElementById("cloud"))
  wc.setOption({
    imageShape: '../assets/img/heart.jpeg',
    tooltip: {
      show: false
    },
    list: words,
    color: 'random-dark',
    // backgroundColor: '#eee'
  })
}
onMounted(() => {
  getTags()
})
</script>

<style scoped>

</style>