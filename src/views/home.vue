<!--
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-22 10:10:35
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-22 15:50:50
 * @FilePath: \Warfare-Simulation-Spring\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <map-container>
    <div class="tips">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </map-container>
</template>

<script setup lang="ts">
import MapContainer from "@/components/MapContainer.vue";
import { ElCarouselItem } from 'element-plus'
</script>

<style lang="scss" scoped>
.tips {
  height: 200px;
  width: 800px;
  position: absolute;
  z-index: 1;
  background: $wss--border-color-light;
  opacity:0.5
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>