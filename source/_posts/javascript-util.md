---
title: Javascript常用见问题之判断类型
date: 2017-3-31 17:05:06
author: J.Yof
comments: true
tags:
- Javascript
categories:
- util
---

> 类型判断是我们在编程中常遇到的一个问题，严格的变量类型约束会为代码减少很多致命的BUG。本文是对常用到的类型判断的一个整理，以求以最简洁的方式来判断变量的类型。

## 变量的基本类型
众所周知，`JavaScript`中变量可能包含两种不同的数据类型的值：**基本类型**和**引用类型**。基本类型是指简单的数据段，有`Number`、`String`、`Boolean`、`Udefined`、`Null`，而引用类型指那些可能包含多个值的对象，有`Object`、`Array`、`Date`、`RegExp`、`Function`。在`JavaScript(ES5)`中，我们通过`var`来声明变量，由于`JavaScript`是若语言类型，我们无法在申明的时候规定他的类型，`JavaScript`变量的类型是随变量的值改变而改变的。所以我们要判断变量值的类型。下图列举一些常见的类型

|   类型   |   Null    | Udefined |    Boolean    |     Number    |   String   |
| :-----: | :--------: | :------: | :-----------: | :-----------: | :-------: |
|   类型   |   null    | udefined<br/>未赋值的变量 |    true,false    |     -1,0,1,NaN    |   '1','a'   |


|   类型   |   举例    |
| :-----: | :-----: |
| **Null**  |  null |
|  **Udefined** | udefined、未赋值的变量 |
|  **Boolean**   |  true、false  |
| **Number** | -1、0 、 1、 NaN  |
| **String**  |  '1'、'a'  |
|   **Array**  |  []、new Array()  |
|  **Object**  |  {}、new Object()  |
| **Function** |  function(){}  |