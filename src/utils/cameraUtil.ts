/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-15 15:23:21
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-15 17:11:59
 * @FilePath: \Warfare-Simulation-Spring\src\utils\cameraUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Viewer, Cartesian3, Math, Ellipsoid } from "cesium";

export default class cameraUtil {
  private viewer: Viewer;
  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public getDegreesOfCamera() {
    const viewer = this.viewer;
    var lngLat = this.cartesian3ToDegrees(viewer.camera.positionWC, viewer);
    var heading = Math.toDegrees(viewer.camera.heading);
    var pitch = Math.toDegrees(viewer.camera.pitch);
    var roll = Math.toDegrees(viewer.camera.roll);
    return {
      destination: [lngLat[0], lngLat[1], lngLat[2]],
      orientation: [heading, pitch, roll],
    };
  }


  /**
 * 三维笛卡尔坐标转角度
 *
 * @export
 * @param {Cesium.Cartesian3} cartesian3
 * @param {Viewer} viewer
 * @returns {PointCoordinate}
 */
  private cartesian3ToDegrees(cartesian3: Cartesian3, viewer: Viewer) {
    var lngLat = (
      viewer ? viewer.scene.globe.ellipsoid : Ellipsoid.WGS84
    ).cartesianToCartographic(cartesian3);
    var lng = Math.toDegrees(lngLat.longitude);
    var lat = Math.toDegrees(lngLat.latitude);
    var hei = lngLat.height;
    return [lng, lat, hei];
  }
}

