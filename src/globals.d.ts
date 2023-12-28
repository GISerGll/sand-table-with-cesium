declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import { ComponentCustomProperties } from "@vue/runtime-core";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $http: proxy; // 这里填类型
    }
}
// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;
