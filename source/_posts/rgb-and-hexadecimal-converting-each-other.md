---
title: RGB与16进制色值之间的互相转换
date: 2017-08-23 19:43:27
author: J.2ue
comments: true
tags:
- RGB
- 16进制
- 颜色
categories:
- javascript
---

> 颜色的表达有多种方式：RGB、RGBA、CMYK、16进制、HSL、HSLA、HSB、LAB...在web或者app开发中，出场率最高的当然非RGB和16进制莫属了，另外在css3中新增的RGBA，由于其支持透明特性，也在逐渐变得流行起来。本次主要探讨一下RGB和16进制的互相转换


## 关于颜色值的转换
首先明确一个概念，不同的模式，所能表达的色彩种类（总数）可能存在差别，所以并不是所有的颜色都能进行转换或者正确转换（对应的值可能不唯一）。

RGB色值本质可以看做是10进制的数字，每个数值的范围是0~255
16进制色值，不用说，肯定是和16进制数有关，但它并非一个简单的16进制数，而是由#，加上三个16进制数拼接而成的

```javascript
/*
* @function 16进制(Hexadecimal)色值转换成RGB色值
* @return 返回形如rgb(0,0,0)的RGB色值
*/
function colorToRgb (colorVal) {
    var color = colorVal.toLowerCase(), reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/, match = color.match(reg), matchVal, len, dis;
    if(match){
    	var res = ['rgb(',',',',','',')'];
        matchVal = match[1].split('');
        len = matchVal.length;
        dis = len === 3 ? 1 : 2;
        for(var i = 0; i < len; i = i + dis){
        	var j = parseInt(i / dis) + 1;
            res[j] = (parseInt('0x' + matchVal[i] + matchVal[i + dis - 1])) + res[j];
        }
        return res.join('');
	}else {
    	return this;
	}
};
/*
* @function RGB色值转换成16进制(Hexadecimal)色值
* @params {Boolean} 是否简写，默认为true
* @return 返回形如#ff0000或#f00的16进制色值
*/
function colorToHexadecimal (colorVal, short) {
    var color = colorVal.toLowerCase().replace(/\s/g, ''), reg = /^rgb\(([0-9]{1,3}\,){2}([0-9]{1,3})\)\;?$/, match = color.match(reg);
    //首先验证是否符合格式，允许空格存在
	//形如rgb(0,255,0)或者rgb(0,255,0);
    if(match){
    	var res = ['#','','',''], matchVal = color.match(/\d+/g), len = matchVal.length, isShort = typeof short === 'undefined' || short ? true : false;
        for(var i = 0; i < len; i++){
        	var val = matchVal[i], xVal = Number(val).toString(16), single = val < 16, sameChar = single || val % 17 === 0;
        	if(!sameChar) isShort = false;
            res[i + 1] = single ? [xVal, xVal].join('') : xVal;
        }
        res = res.join('').split('');
    	return isShort ? [res[0], res[1], res[3], res[5]].join('') : res.join('');
	}else {
    	return this;
	}
};
```
