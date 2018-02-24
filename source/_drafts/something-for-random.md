---
title: 常用的随机函数方法解析
date: 2018-2-10 22:29:19
author: J.2ue
tags:
- 随机
- random
categories:
- javascript
---

> 一切方法都来自于`Math.random`，它会随机生成一个0-1之间的16位小数。

## 生成区间范围内的数字

```javascript
//包含边界值
function genSectionNum(min, max, len){
    var t = Math.random();
    if(!len || isNaN(len)) return min + Math.round(t * (max-min));
    len = Number('1e' + len);
    return parseInt((min + t * (max - min)) * len) / len;
}
```

## 生成随机字符串
