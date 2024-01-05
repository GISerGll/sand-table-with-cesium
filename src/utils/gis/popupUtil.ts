/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2024-01-04 15:30:48
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-05 14:44:32
 * @FilePath: \Warfare-Simulation-Spring\src\utils\gis\popupUtil.ts
 * @Description: 这里弹窗思路是在地图组件注册好备用的弹窗组件并设置隐藏,当点击地图获取到要素信息后，该要素对应的弹窗显示。
 * 并通过postRender实时刷新弹窗在屏幕的位置
 */
import type { Feature as IFeature, Point as IPoint } from "geojson";
import { Cartesian3, SceneTransforms, defined as CesiumDefined } from "cesium";
import type { Viewer as IViewer } from "cesium";
import { useSysStore } from "@/store";
import { markRaw } from "vue";
export default class popupUtil {
  private viewer: IViewer;
  constructor(viewer: IViewer) {
    this.viewer = viewer;
  }

  addPopup(feature: IFeature, dom: HTMLElement) {
    console.log(dom);
    const { geometry, properties } = feature;
    const height = properties?.height || 0;

    const coords: [number, number, number] = [
      ...((geometry as IPoint).coordinates as [number, number]),
      height,
    ];

    const cart3 = Cartesian3.fromDegrees(...coords);
    let screenPoint = coords;

    const cesiumStore = useSysStore();
    //老规矩，pinia中已经有监听弹窗事件，则直接获取实例，如果没有，则创建并保存到pinia(注意用markRaw去响应式)
    let popupEvent = cesiumStore.$state.event.get("PopupEvent");
    if (!CesiumDefined(popupEvent)) {
      popupEvent = this.viewer.scene.postRender.addEventListener(() => {
        //wgs64 coordinate to screen coordinate(Cartesian2)
        let screen = SceneTransforms.wgs84ToWindowCoordinates(
          this.viewer.scene,
          cart3
        );
        if (screenPoint) {
          if (screenPoint[0] !== screen.x || screenPoint[1] !== screen.y) {
            dom.style.left = screen.x - (dom.clientWidth * 0.5) + "px";
            dom.style.top = screen.y - (dom.clientHeight + 20) + "px";
          }
        }
      });
      cesiumStore.setCesiumEvent({
        evtName: "PopupEvent",
        evtHandler: markRaw(popupEvent),
      });
    }
  }
}
