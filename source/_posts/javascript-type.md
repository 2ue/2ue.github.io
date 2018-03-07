---
title: Javascript常用见问题之变量类型判断终极篇
date: 2017-3-31 17:05:06
author: J.2ue
comments: true
tags:
- typeof
- object
categories:
- Javascript
---

> 类型判断是我们在编程中常遇到的棘手问题，严格的变量类型约束会为代码减少很多致命的BUG。本文是对常用到的类型判断的一个整理，以求以最简洁的方式来判断变量的类型。<br/>本文所有的如果没特指，都是基于ES5的原生javascript

## 变量的基本类型

`JavaScript`变量包含两种不同的数据类型的值：**基本类型**和**引用类型**。基本类型是指简单的数据，有`Number`、`String`、`Boolean`、`Udefined`、`Null`(null可以算作是一个特殊的基本数据类型)，而引用类型指那些可能包含多个值的对象，有`Object`、`Array`、`Date`、`RegExp`、`Function`等。在`JavaScript`中，我们通过`var`来声明变量，由于`JavaScript`是若语言类型，我们无法在申明的时候规定他的类型，`JavaScript`变量的类型是随变量的值改变而改变的。为了代码的安全性，在有些情况下我们要判断变量值的类型，如何正确的判断变量的类型就成了一个比较有深度的问题。下图列举一些常见的类型：

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

判断他们的类型，第一时间可能你会想到用`typeof`去检测它们的类型，然后你就崩溃了：明明是`Null`为什么结果却是`oject`，明明是`Array`为什么还是`obejct`？...因此可以看出`typeof`方法不是很可靠，我们必须寻找一种行之有效的方法来解决这个问题？请继续往下读(为了方便阅读，下文中所有的`para`表示要判断的变量)：

- isNaN(para)
- !para
- typeof para
- Object.prototype.toString.call(para);

除了上面这些方法，未来可能会有更多方法来增强变量的约束和判断，比如`isNumber`等

## isNaN(para)

用来判断是否为`number`类型的专有方法。但是需要注意的是，如果使用`typeof`判断那么结果会是`number`。

## !para

常用来判断一个变量是否存在，面对`Arry`、`Object`等**引用类型变量**时无论是否为空都会被转换成`true`

## typeof para

事实证明`typeof`并不是万能的，在对除`Null`以外的**基本类型**变量是相当有威力的，但是对**引用类型变量**和`Null`时都会被识别成`object`，但是请注意：

```javascript
typeof {}; //object
typeof Object; //Function
```
为什么会出现这样的情况呢？因为`Object`是一个构造函数，而不是`object`数据类型对象，同理`Array`，`Date`，`Function`等都是属于构造函数

## Object.prototype.toString.call(para)

前面的`typeof`死在半路，无法打探到**引用类型变量**和`null`的真实情报，但是我们得出了另一个情报：**他们都是`obejct`**。别慌，我们另外一个强大的武器，可以直指要害，`Object.prototype.toString.call(para)`

## 判断结果比较表

|      类型      |      值       | isNaN(para) |   !para    | typeof para |  toString(para)   |
| :----------: | :----------: | :---------: | :--------: | :---------: | :---------------: |
|   **Null**   |     null     |    true     |    true    |   obejct    |   [obejct Null]   |
| **Udefined** |   udefined   |    true     |    true    |  udefined   | [obejct Udefined] |
| **Boolean**  |  true/false  |    true     | false/true |    true     | [obejct Boolean]  |
|  **Number**  |      -1      |    false    |   false    |   number    |  [obejct Number]  |
|  **Number**  |      0       |    false    |    true    |   number    |  [obejct Number]  |
|  **Number**  |      1       |    false    |   false    |   number    |  [obejct Number]  |
|  **Number**  |     NaN      |    true    |    true    |   number    | [obejct  Number]  |
|  **String**  |     '1'      |    false    |   false    |   string    |  [obejct String]  |
|  **String**  |     'a'      |    true     |   false    |   string    |  [obejct String]  |
|  **String**  |      ''      |    true     |    true    |   string    |  [obejct String]  |
|  **String**  |     ' '(中间包含空格)      |    true     |   false    |   string    |  [obejct String]  |
|  **Array**   |    []/[4]    |    true     |   false    |   obejct    |  [obejct Array]   |
|  **Object**  |   {}/{n:4}   |    true     |   false    |   obejct    |  [obejct Object]  |
| **Function** | function(){} |    true     |   false    |   obejct    | [obejct Function] |

## 总结方法

根据上面的表格对比，我整理了一些常见的方法。并且再比较结果精准的情况下尽可能的简化比较过程.

#### 判断数字(非严格)

字符串'`1`'会被识别成`number`

``` javascript
function isNumber(para){
    return !isNaN(para);
};
```

#### 判断数字(严格)

在必要的情况下使用：此方法会把字符串'`1`'识别成`string`类型

``` javascript
function isStrictNumber(para){
    return !isNaN(para) && typeof para === 'number';
};
```

#### 判断字符串（非严格）

``` javascript
function isString(para){
    return typeof para === 'string';
};
```

#### 判断字符串（严格）

在必要的情况下使用：此种方法会把字符串'`1`'识别成`number`类型

``` javascript
function isStrictString(para){
    return isNaN(para) && typeof para === 'string';
};
```

#### 判断一般数据类型(即非引用类型)

注意：使用typeof判断`null`结果为`object`

``` javascript
function isBasicType(para){
    return typeof para !== 'obejct';
};
```

#### 判断是否为null(不能识别'')

此方法只能识别`null`，如果要包含''，请结合方法`isStringNull()`一起使用

``` javascript
function isNull(para){
    return !para && typeof para === 'object';
};
```

#### 判断是否为空字符串(不包含空格)

此方法只能识别`''`，如果要包含`null`，请结合方法`isNull()`一起使用

``` javascript
function isStringtNull(para){
    return !para && typeof para === 'string';
};
```

#### 判断是否为`undefined`

``` javascript
function isUndefined(para){
    return typeof para === 'undefined';
};
```

#### 判断是否为`false`

当为`null`,`undefined`,`''`,`0`,`-0`,`false`,`NaN`

``` javascript
function isFalse(para){
    return !para;
};
```

#### 判断对象（非严格1--所有的obejct对象）

``` javascript
function isAllObject(_v){
    return typeof _v === 'obejct';
};
```

#### 判断对象（非严格2--除去null的所有object对象）<--> 判断引用类型

``` javascript
function isObject(_v){
    return !!v && typeof _v === 'obejct';
};
```

#### 判断对象（严格--只识别{}JSON对象）

``` javascript
function isStrictObject(_v){
    return Object.prototype.toString.call(_v) === '[object Object]';
};
```

#### 判断数组

``` javascript
function isArray(para){
    return Object.prototype.toString.call(para) === '[object Array]';
};
```

#### 判断对象

这里特指{}类`JSON`对象

``` javascript
function isObject(para){
    return Object.prototype.toString.call(para) === '[object Object]';
};
```

#### 判断可执行函数

``` javascript
function isFunction(para){
    return typeof para === 'function';
};
```

------------

## 总结

当我们需要判断其他类型时，完全可以参照上面的表来写出自己的方法哦。
当然现在前端各种流行库不断推陈出新，我们完全可以直接使用别人封装好的库来实现这些功能，比如`underscore.js`、`lodash.js`等，但是编码的乐趣不就是在于自己解决最本质的问题么。所以即使有这么多的流行库大行其道，也不妨碍我们了解这些知识的初心，说不定哪天你自己也写出一个很火的库呢~
当然随着ES6标准的不断被各大浏览器厂商支持，ES6的普及度越来越广，这些方法都会被内置到原生`javascript`内部吧(有些方法已经加进去了~)。
