/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-17 16:36:47
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-17 19:38:20
 * @FilePath: \Warfare-Simulation-Spring\src\utils\geometryUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import turf from "turf";
import { FeatureCollection, Feature } from "geojson";
import {
  Viewer,
  Cartesian3,
  Math,
  Ellipsoid,
  LabelCollection,
  Color,
  LabelStyle,
  GeoJsonDataSource
} from "cesium";

export default class GeometryUtil {
  private viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public addLabel(coordinates: [number, number, number],label: string) {
    const labels = this.viewer.scene.primitives.add(new LabelCollection());
    labels.add({
      position: Cartesian3.fromDegrees(...coordinates),
      text: label,
      // CSS font-family
      font: "36px Microsoft YaHei bold",
      fillColor: Color.WHITE,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
      style: LabelStyle.FILL_AND_OUTLINE,
    });
  }

  // 获取Feature中心点坐标
  public getCenterCoords(feature: Feature) {
    return this.getCenter(feature)?.geometry.coordinates;
  }

  //加载geoJson polygon
  public addGeoJsonPolygon(featureCollection:FeatureCollection) {
    //加载公元前522年疆域
    this.viewer.dataSources.add(
      GeoJsonDataSource.load(featureCollection, {
        stroke: Color.BLUE,
        fill: Color.PINK.withAlpha(0.1),
        strokeWidth: 3,
      })
    );
  }

  private getCenter(feature: Feature) {
    let _center;
    try {
      // center函数的参数可以是FeatureCollection 也可以是Feature,此处提示有问题
      _center = turf.center(feature as any);
    } catch (error) {
      console.log(error);
    }
    return _center;
  }
}
