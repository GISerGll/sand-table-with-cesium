/*
 * @Author: 耿连龙 654506379@qq.com
 * @Date: 2023-12-28 11:30:23
 * @LastEditors: 耿连龙 654506379@qq.com
 * @LastEditTime: 2023-12-28 14:55:26
 * @FilePath: \Warfare-Simulation-Spring\src\utils\getResource.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 获取assets静态资源
const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
export default getAssetsFile;