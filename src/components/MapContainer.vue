<!--
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 10:15:57
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-04 10:00:53
 * @FilePath: \vue3-cesium\src\components\MapContainer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="cesium-viewer" ref="viewerDivRef">
    <slot />
  </div>

  <map-popup></map-popup>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { initView } from "@/utils/gis/mapCore";
import MapPopup from "./MapPopup.vue";
const viewerDivRef = ref<HTMLDivElement>();

import CameraUtil from "@/utils/gis/cameraUtil"
import GeometryUtil from "@/utils/gis/geometryUtil"
import EventUtil from "@/utils/gis/eventUtil";
import BC522 from "@/assets/json/BC522.json";
import cities from "@/assets/json/city.json"
import cityIcon from "@/assets/images/city_icon.png"

import type { Feature as IFeature, FeatureCollection as IFeatureCollection, Position as IPosition } from "geojson";
const emit = defineEmits(['mapLoaded'])
const pickHeight = ref(0);
const pickLongitude = ref(0);
const pickLatitude = ref(0)

onMounted(() => {
  initView(viewerDivRef.value as HTMLElement).then(res => {
    const viewer = res
    emit('mapLoaded', true)
    //视角定位
    const cameraUtil = new CameraUtil(viewer);
    window.cameraUtil = cameraUtil;
    //添加范围
    const geometryUtil = new GeometryUtil(viewer);
    geometryUtil.addGeoJsonPolygon(BC522 as IFeatureCollection);
    //注册空间事件
    const eventUtil = new EventUtil(viewer);


    eventUtil.initMapClickEvent((res: any) => {
      const { latitude, longitude, height } = res;

      pickHeight.value = height;
      pickLongitude.value = longitude;
      pickLatitude.value = latitude
    })

    eventUtil.initMouseMoveEvent((res: any) => {
      const { height } = res
      console.log(height);

      const geojsonData = viewer.dataSources.getByName("BC522")
      if (geojsonData.length) {
        geojsonData[0].show = (height > 10)
      }
    })



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
    cities.features.forEach((city: any) => {
      city.properties.url = cityIcon;
      city.properties.label = city.properties["名称"];
      city.properties.fontsize = '32px';
      city.properties.offsetWidth = 26;
      city.properties.offsetHeight = -16;
      city.properties.outlineWidth = 5;
      city.properties.height = 1000;
      city.properties.scale = 0.5
      city.properties.scaleByDistance = [1000, 3, 100000, 1]
    })

    geometryUtil.addLabels(cities as any)

    cities.features.forEach((city: any) => {
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

  .map-info {
    height: 50px;
    width: 550px;
    position: absolute;
    z-index: 1;
    bottom: 15px;
    font-size: 24px;
    display: flex;
  }
}
</style>
