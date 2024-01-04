<!--
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 17:43:55
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2024-01-04 10:53:57
 * @FilePath: \Warfare-Simulation-Spring\README.md
-->
# 春秋战争-吴越战争推演

最近开始对历史感兴趣，正巧也在整理最近做的素材，那干脆就尝试做这样一个系统来练练手。利用Cesium来推演春秋时期几大著名战役，再现春秋五霸的伟业。
项目应用[vite4 + vue3 + ts + cesium1.1模板](https://gitee.com/giserGLL/vue3-cesium.git)为基础模板，加上业务组件进行开发。
难在坚持，先看看能不能坚持到过年。😀<br>
最近发现需要整理的素材实在太多,打算**只整理吴越战争的历史片段**（2024.1.4）


## 运行命令
### 安装
pnpm install
### 运行
pnpm dev
### 打包
pnpm build
### 预览
pnpm preview

## 数据来源
[知乎](https://www.zhihu.com/zvideo/1206289340101459968?utm_source=wechat_session&utm_id=0) 吴越春秋地图范围，经QGIS软件地理校准生成矢量，加载到Cesium生成大致范围。

##关于架构思考


##关于使用方式


##与Cesium交互设计
交互分为两层，一层对使用者来讲，将数据与系统进行交互，获取交互结果。这层设计的想法是，**传入传出数据尽量都为GeoJson格式**；另外一层为系统设计与Cesium的交互，这层还未定，边开发边考虑。



