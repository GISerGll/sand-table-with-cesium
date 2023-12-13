<!--
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 10:15:57
 * @LastEditors: 耿连龙 genglianlong@mti-sh.cn
 * @LastEditTime: 2023-12-13 15:22:35
 * @FilePath: \vue3-cesium\src\components\MapContainer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { initView } from "@/utils/mapCore";
const viewerDivRef = ref<HTMLDivElement>();

onMounted(() => {
  viewerDivRef.value ? initView(viewerDivRef.value) : false;
});
</script>

<style lang="scss" scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;

  /* cesium 去版权 */
  ::v-deep .cesium-widget-credits {
    display: none !important;
    visibility: hidden !important;
  }

  ::v-deep .cesium-widget-credits {
    display: none !important;
    visibility: hidden !important;
  }

  /* 隐藏时间轴 */
  ::v-deep .cesium-viewer-timelineContainer {
    display: none;
  }

  /* 帧率位置控制 */
  ::v-deep .cesium-performanceDisplay-defaultContainer {
    top: auto;
    bottom: 36px;
  }

  /* 隐藏帧率名称 */
  ::v-deep .cesium-performanceDisplay-throttled {
    display: none;
  }
}
</style>
