<template>
  <div id="footer">
    <div class="Footers">
      <div class='site-info'>
        <div class='footertext'>
          <p class='foo-logo'/>
          <p class='name'>
            <span>
              <a :href='defaultSettings.domain'>{{defaultSettings.Copyright}}</a>
            </span>
          </p>
          <p>© {{ defaultSettings.footTime }} {{defaultSettings.footTitle}}
            <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">{{defaultSettings.icp}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/footer.less"/>
<script setup>
import defaultSettings from "/@/settings";
</script>
<script>
export default {
  name: "Footer"
}
</script>

