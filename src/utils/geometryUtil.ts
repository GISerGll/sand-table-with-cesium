/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-17 16:36:47
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-21 15:48:13
 * @FilePath: \Warfare-Simulation-Spring\src\utils\geometryUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import turf, { feature } from "turf";
// import { FeatureCollection, Feature } from "geojson";
import type {
  FeatureCollection as IFeatureCollection,
  Feature,
  Geometry,
  Position,
  Polygon,
  Point,
} from "geojson";
import {
  Viewer,
  Cartesian3,
  Math,
  Ellipsoid,
  LabelCollection,
  Color,
  LabelStyle,
  GeoJsonDataSource,
  Entity,
  BillboardCollection,
  Cartesian2,
  HorizontalOrigin,
  VerticalOrigin,
} from "cesium";

import type {
  BillboardCollection as IBillboardCollection,
  LabelCollection as ILabelCollection,
  Viewer as IViewer,
} from "cesium";

import { markRaw } from "vue";
import { useSysStore } from "@/store";

export default class GeometryUtil {
  private viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public addLabels(featureCollection: IFeatureCollection) {
    const cesiumStore = useSysStore();
    let labels: ILabelCollection;
    //pinia中已经有labelCollection实例，则直接获取实例，如果没有，则创建并保存到pinia(注意用markRaw去响应式)
    if (cesiumStore.labels instanceof LabelCollection) {
      labels = cesiumStore.$state.labels as ILabelCollection;
    } else {
      labels = this.viewer.scene.primitives.add(new LabelCollection());
      cesiumStore.setLabels(markRaw(labels));
    }

    featureCollection.features.forEach((feature) => {
      const degrees = (feature.geometry as Point).coordinates;
      const labelText = feature.properties?.label;

      labels.add({
        position: Cartesian3.fromDegrees(
          ...(degrees as [number, number]),
          feature.properties?.height
        ),
        text: labelText,
        // CSS font-family
        font: `${feature.properties?.fontsize || "36px"} Microsoft YaHei`,
        fillColor: feature.properties?.fillColor
          ? Color.fromCssColorString(feature.properties?.fillColor)
          : Color.WHITE,
        outlineColor: feature.properties?.outlineColor
          ? Color.fromCssColorString(feature.properties?.fillColor)
          : Color.ROYALBLUE,
        outlineWidth: feature.properties?.outlineWidth || 1,
        pixelOffset: new Cartesian2(
          feature.properties?.offsetWidth || 0,
          feature.properties?.offsetHeight || 0
        ),
        style: LabelStyle.FILL_AND_OUTLINE,
      });
    });
  }

  public addIcons(featureCollection: IFeatureCollection) {
    const cesiumStore = useSysStore();
    let billboards: IBillboardCollection;
    //同addLabels存储pinia逻辑
    if (cesiumStore.billboards instanceof BillboardCollection) {
      billboards = cesiumStore.$state.billboards as IBillboardCollection;
    } else {
      billboards = this.viewer.scene.primitives.add(new BillboardCollection());
      cesiumStore.setBillBoards(markRaw(billboards));
    }

    featureCollection.features.forEach((feature) => {
      const degrees = (feature.geometry as Point).coordinates;
      billboards.add({
        image: feature.properties?.url, // default: undefined
        show: true, // default
        position: Cartesian3.fromDegrees(
          ...(degrees as [number, number]),
          feature.properties?.height
        ),
        eyeOffset: new Cartesian3(0.0, 0.0, 0.0), // default
        horizontalOrigin: HorizontalOrigin.CENTER, // default
        verticalOrigin: VerticalOrigin.BOTTOM, // default:
        scale: 0.5,
        color: Color.LIME, // default: WHITE
        alignedAxis: Cartesian3.ZERO, // default
        width: 64, // default: undefined
        height: 64, // default: undefined
        sizeInMeters: false, // default
      });
    });
  }

  // 获取Feature中心点坐标
  public getCenterCoords(feature: Feature) {
    return this.getCenter(feature)?.geometry.coordinates;
  }

  //加载geoJson polygon
  public addGeoJsonPolygon(featureCollection: IFeatureCollection) {
    //加载公元前522年疆域

    GeoJsonDataSource.load(featureCollection, {
      stroke: Color.BLUE,
      fill: Color.PINK.withAlpha(0.1),
      strokeWidth: 3,
    }).then((dataSource) => {
      this.viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash: any = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        const name = entity.name as string;

        let color = colorHash[name];
        if (!color) {
          color = Color.fromRandom({
            alpha: 0.5,
          });

          colorHash[name] = color;
        }

        //Set the polygon material to our random color.
        if (!entity.polygon) return;
        entity.polygon.material = color;

        //Extrude the polygon

        entity.polygon.extrudedHeight = 1000 as any;

        entity.polygon.outline = true as any;

        entity.polygon.outlineColor = Color.MAGENTA as any;
      }
    });
  }

  private getCenter(feature: Feature) {
    let _center;
    try {
      // center函数的参数可以是FeatureCollection 也可以是Feature,此处提示有问题
      //@ts-ignore
      _center = turf.center(feature as any);
    } catch (error) {
      console.log(error);
    }
    return _center;
  }
}
