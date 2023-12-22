<!--
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 10:15:57
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-22 16:47:08
 * @FilePath: \vue3-cesium\src\components\MapContainer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesium-viewer" ref="viewerDivRef">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, markRaw } from "vue";
import { initView } from "@/utils/mapCore";
const viewerDivRef = ref<HTMLDivElement>();

import { useSysStore } from '@/store'
const cesiumStore = useSysStore()
import CameraUtil from "@/utils/cameraUtil"
import GeometryUtil from "@/utils/geometryUtil"
import BC522 from "@/assets/json/BC522.json";
import cities from "@/assets/json/city.json"
import cityIcon from "@/assets/images/city_icon.png"
import type { Feature as IFeature, FeatureCollection as IFeatureCollection, Position as IPosition } from "geojson";

onMounted(() => {
  initView(viewerDivRef.value as HTMLElement).then(res => {
    const viewer = res

    const rawViewer = markRaw(viewer) //利用markRaw标记viewer,避免被响应式劫持

    cesiumStore.setCesiumViewer(rawViewer) //将viewer存储进pinia
    //视角定位
    const cameraUtil = new CameraUtil(viewer);
    window.cameraUtil = cameraUtil;

    //添加范围
    const geometryUtil = new GeometryUtil(viewer);
    geometryUtil.addGeoJsonPolygon(BC522 as IFeatureCollection);

    //添加国家名称标注
    const countryLabels: IFeatureCollection = {
      type: "FeatureCollection",
      features: []
    }
    BC522.features.forEach(feature => {
      const centerCoords = geometryUtil.getCenterCoords(feature as IFeature);
      const labelFeature: IFeature = {
        type: "Feature",
        geometry: {
          coordinates: centerCoords as IPosition,
          type: "Point",
        },
        properties: {
          ...feature.properties,
          height: 1500,
          label: feature.properties.name
        }
      }

      countryLabels.features.push(labelFeature);
    })
    geometryUtil.addLabels(countryLabels)

    //添加首都标注及图标
    cities.features.forEach((city:any) => {
      city.properties.url = cityIcon;
      city.properties.label = city.properties["名称"];
      city.properties.fontsize = '32px';
      city.properties.offsetWidth = 26;
      city.properties.offsetHeight = -16;
      city.properties.outlineWidth = 5;
      city.properties.height = 1000;
      city.properties.scale = 0.5
    })

    geometryUtil.addLabels(cities as any)

    cities.features.forEach((city:any) => {
      city.properties.height = 1000;
    })
    geometryUtil.addIcons(cities as any)


  })

});
</script>

<style lang="scss" scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

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
