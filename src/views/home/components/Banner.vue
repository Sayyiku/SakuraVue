<template>
  <div class="BannerWrapper" id="BannerWrapper">
    <canvas id="canvas"></canvas>
    <img style="display: none;" id="img1" src="https://i.w3tt.com/2022/02/18/UmjsC.png" alt="">
    <img style="display: none;" id="img2" src="https://i.w3tt.com/2022/02/18/Um9gN.png" alt="">
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
import {onBeforeMount, ref, onMounted} from "vue";
import defaultSettings from "/@/settings";

const bannerHeight = ref(0)
const screenWidth = ref(window.innerWidth)
const imagesUrl = defaultSettings.BannerImg
const emit = defineEmits(['scrollOffset'])
const petals = defaultSettings.petalsNum
const petalsSpeed = defaultSettings.petalsSpeed
const petalsWidth = defaultSettings.petalsWidth
const petalsHeight = defaultSettings.petalsHeight

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
    /添加樱花飘落
onMounted(() => {
  const content = document.getElementById('BannerWrapper');
  let canvas = document.getElementById('canvas')
  let img0 = document.getElementById('img1')
  let img1 = document.getElementById('img2')
  console.log(canvas, "canvas")
  let context = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = content.offsetHeight;
  canvas.width = w;
  canvas.height = h;
  let imgArr = [img0, img1]
  let petalArr = []
  for (let i = 0; i < petals; i++) {
    petalArr.push({
      x: Math.random() * w,
      y: Math.random() * 1,
      vx: Math.random() * 1.4,
      vy: Math.random() * 5,
      img: imgArr[parseInt(Math.random() * 2)]
    })
  }
  const draw = () => {
    context.clearRect(0, 0, w, h);
    context.beginPath()
    petalArr.forEach(e => {
      context.moveTo(e.x, e.y);
      context.drawImage(e.img, e.x, e.y, petalsWidth, petalsHeight);
    })
    context.fill();
    move()
  }
  const move = () => {
    petalArr.forEach(e => {
      e.y += e.vy
      e.x += e.vx
      if (e.y > h || e.x > w) {
        e.y = Math.random() * 1
        e.x = Math.random() * w
      }
    })
  }
  setInterval(draw, petalsSpeed)
})
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
