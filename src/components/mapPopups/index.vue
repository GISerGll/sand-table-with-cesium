<!--
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2024-01-05 10:09:39
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-05 11:10:56
 * @FilePath: \Warfare-Simulation-Spring\src\components\mapPopups\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cesium-popup">
    <city v-if="type === 'city'"></city>
    <general v-else-if="type === 'general'" :popupInfo="properties"></general>
    <soldier v-else></soldier>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import City from "./City.vue";
import General from "./General.vue";
import Soldier from "./Soldier.vue";

interface Props {
  /** 弹窗类型 general将军 / soldier士兵 / city都城 */
  popupInfo: {
    type: string;

    properties: {
      /** 弹窗标题 */
      title: string;
      /** 名称 */
      name: string;
      /** 年龄 */
      age?: number;
    };
  }
}


const props = defineProps<Props>();

const type = computed(() => props.popupInfo.type);
const properties = computed(() => props.popupInfo.properties);
</script>

<style lang="scss" scoped>
.cesium-popup {
  height: 300px;
  width: 200px;
  position: absolute;
  background: #d02525;
  top: 50%;
  right: 45%;
}
</style>
