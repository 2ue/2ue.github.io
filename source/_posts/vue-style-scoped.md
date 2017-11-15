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

通过查看DOM结构，发现vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的。具体是怎么产生影响的，通过一个例子来说明。

一个公共组件`button`

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

从上面可以看出，添加了`scoped`属性的组件，为了达到组件模块化，做了两个处理：
- 给`HTML`的`DOM`节点加一个不重复`data`属性(形如：data-v-2311c06a)来表示他的唯一性
- 在每句`css`选择器的末尾（编译后的生成的css语句）加一个当前组件的`data`属性选择器（如[data-v-2311c06a]）来私有化样式

这样做虽然达到了私有化样式的目的，但是会造成一种后果：每个样式的权重加重了，会造成`css`样式不容易修改

## 引用组件

如果在组件`content.vue`中使用了`button`组件，那么`content.vue`组件是否添加`scoped`属性渲染出来的结果有什么区别呢？我们来看看：

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

### 没有加scoped

如果`style`上没有加`scoped`属性，那么渲染出来`html`和`css`分别就是：

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

可以看出，虽然在`content`组件中，修改了`button`的`border-raduis`属性，但是由于权重关系，生效的依然是组件内部的样式（此时是外部的样式被覆盖）。所以如果要达到修改样式的目的，就必须加重我们要修改样式的权重（增加选择器层级，ID选择器，并列选择器，impotant等）

### 加上scoped

如果加了`scoped`属性呢？按照开始分析出来的规则（事实也是这么的）：
首先是在所有的`DOM`节点加上`data`属性
然后在css选择器尾部加上`data`属性选择器

那么渲染出来`html`和`css`分别就是：

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

对于上面的两种情况，可以明显看出来渲染后的结果大不相同。
并且`content`也修改了button组件的样式，但是仔细看，由于`.content .button`这句在末尾加的是`content`组件的标记，所以这句其实根本作用不到我们想要的`DOM`节点上,所以这种情况我们在content内部写的任何样式都不会影响到`button`组件，所以这就尴尬了。。。。当然这个问题也是可以解决的，就是在content属性再加一个不带`scoped`属性的标签，也就意味着要加两个`style`，一个用于私有样式，一个用于共有样式。真是shit，即：

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
<style scoped>
    .content{
        width: 1200px;
        margin: 0 auto;
    }
</style>
<style>
    .content .button{
        border-raduis: 5px;
    }
</style>
```

这样符合规范么？貌似没看到不能这么写，并且这么写也确实生效了。。。不知道怎么感概！！！

## 最后

在使用scoped一定要谨慎这个巨坑。如果大家有好的解决方案或者其他发现希望一起交流
