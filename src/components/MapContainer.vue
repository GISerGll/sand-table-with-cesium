<!--
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 10:15:57
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-15 17:10:15
 * @FilePath: \vue3-cesium\src\components\MapContainer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from "vue";
import { initView } from "@/utils/mapCore";
const viewerDivRef = ref<HTMLDivElement>();

import { useSysStore } from '@/store'
const cesiumStore = useSysStore()
import CameraUtil from "@/utils/cameraUtil"
// window.cameraUtil = cameraUtil;
onMounted(() => {
  const viewer = initView(viewerDivRef.value as HTMLElement);
  const rawViewer = markRaw(viewer) //利用markRaw标记viewer,避免被响应式劫持

  cesiumStore.setCesiumViewer(rawViewer) //将viewer存储进pinia
  
  const cameraUtil = new CameraUtil(viewer);
  window.cameraUtil = cameraUtil;
});
</script>

<style lang="scss" scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;

  /* cesium 去版权 */
  :deep(.cesium-widget-credits) {
    display: none !important;
    visibility: hidden !important;
  }

  :deep(.cesium-widget-credits) {
    display: none !important;
    visibility: hidden !important;
  }

  /* 隐藏时间轴 */
  :deep(.cesium-viewer-timelineContainer) {
    display: none;
  }

  /* 帧率位置控制 */
  :deep(.cesium-performanceDisplay-defaultContainer) {
    top: auto;
    bottom: 36px;
  }

  /* 隐藏帧率名称 */
  :deep(.cesium-performanceDisplay-throttled) {
    display: none;
  }
}
</style>
