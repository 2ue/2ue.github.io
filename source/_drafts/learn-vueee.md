---
title: 在项目中的vue实践与踩坑
date: 2017-5-18 22:10:55
author: J.2ue
tags:
- vue
- javascript
categories:
- vue
---

> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=86 src="//music.163.com/outchain/player?type=2&id=22677433&auto=0&height=66"></iframe>
从昨年开始，自己折腾vue也很久了，最近半年在项目中大量使用了vue，深深体会到了vue框架的便捷，高效。但由于开发模式的转变以及框架某些方面的限制也踩了不少坑，由此记录下来一些解决方案或者坑，最后发现仔细读官方文档会少踩很多坑。

## 谨慎箭头函数

对于箭头函数，它会强行改变函数上下文，所以凡是在`vue`实例内部，需要用到`this`的地方，都不要在<b>最外层</b>使用箭头函数，否则拿不到期望的`this`实例。

关于箭头函数，官方文档已经写得很详细了，可以关注一下几部分：
- [生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)
- [computed](https://cn.vuejs.org/v2/api/#computed)
- [watch](https://cn.vuejs.org/v2/api/#watch)
- [methods](https://cn.vuejs.org/v2/api/#methods)

## 谨慎style的scoped属性

scoped属性在vue中被设计出来的目的：为了使得当前组件的样式不影响其他任何组件的样式。但同时也使得其他组件修改当前组件的样式变得困难（修改可能不会生肖），为什么会困难，我在一篇文章中分析了scoped是如何实现私有化样式的，可以去看看: [vue中慎用style的scoped属性](https://2ue.github.io/2017/11/15/vue-style-scoped/)。

## vue-router配置404页面

``` javascript
let routerList = [
    { path: "/", component: Index },
    { path: "/login", component: Login },
    //404页面
    { path: "*", component: NotFound}
]
```
