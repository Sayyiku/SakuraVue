<template>
  <div class="BannerWrapper">
    <el-carousel indicator-position="none" :height="bannerHeight + 'px'" :interval="4500" direction="vertical">
      <el-carousel-item v-for="item in imagesUrl" :key="item.url">
        <img ref="imageCarousel" class="carouselImg" :src="getImageUrl(item.url)" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="waveWrapper waveAnimation">
      <div class="waveWrapperInner bgTop">
        <div class="wave waveTop"/>
      </div>
      <div class="waveWrapperInner bgMiddle">
        <div class="wave waveMiddle"/>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div class="wave waveBottom"/>
      </div>
    </div>
    <div id="scrollArr" class='headertop-down animated' @click="scrollArrClick">
      <span><i class='iconfont icon-xiangxia'/></span>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import defaultSettings from "/@/settings";

const bannerHeight = ref(0)
const screenWidth = ref(window.innerWidth)
const imagesUrl = defaultSettings.BannerImg
const emit = defineEmits(['scrollOffset'])

const getImageUrl = (url) => {
  return new URL(url, import.meta.url).href
}
onBeforeMount(async () => {
  await setSize()
  //监听窗口变化
  await window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
    setSize();
  }, false);
})
//动态改变首页图片尺寸
const setSize = () => {
  bannerHeight.value = 980 / 1680 * screenWidth.value
  if (bannerHeight.value > 980) bannerHeight.value = 980
  if (bannerHeight.value < 360) bannerHeight.value = 860
}
const scrollArrClick = () => emit('scrollOffset')
</script>

<style lang="less" scoped>
::v-deep(.el-carousel__container) {
  height: 98vh;
}

.carouselImgWrapper {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%
}
</style>
