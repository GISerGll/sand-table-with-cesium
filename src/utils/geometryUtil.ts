/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-17 16:36:47
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-19 23:33:30
 * @FilePath: \Warfare-Simulation-Spring\src\utils\geometryUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import turf, { feature } from "turf";
import { FeatureCollection, Feature } from "geojson";
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
  Geometry,
} from "cesium";

export default class GeometryUtil {
  private viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public addLabel(coordinates: [number, number, number], label: string) {
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

  public addIcon(featureCollection: FeatureCollection) {
    const billboards = this.viewer.scene.primitives.add(
      new BillboardCollection()
    );

    featureCollection.features.forEach((feature) => {
      //@ts-ignore
      const degrees: [number, number, number] = feature.geometry.coordinates;
      billboards.add({
        image: feature.properties?.url, // default: undefined
        show: true, // default
        position: Cartesian3.fromDegrees(...degrees),
        pixelOffset: new Cartesian2(0, -50), // default: (0, 0)
        eyeOffset: new Cartesian3(0.0, 0.0, 0.0), // default
        horizontalOrigin: HorizontalOrigin.CENTER, // default
        verticalOrigin: VerticalOrigin.BOTTOM, // default: 
        scale:0.5,
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
  public addGeoJsonPolygon(featureCollection: FeatureCollection) {
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
        //@ts-ignore
        entity.polygon.extrudedHeight = 1000;
        //@ts-ignore
        entity.polygon.outline = true;
        //@ts-ignore
        entity.polygon.outlineColor = Color.MAGENTA;
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
