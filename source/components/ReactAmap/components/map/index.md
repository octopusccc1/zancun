---
category: 地图
order: 1
title: Map 组件
---

## 何时使用

在需要显示地图的地方使用；

Map 组件是其他组件的基础，其他地图组件必须作为 Map 的子组件使用；Map 组件会给所有的子组件注入两个属性，`props.__ele__`和`props.__map__`，在拥有访问这两个属性的能力后，就可以根据高德原生 API 做高德允许你做的一切事情。react-amap 中的其他组件就是这么做的。所以，你也可以写出满足你业务需求的地图组件。关于这个详情以及示例请访问 [自定义地图组件](/articles/extend)。


## API

### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| layers | [TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)\[\]| / |地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个TileLayer类实现|
| zoom | `Number` | / | 地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围|
| center | `{ longitude, latitude }` 或者 [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) | / |地图中心点坐标值|
| labelzIndex |`Number`|/|地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。|
| lang |`String`|`zh_cn`|地图语言类型,可选值：zh_cn: 中文简体，en: 英文，zh_en：中英文对照,注：由于图面内容限制，中文、英文 、中英文地图POI可能存在不一致的情况|
| rotateEnable | `Boolean`或者`Number` [说明](#rotate)|`false`|地图是否可旋转|
| mapStyle | `String` |`normal` | 设置地图显示样式。目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)、blue_night|
| features |`String[]`|/|设置地图上显示的元素种类。支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）| 
| cursor |`String`|/|地图默认鼠标样式。参数cursor应符合CSS的cursor属性规范|
| defaultLayer |[TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)|/|当前地图中默认显示的图层。默认图层可以是TileLayer.Satellite等切片地图，也可以是通过[TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)自定义的切片图层|

<p id="rotate">关于<code>rotateEnable</code>：如果传入的是 Number 类型，启用旋转，传入值定义为旋转角度；</p>

### 静态属性

Map 的静态属性有如下 17 个，属性的作用与取值参考[高德官网](http://lbs.amap.com/api/javascript-api/reference/map)

+ `view`
+ `zooms`
+ `crs`
+ `animateEnable`
+ `isHotspot`
+ `resizeEnable`
+ `showIndoorMap`
+ `indoorMap`
+ `expandZoomRange`
+ `dragEnable`
+ `zoomEnable`
+ `doubleClickZoom`
+ `keyboardEnable`
+ `jogEnable`
+ `scrollWheel`
+ `touchZoom`
+ `showBuildingBlock`

### 扩展属性

有一些属性是高德本身没有直接提供的，但是根据高德的实例方法可以实现。我们把它封装了一层，可以更方便的使用；

#### events 配置

支持通过配置`events`属性给地图绑定事件；除了[高德原生提供的事件](http://lbs.amap.com/api/javascript-api/reference/map)外，我们扩展了`created`事件。

`events.created` 在地图实例创建成功后调用，传入参数就是地图实例。你可以在这里获得实例并进行操作。例如：

```jsx 
const events = {
  created: (ins) => { console.log(ins); },
  click: () => { console.log('clicked') },
}

/* ... */
<Map events={events} />
```


#### plugins 配置

支持通过配置`plugins`属性给地图增加[控件功能](http://lbs.amap.com/api/javascript-api/reference/map-control)。

目前支持四种控件：

+ `MapType`
+ `OverView`
+ `Scale`
+ `ToolBar`

`plugins` 属性取值是一个数组，数组每一项就是每个控件的配置；如果想启用控件的默认配置，直接写出控件名字（字符串）即可，如果需要自定义控件的配置，以对象来定义。如：

```jsx
const plugins = ['Scale', 'ToolBar'];
/* ... */
<Map plugins={plugins}/>
```

或者

```jsx
const plugins = ['Scale', {
  name: 'ToolBar',
  options: {
    visible: true, // 动态改变控件的可视状态，默认为 true
    onCreated(ins){
      // 地图的每个控件都是插件的形式提供，这里可以获得插件的实例
    },
    // 以下就是官方提供的可配置属性
    offset,
    position,
    // ... 以及其他的属性
  }
}];
/* ... */
<Map plugins={plugins}/>
```


注意：[react-amap 对插件的默认配置与高德官方的默认配置并不一致](https://github.com/ElemeFE/react-amap/issues/21)；如果在使用 react-amap 的这些插件后，与官方的表现不一致，请参考[官方文档](http://lbs.amap.com/api/javascript-api/reference/map-control)进行配置。
