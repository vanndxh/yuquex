<template>
  <div>
    <n-affix
        :bottom="20"
    >
      <img src="../../assets/cat.gif" alt="catgif" class="catgif">
    </n-affix>

  </div>
</template>

<script>
export default {
  setup(){
    return {
    }
  }
}
</script>

<style scoped>
.catgif{
  width: 150px;
  height: 150px;
  outline: none;
  position: fixed;
  bottom: 20px;
}
</style>