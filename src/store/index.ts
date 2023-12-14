/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-14 16:26:37
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-14 16:27:51
 * @FilePath: \Warfare-Simulation-Spring\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

export * from './modules/cesium';