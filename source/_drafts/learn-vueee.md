---
title: 在项目中的vue实践踩坑
date: 2017-5-18 22:10:55
author: J.2ue
tags:
- vue
- javascript
categories:
- vue
---

> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=86 src="//music.163.com/outchain/player?type=2&id=22677433&auto=0&height=66"></iframe>从昨年开始，自己折腾vue也很久了，最近半年在项目中大量使用了vue，深深体会到了vue框架的便捷，高效。但由于开发模式的转变以及框架某些方面的限制也踩了不少坑，由此记录下来它们或者它们的解决方案，最后发现仔细读官方文档会少踩很多坑。

## 特性

- this上下文绑定
- 脏数据检测
- 生命周期钩子特性

## 谨慎箭头函数

虽然`vue`提高使用`ES6+`的新特性，但是，请不要滥用。
对于箭头函数，他会强行改变函数上下文，所以凡是在`vue`实例内部，需要用到`this`的地方，都不要在最外层使用箭头函数，否则拿不到期望的`this`实例。

- [生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)
- [computed](https://cn.vuejs.org/v2/api/#computed)
- [watch](https://cn.vuejs.org/v2/api/#watch)
- [methods](https://cn.vuejs.org/v2/api/#methods)

## 谨慎style的scoped属性

为了使样式私有化（模块化），不对全局造成污染，可以在style标签上添加scoped属性以表示它的只属于当下的模块，这是一个非常好的举措，但是为什么要警惕他呢？因为scoped往往会造成我们在修改公共组件（三方库或者项目定制的组件）的样式时，增加额外的工作量。
那么，vue是怎么实现这个功能的呢？通过查看DOM结构，发现他是通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，举个例子：

假设有一个公共组件`button`

``` vue
//content.vue
<template>
    <div class="content">
        <p class="title"></p>
        //自定义的一个组件
        <v-button></v-button>
    </div>
</template>
...
<style scoped>
    .content{
        width: 1200px;
        margin: 0 auto;
    }
</style>
```

``` vue
//button.vue
<template>
    <div class="button-warp">
        <button class="button">text</button>
    </div>
</template>
...
<style scoped>
    .button-warp{
        display:inline-block;
    }
    .button-warp .button{
        padding: 5px 10px;
        font-size: 12px;
        border-radus: 2px;
    }
</style>
```

button组件渲染后html部分和css部分分别为：

``` html
<div data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
</div>
```

``` css
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button-warp .button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
```

当我在`content.vue`组件中使用了`button`组建后，假设由于某种原因，需要需修改`button`组件的`border-radus`属性
