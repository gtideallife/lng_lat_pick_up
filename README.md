# 经纬度获取工具
## 介绍
使用高德地图制作，用于获取某个点的经纬度或者某个区域的经纬度
![](http://wx-picture.oss-cn-hangzhou.aliyuncs.com/18-6-5/60888717.jpg)
## 使用说明
1. 在[高德开放平台](http://lbs.amap.com/)获取**Web端(JS API)**和**Web服务**两个key，前者用于地图渲染等，后者用于根据关键字查询经纬度

2. 将`public/index.html`的`your_key`替换为**Web端(JS API)**key
   将`src/index.js`的`your_key`替换为**Web服务**key。

3. 运行项目

   ```
   yarn
   yarn start
   ```

