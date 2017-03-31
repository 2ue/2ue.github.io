---
title: Javascript常用见问题之判断类型
date: 2017-3-31 17:05:06
author: J.Yof
comments: true
tags:
- Javascript
- typeof
- object
categories:
- util
---

> 类型判断是我们在编程中常遇到的棘手问题，严格的变量类型约束会为代码减少很多致命的BUG。本文是对常用到的类型判断的一个整理，以求以最简洁的方式来判断变量的类型。<br/>本文所有的如果没特指，都是基于ES5的原生javascript

## 变量的基本类型
众所周知，`JavaScript`中变量可能包含两种不同的数据类型的值：**基本类型**和**引用类型**。基本类型是指简单的数据段，有`Number`、`String`、`Boolean`、`Udefined`、`Null`，而引用类型指那些可能包含多个值的对象，有`Object`、`Array`、`Date`、`RegExp`、`Function`。在`JavaScript`中，我们通过`var`来声明变量，由于`JavaScript`是若语言类型，我们无法在申明的时候规定他的类型，`JavaScript`变量的类型是随变量的值改变而改变的。所以我们要判断变量值的类型。下图列举一些常见的类型：

|      类型      |       举例        |
| :----------: | :-------------: |
|   **Null**   |      null       |
| **Udefined** | udefined、未赋值的变量 |
| **Boolean**  |   true、false    |
|  **Number**  |  -1、0 、 1、 NaN  |
|  **String**  |     '1'、'a'     |
|  **Array**   | []、new Array()  |
|  **Object**  | {}、new Object() |
| **Function** |  function(){}   |


读到这里也许你会问，这有什么棘手的，就这几种类型背下来不就行了么？然而我想告诉你：**在大胆猜测的同时，也要用实践去证明你的猜测**。然后你当你用`typeof`去检测它们的类型时，你就崩溃了：明明是`Null`为什么结果却是`oject`，明明是`Array`为什么还是`obejct`？...所以除了使用`typeof`方法外我们必须药寻找其他的方法，那么这些方法有哪些呢？请继续往下读(`para`表示要判断的变量)：
- isNaN(para)
- !para
- typeof para
- Object.prototype.toString.call(para);

## isNaN(para)
用来判断是否为`number`类型的专有方法，但是需要注意的时，`NaN`也是`number`类型哦。

## !para
常用来判断一个变量是否存在，面对`Arry`、`Object`等**引用类型变量**时无论是否为空都会被转换成`true`

## typeof para
事实证明typeof并不是万能的，他在面对出Null以外的**基本类型**变量是相当有威力的，但是再面对**引用类型变量**和`null`时都会被识别成`object`

## Object.prototype.toString.call(para);
前面的`typeof`死在半路，无法打探到**引用类型变量**和`null`的真实情报，但是我们得出了另一个情报：**他们都是`obejct`**。那么我们就完全可以利用`Object`原型上的`toString()`方法来判断

## 判断结果比较表
|      类型      |      值       | isNaN(para) |   !para    | typeof para |  toString(para)   |
| :----------: | :----------: | :---------: | :--------: | :---------: | :---------------: |
|   **Null**   |     null     |    true     |    true    |   obejct    |   [obejct Null]   |
| **Udefined** |   udefined   |    true     |    true    |    3333     | [obejct Udefined] |
| **Boolean**  |  true/false  |    true     | false/true |    true     | [obejct Boolean]  |
|  **Number**  |      -1      |    false    |   false    |   number    |  [obejct Number]  |
|  **Number**  |      0       |    false    |    true    |   number    |  [obejct Number]  |
|  **Number**  |      1       |    false    |   false    |   number    |  [obejct Number]  |
|  **Number**  |     NaN      |    false    |    true    |   number    | [obejct  Number]  |
|  **String**  |     '1'      |    false    |   false    |   string    |  [obejct String]  |
|  **String**  |     'a'      |    true     |   false    |   string    |  [obejct String]  |
|  **String**  |      ''      |    true     |    true    |   string    |  [obejct String]  |
|  **String**  |     ' '      |    true     |   false    |   string    |  [obejct String]  |
|  **Array**   |    []/[4]    |    true     |   false    |   obejct    |  [obejct Array]   |
|  **Object**  |   {}/{n:4}   |    true     |   false    |   obejct    |  [obejct Object]  |
| **Function** | function(){} |    true     |   false    |   obejct    | [obejct Function] |







