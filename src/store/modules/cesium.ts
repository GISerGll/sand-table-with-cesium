/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-14 16:29:45
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-14 16:29:57
 * @FilePath: \Warfare-Simulation-Spring\src\store\modules\cesium.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { Viewer } from 'cesium'

export interface SysStore {
  cesiumViewer: Viewer | null
}

export const useSysStore = defineStore({
  id: 'sys',
  state: (): SysStore => ({
    cesiumViewer: null
  }),
  actions: {
    setCesiumViewer(viewer: Viewer) {
      this.cesiumViewer = viewer
    }
  }
})
