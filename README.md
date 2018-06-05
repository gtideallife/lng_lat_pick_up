# 经纬度获取工具
## 介绍
使用高德地图制作，用于获取某个点的经纬度或者某个区域的经纬度
![](http://wx-picture.oss-cn-hangzhou.aliyuncs.com/18-6-5/60888717.jpg)
## 使用说明
1. 在[高德开放平台](http://lbs.amap.com/)获取**Web端(JS API)**和**Web服务**两个key，前者用于地图渲染等，后者用于根据关键字查询经纬度

2. 将`public/index.html`的`your_key`替换为**Web端**key
3. 将`src/index.js`的`your_key`替换为**Web服务**key。
4. 运行项目

   ```
   yarn
   yarn start
   ```

>注：编辑区域时，多边形会显示可编辑点。其中不透明点为实际结点，鼠标左键单击该类节点可进行删除操作；半透明点为虚拟节点，单击该类节点将为多边形新增结点；实际结点和虚拟节点均可进行拖动操作，以改变多边形的形状。