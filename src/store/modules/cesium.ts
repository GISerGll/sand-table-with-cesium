/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-14 16:29:45
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-27 14:34:40
 * @FilePath: \Warfare-Simulation-Spring\src\store\modules\cesium.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

import type {
  BillboardCollection as IBillboardCollection,
  LabelCollection as ILabelCollection,
  Viewer as IViewer,
  ScreenSpaceEventHandler as IScreenSpaceEventHandler,
  PrimitiveCollection as IPrimitiveCollection
} from "cesium";

export interface SysStore {
  cesiumViewer: IViewer | null;
  labels: ILabelCollection | null;
  billboards: IBillboardCollection | null;
  event: Map<String, IScreenSpaceEventHandler | Function>;
  modelPrimitives: IPrimitiveCollection | null;
}

export const useSysStore = defineStore({
  id: "sys",
  state: (): SysStore => ({
    cesiumViewer: null,
    labels: null,
    billboards: null,
    event: new Map(),
    modelPrimitives: null
  }),
  actions: {
    setCesiumViewer(viewer: IViewer) {
      this.cesiumViewer = viewer;
    },
    setLabels(labels: ILabelCollection) {
      this.labels = labels;
    },
    setBillBoards(billboards: IBillboardCollection) {
      this.billboards = billboards;
    },
    setCesiumEvent(evtObj: {
      evtName: String;
      evtHandler: IScreenSpaceEventHandler | Function;
    }) {
      this.event.set(evtObj.evtName, evtObj.evtHandler);
    },
    deleteCesiumEvent(evtName: String) {
      this.event.delete(evtName);
    },
    addModelPrimitives(primitives: IPrimitiveCollection) {
      this.modelPrimitives = primitives;
    }
  },
});
