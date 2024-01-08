/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2024-01-04 15:30:48
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-08 11:25:53
 * @FilePath: \Warfare-Simulation-Spring\src\utils\gis\popupUtil.ts
 * @Description: 这里弹窗思路是在地图组件注册好备用的弹窗组件并设置隐藏,当点击地图获取到要素信息后，该要素对应的弹窗显示。
 * 并通过postRender实时刷新弹窗在屏幕的位置
 */
import type { Feature as IFeature, Point as IPoint } from "geojson";
import { Cartesian3, SceneTransforms, defined as CesiumDefined } from "cesium";
import type { Viewer as IViewer } from "cesium";
import { useSysStore } from "@/store";
import { markRaw } from "vue";
import GeometryUtil from "./geometryUtil";
export default class popupUtil {
  private viewer: IViewer;
  constructor(viewer: IViewer) {
    this.viewer = viewer;
  }

  addPopup(feature: IFeature, dom: HTMLElement) {
    const { geometry, properties } = feature;
    const height = properties?.height || 0;

    const screenCoords = GeometryUtil.geoCoordsToScreen([
      ...((geometry as IPoint).coordinates as [number, number]),
      height,
    ]);

    const { height:domHeight, width:domWidth } = window.getComputedStyle(dom, null);

    dom.style.left = screenCoords.x - Number(domWidth) * 0.5 + "px";
    dom.style.top = screenCoords.y - Number(domHeight) + "px";

    const cesiumStore = useSysStore();
    //老规矩，pinia中已经有监听弹窗事件，则直接获取实例，如果没有，则创建并保存到pinia(注意用markRaw去响应式)
    let popupEvent = cesiumStore.$state.event.get("PopupEvent");
    if (!CesiumDefined(popupEvent)) {
      popupEvent = this.viewer.scene.postRender.addEventListener(() => {
        const screenCoords = GeometryUtil.geoCoordsToScreen([
          ...((geometry as IPoint).coordinates as [number, number]),
          height,
        ]);

        if (!screenCoords.x || !screenCoords.y) {
          return;
        }

        dom.style.left = screenCoords.x - dom.clientWidth * 0.5 + "px";
        dom.style.top = screenCoords.y - (dom.clientHeight + 30) + "px";
      });
      cesiumStore.setCesiumEvent({
        evtName: "PopupEvent",
        evtHandler: markRaw(popupEvent),
      });
    }
  }
}
