<!--
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-22 10:10:35
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-25 14:47:04
 * @FilePath: \Warfare-Simulation-Spring\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <map-container>
    <div class="tips">
      <el-steps v-show="showSteps" :active="active" align-center :space="'800px'" class="steps">
        <el-step v-for="item in steps" :key="item.key" :title="item.abstract" @click='handleClick(item)' />
      </el-steps>
      <div v-show="!showSteps" class="content">{{ steps[active] && steps[active].title }}
        <SvgIcon name="back" size="40px" @click="goBack"/>
      </div>

    </div>
  </map-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import MapContainer from "@/components/MapContainer.vue";
import { ElSteps } from 'element-plus'

const active = ref(-1)
const showSteps = ref(true)
const steps = reactive([
  {
    title: "公元前522年(周景王二十三年)春，楚平王驱逐太子建、杀死太傅伍奢，伍奢之子伍子胥出奔吴国。",
    key: "BC522",
    abstract: "伍子胥出逃"
  },
  {
    title: "公元前519年(周敬王元年)七月，吴、楚战于鸡父（今河南固始县东南），楚军大败。吴王僚攻取楚国州来（今安徽凤台）。",
    key: "BC519",
    abstract: "吴王僚大败楚军"
  },
  {
    title: "公元前518年(周敬王二年)冬，楚平王派遣水师入侵吴国，与越军在豫章之纳会师。吴王僚发兵报复楚国，攻占巢、钟离。",
    key: "BC518",
    abstract: "吴楚乱战"
  },
  {
    title: "公元前515年(周敬王五年)春，吴王僚派遣公子掩馀、公子烛庸率军伐楚，包围潜地。楚国令尹囊瓦率军进抵沙纳，左尹伯邻宛、工尹寿率军救援潜地。夏，公子光指使专诸刺杀吴王僚。公子光自立为王，是为吴王阖间。",
    key: "BC515",
    abstract: "专诸刺杀吴王僚"
  }
])

const stepWidth = 1 / steps.length * 100 + "%"

const handleClick = (item: any) => {
  if (active.value++ > 2) active.value = 0

  showSteps.value = false
}

const goBack = () => {
  showSteps.value = !showSteps.value
}
</script>

<style lang="scss" scoped>
.tips {
  height: 200px;
  width: 1920px;
  position: absolute;
  z-index: 1;
  top: 100px;
  background: url("../assets/images/tips_bg_blue.png") no-repeat center center;
  ;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 5px solid $wss--color-primary;
  // border-radius: 20px;

  .steps {
    padding: 20px;
    width: 100%;

    :deep(.el-step) {
      width: v-bind(stepWidth);

    }

    :deep(.el-step__icon) {
      font-size: 50px;
      width: 60px;
      height: 60px;
    }

    :deep(.el-step__line) {
      top: 30px;
    }

    :deep(.el-step__title) {
      font-size: 24px;

      &.is-process {
        color: $wss--color-white
      }
    }
  }

  :deep(.el-icon) {
    color: white;
  }

  /**打字机动画 */
  @keyframes typing {
    from {
      width: 0
    }

    to {
      width: 42em
    }
  }

  /**光标动画 */
  @keyframes blink-caret {

    from,
    to {
      border-color: transparent
    }

    50% {
      border-color: orange;
    }
  }

  .content {
    font-family: 'CUSTOM';
    font-size: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    color: $wss--color-white;
    transform: translate(-50%, -50%);
    /* font-weight: bold; */

    /* font-family: monospace; */
    overflow: hidden;
    /* 使用右边框作为打印的指针光标 */
    border-right: .15em solid orange;
    /* 要设置不允许换行，且溢出隐藏 */
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
    /* 加上两个动画，一个是打字动画，使用steps让字一个一个的出现，
  注意step和字数保持一致，然后多一步用来丢弃，光标动画也是同理，*/
    animation: typing 5s steps(42, end), blink-caret .5s step-end infinite;

  }
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