---
title: vue中谨慎style的scoped属性
date: 2017-11-15 19:09:16
author: J.2ue
tags:
- vue
- javascript
categories:
- vue
---

> 为了使样式私有化（模块化），不对全局造成污染，可以在style标签上添加scoped属性以表示它的只属于当下的模块，这是一个非常好的举措，但是为什么要警惕他呢？因为scoped往往会造成我们在修改公共组件（三方库或者项目定制的组件）的样式时，增加额外的工作量。

## scoped实现原理

通过查看DOM结构，发现vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到模块化，具体会产生神马样的影响，通过一个例子来说明。

假设有两个组件，一个公共组件`button`，一个content组件（它引用了button组件）

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
    .button{
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
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
```

当我在`content.vue`组件中使用了`button`组件后，假设由于某种原因，需要需修改`button`组件的`border-radus`属性，

``` vue
//content.vue
<template>
    <div class="content">
        <p class="title"></p>
        <!-- v-button假设是上面定义的组件 -->
        <v-button></v-button>
    </div>
</template>
...
<style>
    .content{
        width: 1200px;
        margin: 0 auto;
    }
    .content .button{
        border-raduis: 5px;
    }
</style>
```

此时style上没有加scoped属性，那么渲染出来就是：

``` html
<div class="content">
    <p class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-2311c06a class="button-warp">
        <button data-v-2311c06a class="button">text</button>
    </div>
</div>
```

``` css
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
.content{
    width: 1200px;
    margin: 0 auto;
}
.content .button{
    border-raduis: 5px;
}
```

此时，

此时style上没有加scoped属性，那么渲染出来就是：

``` html
<div data-v-57bc25a0 class="content">
    <p data-v-57bc25a0 class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-57bc25a0 data-v-2311c06a class="button-warp">
        <button data-v-2311c06a class="button">text</button>
    </div>
</div>
```

``` css
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
.content[data-v-57bc25a0]{
    width: 1200px;
    margin: 0 auto;
}
.content .button[data-v-57bc25a0]{
    border-raduis: 5px;
}
```
