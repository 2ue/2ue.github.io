---
title: 请勿滥用for...in与for...of
date: 2017-10-27 14:43:12
author: J.2ue
tags:
- 遍历
- for...in
- for...of
- javascript
categories:
- tips
---

> `for...in`和`for...of`都是用于数据的遍历。`for...in`是`ES5`标准，用于遍历对象属性（键），而`for...of`是`ES6`标准，用于遍历对象元素（值）。

## for...in
``` javascript
Object.prototype.objMethod = function() {}; 
Array.prototype.arrMethod = function() {};

var data = [2, 9, 5];
data.msg = 'hello';

for (var i in data) {
  console.log(i); // 0, 1, 2, "msg", "arrCustom", "objCustom"
}

for (var i in data) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // 0, 1, 2, "msg"
  }
}

for (var v of data) {
  console.log(v); // 2, 9, 5
}
```

## 参考

[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
[for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
[for-of循环是遍历实现iterator接口的成员](http://es6.ruanyifeng.com/#docs/iterator)


for in是ES5标准,for of是ES6标准;for in是遍历对象属性,for of是遍历对象元素。for of兼容性还不够,移动端安卓微信浏览器貌似不支持，苹果的可以;web端IE支持也不够，chrome可以

遍历数组通常使用for循环，ES5的话也可以使用forEach，ES5具有遍历数组功能的还有map、filter、some、every、reduce、reduceRight等，只不过他们的返回结果不一样。但是使用foreach遍历数组的话，使用break不能中断循环，使用return也不能返回到外层函数


