---
title: 移动端适配方案
date: 2016-11-22 15:39:04
author: J.2ue
comments: true
tags:
- rem
- mobile
categories:
- javascript
---

> 需要移动端适配的根本原因：屏幕窗口的大小，devicepixelratio值等。

简单介绍下`devicepixelratio`(设备像素比,即dpr) = `physicalpixel` (物理像素) / `density-independent pixel`(设备独立像素,即dip)。

在JavaScript中，可以通过`window.devicePixelRatio`获取到当前设备的dpr。而在CSS中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和 `-webkit-max-device-pixel-ratio`进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

dip或dp,（`device independent pixels`，设备独立像素）与屏幕密度有关。dip可以用来辅助区分视网膜设备还是非视网膜设备。

移动端适配主要有两大不同的方向：`响应式布局`和`自适应布局`。

`响应式布局`是根据屏幕大小自动的调整布局位置（非单纯的缩放），实现适配

`自适应布局`则是根据屏幕大小自动的缩放大小，实现适配。个人喜欢自适应布局的这种方式。



## 纯css实现方式 -- 媒体查询

使用原生css来实现媒体查询是很繁琐的，因为每个媒体查询都要重写以便。推荐使用css的预编译器(sass,less,stylus)来实现，至于为什么要用预编译器，应该不用我说吧。

``` less
//less版本
html {
    font-size: 20px;
}
@media only screen and (min-width: 401px) {
    html {
        font-size: 25px !important;
    }
}
@media only screen and (min-width: 428px) {
    html {
        font-size: 26.75px !important;
    }
}
@media only screen and (min-width: 481px) {
    html {
        font-size: 30px !important;
    }
}
@media only screen and (min-width: 569px) {
    html {
        font-size: 35px !important;
    }
}
@media only screen and (min-width: 641px) {
    html {
        font-size: 40px !important;
    }
}
@media only screen and (min-width: 751px) {
    html {
        font-size: 50px !important;
    }
}
@media only screen and (min-width: 1080px) {
    html {
        font-size: 60px !important;
    }
}
@unit: 50rem; //基准单位,根据设计稿来确定。假设：设计稿尺寸为750，那么@unit设置为50rem(1rem=50px更方便下面计算)
.warp{with: 100 / @unit} // 设计稿上元素的尺寸为100px => .warp{with: 2rem}
.warp{with: 10 / @unit} // 设计稿上元素的尺寸为10px => .warp{with: 0.2rem}
```
这样当页面展示在750的屏幕上时，html的font-size为50px，那么当设置为2rem的元素显示的尺寸就为2*50px=100px。在其他尺寸的设备也会根据媒体查询设置的不同font-size进行自动缩放适配。
当然上面也提到了，在css中也是可以获取到`devicePixelRatio`的值，那么为了更精确在写媒体查询的时候可以把它也加上去，这里就不展开了。

## 纯css实现方式 -- 计算属性

``` css
html{font-size:calc(100vw/6.4)} //6.4为psd设计稿尺寸/100
```

这套方案几乎是目前最简洁的方案了，并且`calc`和`vw`在移动端的支持也不错哟。期待

## js的实现方式

js的实现方式，参考了`网易`和`淘宝`的实现方式，对他们进行了整合。并且修复了手机端`1px问题`。

- `网易实现方式`是通过设备尺寸动态的设置DOM的根元素字体大小，没有考虑devicePixelRatio的因素;
- `淘宝实现方式`也是通过设备尺寸动态的设置DOM的根元素字体大小，并且考虑了devicePixelRatio的因素，但淘宝在设置rem时，显得较复杂(不方便写css把px转化成rem);
- `1px问`题简单点说就是因为`devicePixelRatio`的存在，css的1px不等于移动端的1px。

``` javascript
(function(doc, win, designSize) { //designSize为设计稿的尺寸(宽)

    var docEl = document.documentElement,
        devWidth = docEl.clientWidth > 1080 ? 1080 : docEl.clientWidth,
        dpr = devicePixelRatio || 1,
        scale = 1 / dpr,
        width = dpr * devWidth,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'onresize', //判断横屏和窗口重置
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            document.querySelector('meta[name="viewport"]')
                    .setAttribute('content','width=' + width +
                                ', initial-scale=' + scale +
                                ', maximum-scale=' + scale +
                                ', minimum-scale=' + scale +
                                ', user-scalable=no');
            docEl.style.fontSize = devWidth / (designSize / 100) * dpr + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window, 750);
```

## 总结

- 以上三种方案对比，第一种媒体查询是最死板的，基本就是纯体力活。
- 利用`css`的计算属性可以很优雅的解决问题，但是在兼容方面来说，目前还不是很完美，并且也没考虑`devicePixelRatio`（一像素问题）这个因素。
- 最后的`javascript`解决方案则是考虑到了兼容和`devicePixelRatio`这些因素，但是这里有一个很大的弊端就是：页面会经过两次重回（给`HTML`根是指`font-size`和设置`meta`标签时）,在网络或者终端性能不是很好的情况用户体验很不错甚至页面错乱的情况。
