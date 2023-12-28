/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-15 15:23:21
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-28 11:18:38
 * @FilePath: \Warfare-Simulation-Spring\src\utils\cameraUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Viewer, Cartesian3, Math, Ellipsoid, HeadingPitchRoll } from "cesium";
import mapViewConfig from "@/config/mapViewConfig.js";
import { useSysStore } from "@/store";
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
   * 通过viewConfig配置文件中key值获取配置对象，进而获取des,ori
   * @param viewConfig
   */
  public static normalFlyTo(
    viewKey: string,
    config: any = {
      duration: 3,
      callback: undefined,
    }
  ) {
    const viewConfig = mapViewConfig.filter(
      (config: any) => config.key === viewKey
    );
    if (!viewConfig.length) {
      console.error("暂未配置对应该key值的地图视角！");
      return;
    }

    const { destination, orientation } = viewConfig[0];
    const c3Coords = Cartesian3.fromDegrees(
      ...(destination as [number, number, number])
    );
    const orientation2Radians = orientation.map((ori: number) =>
      Math.toRadians(ori)
    );
    const ori = new HeadingPitchRoll(...orientation2Radians);

    const cesiumStore = useSysStore();
    const viewer = cesiumStore.$state.cesiumViewer as Viewer;

    viewer.camera.flyTo({
      destination: c3Coords,
      orientation: ori,
      duration: config.duration,
      complete: config.callback(viewConfig[0]),
    });
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
