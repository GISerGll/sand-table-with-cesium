/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-26 14:24:50
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-04 10:58:10
 * @FilePath: \Warfare-Simulation-Spring\src\utils\eventUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ScreenSpaceEventHandler,
  Math,
  ScreenSpaceEventType,
  defined as CesiumDefined,
  Entity,
} from "cesium";

import type { Viewer } from "cesium";
import { useSysStore } from "@/store";

export default class EventUtil {
  private viewer: Viewer;
  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public initMapClickEvent(callback: Function) {
    const cesiumStore = useSysStore();
    //老规矩，pinia中已经有该事件，则直接获取实例，如果没有，则创建并保存到pinia(注意用markRaw去响应式)
    let screenSpaceEvent = cesiumStore.$state.event.get("MapClickEvent");
    if (!(screenSpaceEvent instanceof ScreenSpaceEventHandler)) {
      screenSpaceEvent = new ScreenSpaceEventHandler(this.viewer.scene.canvas);

      cesiumStore.setCesiumEvent({
        evtName: "screenSpaceEvent",
        evtHandler: screenSpaceEvent,
      });
    }
    screenSpaceEvent.setInputAction((movement: any) => {
      //具体事件的实现
      const ellipsoid = this.viewer.scene.globe.ellipsoid;
      //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
      const cartesian = this.viewer.camera.pickEllipsoid(
        movement.position,
        ellipsoid
      );

      const callbackInfo = {
        latitude: 0,
        longitude: 0,
        height: 0,
        feature: null,
      };
      if (cartesian) {
        //将笛卡尔三维坐标转为地图坐标（弧度）
        const cartographic =
          this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //将地图坐标（弧度）转为十进制的度数
        callbackInfo.latitude = Number(
          Math.toDegrees(cartographic.latitude).toFixed(4)
        );
        callbackInfo.longitude = Number(
          Math.toDegrees(cartographic.longitude).toFixed(4)
        );
        callbackInfo.height = Number(
          (this.viewer.camera.positionCartographic.height / 1000).toFixed(2)
        );
      }

      const pickedObject = this.viewer.scene.pick(movement.position);
      // 判断是否选中了一个实体或者primitives,且有id信息（id作强制要求，否则当作基础图层处理，不返回信息）
      if (CesiumDefined(pickedObject) && pickedObject.id) {
        const pickInfo = pickedObject.id;
      }

      callback(callbackInfo);
    }, ScreenSpaceEventType.LEFT_CLICK);
  }

  public initMouseMoveEvent(callback: Function) {
    const cesiumStore = useSysStore();
    //老规矩，pinia中已经有该事件，则直接获取实例，如果没有，则创建并保存到pinia(注意用markRaw去响应式)
    let screenSpaceEvent = cesiumStore.$state.event.get("mouseMoveEvent");
    if (!CesiumDefined(screenSpaceEvent)) {
      screenSpaceEvent = this.viewer.camera.changed.addEventListener(() => {
        // 视高 km
        let height = (
          this.viewer.camera.positionCartographic.height / 1000
        ).toFixed(2);
        // 方位角
        let heading = Math.toDegrees(this.viewer.camera.heading).toFixed(2);
        // 俯仰角
        let pitch = Math.toDegrees(this.viewer.camera.pitch).toFixed(2);
        // 翻滚角
        let roll = Math.toDegrees(this.viewer.camera.roll).toFixed(2);
        // 级别
        let level = 0;
        let tileRender = (this.viewer.scene as any)._globe._surface
          ._tilesToRender;
        if (tileRender && tileRender.length > 0) {
          level = (this.viewer.scene as any)._globe._surface._tilesToRender[0]
            ._level;
        }
        let str = `级数：${level} 视高：${height}km  方位角：${heading}° 俯仰角：${pitch}° 翻滚角：${roll}°`;
        console.log(str);

        callback({
          level,
          height,
          heading,
          pitch,
          roll,
        });
      });

      cesiumStore.setCesiumEvent({
        evtName: "mouseMoveEvent",
        evtHandler: screenSpaceEvent,
      });
    }
  }
}
