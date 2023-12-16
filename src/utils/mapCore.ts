/*
 * @Author: 耿连龙 genglianlong@mti-sh.cn
 * @Date: 2023-12-13 13:56:34
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-16 23:48:34
 * @FilePath: \vue3-cesium\src\utils\mapCore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  UrlTemplateImageryProvider,
  Viewer,
  createWorldTerrain,
  ScreenSpaceEventType,
  Cartesian3,
  Ion,
  HeadingPitchRoll,
  Math,
  GeoJsonDataSource,
  Color,
} from "cesium";
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
import BC522 from "@/assets/json/BC522.json";

window.CESIUM_BASE_URL = "libs/cesium/";
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGNhNzU5Mi03MDM3LTQ3MDItYmQ4Yi0wYTk1ZDk0NDc4MDAiLCJpZCI6MzQzMzMsImlhdCI6MTY2MDg3MjcyNn0.cxz8qKn2AetiPtoIOh7z3l6ozhYZJ8yOdK1tyshvaBw";

export function initView(ele: HTMLElement): Viewer {
  const viewer = new Viewer(ele, {
    imageryProvider: new UrlTemplateImageryProvider({
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      minimumLevel: 2,
    }),
    requestRenderMode: true, // 开启请求的渲染模式
    maximumRenderTimeChange: Infinity, // 处理模拟时间改变
    animation: false, // 是否创建动画小器件，左下角仪表
    baseLayerPicker: false, // 是否显示图层选择器
    fullscreenButton: false, // 是否显示全屏按钮
    geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
    homeButton: false, // 是否显示Home按钮
    infoBox: false, // 是否显示信息框
    shouldAnimate: true, // 允许动画
    sceneModePicker: false, // 是否显示3D/2D选择器
    selectionIndicator: false, // 是否显示选取指示器组件鼠标绿色框
    timeline: true, // 是否显示时间轴
    navigationHelpButton: false, // 是否显示右上角的帮助按钮
    vrButton: false, // 是否显示双屏
    scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    fullscreenElement: document.body, // 全屏时渲染的HTML元素
    navigationInstructionsInitiallyVisible: false,
    terrainProvider: createWorldTerrain(),
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
        depth: true,
        stencil: true,
        antialias: true, //!mobilecheck(),
        premultipliedAlpha: true,
        //通过canvas.toDataURL()实现截图需要将该项设置为true
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true,
      },
    },
  });

  viewer.shadows = true; //开启或关闭阴影

  // 关闭抗锯齿
  //   viewer.scene.fxaa = true;
  viewer.scene.postProcessStages.fxaa.enabled = true;

  //开启帧率检测
  viewer.scene.debugShowFramesPerSecond = true;

  // 开启全球光照
  viewer.scene.globe.enableLighting = true;

  //更改配置，性能优化
  viewer.scene.logarithmicDepthBuffer = true;
  // 取消双击事件-追踪该位置
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );

  const ori = new HeadingPitchRoll(
    Math.toRadians(358.51265883615645),
    Math.toRadians(-67.33458315095581),
    Math.toRadians(0.006693394611650259)
  );
  const ori1 = new HeadingPitchRoll(
    Math.toRadians(5.088887490341627e-14),
    Math.toRadians(-89.99800787474585),
    Math.toRadians(0)
  );

  //加载公元前522年疆域
  viewer.dataSources.add(
    GeoJsonDataSource.load(BC522, {
      stroke: Color.HOTPINK,
      fill: Color.PINK.withAlpha(0.5),
      strokeWidth: 3,
    })
  );

  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(
      -178.37060798979678,
      38.99479874438089,
      56056607.29408956
    ),
    orientation: ori1,
    duration: 2,
    complete: () => {
      setTimeout(() => {
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(
            111.15273287715254,
            16.61320059283247,
            4997491.785760499
          ),
          orientation: ori,
          duration: 3,
        });
      }, 1000);
    },
  });

  return viewer;
}
