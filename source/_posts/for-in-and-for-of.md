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

> `for...in`和`for...of`都是用于数据的遍历。`for...in`是`ES5`标准，用于遍历对象属性（键），而`for...of`是`ES6`标准，是对`for...in`的修正，用于遍历对象元素（值），`for...of`兼容性不是很好（除了PC端老顽固`IE`之外，移动端某些安卓机和浏览器也是不支持它，具体可以[查看MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)）。

## for...in

``` javascript
Object.prototype.objMethod = function() {};
Array.prototype.arrMethod = function() {};

var arr = [2, 9, 5], obj = { name: '2ue', w: 130 };
arr.msg = 'hello';
obj.msg = 'hello';

for (var i in arr) {
  console.log(i); // "0", "1", "2", "msg", "arrCustom", "objCustom"
}

for (var i in arr) {
  if (arr.hasOwnProperty(i)) {
    console.log(i); // "0", "1", "2", "msg"
  }
}
for (var i in obj) {
  console.log(i); // "name", "w", "msg", "objCustom"
}

for (var i in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log(i); // "name", "w", "msg"
  }
}
```

由上面的例子可以看出，`for...in`的一些特性：

- 可以对`JSON`对象（数组和对象）进行遍历
- `for...in`会遍历对象的所有可枚举属性，包括原型，例如一些我们挂载到原型链上的一些`method`和`name`
- 遍历很有可能不是按照对象的内部顺序（我们预期的）进行
- 对数组遍历时index索引为字符串型，在某些时候直接进行几何运算可能达不到预期结果

## for...of

`for...in`貌似强大的同时也带来很多副作用，想要达到预期的记过需要额外的代码来处理，所以`for...of`应运而生

``` javascript
Object.prototype.objMethod = function() {};
Array.prototype.arrMethod = function() {};

var arr = [2, 9, 5], obj = { name: '2ue', w: 130 };
arr.msg = 'hello';
obj.msg = 'hello';

for (var i of arr) {
  console.log(i); // 2, 9, 5
}
//如果用for...of循环对象，会报错`obj is not iterable`
for (var i of obj) {
  console.log(i);
}
```

可以看出，`for...of`方法在`for...in`上做了优化，并且限制了只能遍历数组。当然在`ES5`中，具有遍历数组功能的还有`map`、`filter`、`some`、`every`、`reduce`、`reduceRight`等，但是需要注意的是，有些方法不能被`break`句柄打断循环，使用`retun`也不能返回到外层，如`forEach`

## 参考

[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
[for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
[for-of循环是遍历实现iterator接口的成员](http://es6.ruanyifeng.com/#docs/iterator)
