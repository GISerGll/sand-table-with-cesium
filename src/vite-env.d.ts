/*
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-11 16:14:46
 * @LastEditors: 耿连龙 genglianlong@mti-sh.cn
 * @LastEditTime: 2023-12-12 15:21:15
 * @FilePath: \vue3-cesium\src\vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


