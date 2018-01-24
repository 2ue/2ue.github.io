---
title: H5的visibilitychange特性 - 页面可见性检测
date: 2018-1-24 11:27:48
author: J.2ue
tags:
- visibilitychange
- javascript
categories:
- H5
---

> visibilitychange是H5的一个特性，当检测到浏览器标签页被隐藏（切换到其他标签/最小化到桌面）或者显示时候会触发

## 应用场景


``` javascript
function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    if ('hidden' in document) return 'hidden';
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'Hidden';
    }
    return null;
}
function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
    }
    return null;
}
var visProp = getHiddenProp();
if (visProp) {
    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
    document.addEventListener(evtname, function () {
        document.title = document[getVisibilityState()]+"状态";
    },false);
}
```

## 兼容


