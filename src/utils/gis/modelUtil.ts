/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-27 14:21:50
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-04 10:47:10
 * @FilePath: \Warfare-Simulation-Spring\src\utils\gis\modelUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Viewer,
  Cartesian3,
  HeadingPitchRoll,
  PrimitiveCollection,
  Model,
  Transforms,
  Color,
} from "cesium";
import { useSysStore } from "@/store";
import type { PrimitiveCollection as IPrimitiveCollection } from "cesium";
import { markRaw } from "vue";

export default class modelUtil {
  private viewer: Viewer;
  constructor(viewer: Viewer) {
    this.viewer = viewer;
  }

  public addGltfModels(gltfModels: any[]) {
    try {
      let modelPrimitives: IPrimitiveCollection;
      const cesiumStore = useSysStore();
      if (cesiumStore.modelPrimitives instanceof PrimitiveCollection) {
        modelPrimitives = cesiumStore.$state
          .modelPrimitives as IPrimitiveCollection;
      } else {
        modelPrimitives = this.viewer.scene.primitives.add(
          new PrimitiveCollection()
        );
        cesiumStore.addModelPrimitives(markRaw(modelPrimitives));
      }

      const promises: Promise<any>[] = [];
      gltfModels.forEach((gltfModel: any) => {
        const hpr = new HeadingPitchRoll(0.0, 0.0, 0.0);
        const origin = Cartesian3.fromDegrees(
          gltfModel.longitude,
          gltfModel.latitude,
          gltfModel.height
        );
        const modelMatrix = Transforms.headingPitchRollToFixedFrame(
          origin,
          hpr
        );

        const promise = new Promise((resolve) => {
          Model.fromGltfAsync({
            id: gltfModel.properties,
            url: gltfModel.url,
            modelMatrix: modelMatrix,
            minimumPixelSize: 128,
            color: gltfModel.color
              ? Color.fromCssColorString(gltfModel.color)
              : undefined,
            outlineColor: gltfModel.outlineColor
              ? Color.fromCssColorString(gltfModel.outlineColor)
              : undefined,
            silhouetteSize: 2,
          }).then((model) => {
            modelPrimitives.add(model);
            model.readyEvent.addEventListener(() => {
              resolve(model);
            });
          });
        });

        promises.push(promise);
      });

      return promises;
    } catch (error) {
      window.alert(`Error loading model: ${error}`);
    }
  }
}
