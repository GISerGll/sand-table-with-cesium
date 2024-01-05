<!--
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2024-01-05 10:11:45
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-05 11:03:17
 * @FilePath: \Warfare-Simulation-Spring\src\components\mapPopups\General.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="popup-general">
    {{ popupInfo.name }}
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
interface IPopupInfo {
  /** 弹窗标题 */
  title: string;
  /** 名称 */
  name: string;
  /** 年龄 */
  age?: number;
}
interface Props {
  popupInfo: IPopupInfo
}

const props = defineProps<Props>();
onMounted(() => {
  console.log(111);
})


</script>

<style lang="scss" scoped>
.popup-general {
  background: #d70d0d;
}
</style>