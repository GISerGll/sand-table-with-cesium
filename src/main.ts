/*
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-11 16:14:46
 * @LastEditors: 耿连龙 genglianlong@mti-sh.cn
 * @LastEditTime: 2023-12-11 16:18:58
 * @FilePath: \vue3-cesium\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";

import "./style.css";

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

createApp(App).mount("#app");
