---
title: Javascript系列 - Javascript数组方法
date: 2016-8-11 21:22:35
author: J.2ue
tags:
- Array
- 数组
categories:
- javascript
---

> Javascript的Array(数组对象)方法整理，对比他们的功能，返回值，分析他们的参数，以及具体的作用。

## length：获取数组长度

> - Method:  Arry.length
> - **被引用数组(Arry)是否改变:  NO**
> - Arguments:  无
> - Return:  返回被引用数组长度

``` javascript
var arry = [1,6,8,'2ue','o90']
arry.length //返回5，arry = [1,6,8,'2ue','o90']
```

## join：连接数组内各元素组成一个字符串

> - Method:  Arry.join(str)
> - **被引用数组(Arry)是否改变:  NO**
> - Arguments:  `str`非必需
>   - `str`不存在时(不传递str)以默认逗号连接元素
>   - `str`可以为任意字符串，也可以为空('')（字符串为空时，各元素之间无连接符号）
> - Return:  返回连接后的字符串

``` javascript
var arry = [1,6,8,'2ue','o90']
arry.join() //返回字符串1,6,8,2ue,o90，arry = [1,6,8,'2ue','o90']
arry.join('-') //返回字符串1-6-8-2ue-o90，arry = [1,6,8,'2ue','o90']
arry.join('') //返回字符串1682ueo90，arry = [1,6,8,'2ue','o90']
```

**注意如果需要加数组arry以逗号形式展示到页面，则不需要`.join()`方法，因为javascript的赋值操作会自动调用`.toString()`方法**，如

``` javascript
//JS
var arry = [1,6,8,'2ue','o90']
var divBox = document.getElementById('div');
divBox.innerHTML = arry;

//前面赋值的操作将会调用toString方法，因此
console.log(divBox) //<div id="div">1,6,8,2ue,o90</div>
```

## push：在数组尾部添加一个元素

> - Method:  Arry.push(value,...)
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  `value`非必需。
>   - `value`不存在(不传递str)返回被引用数组长度，无实际意义
>   - `value`可以为`合法的`布尔值，字符串，数组，对象，数字，`null`，`undefined`，空
>   - 其中，也可以接收多个参数
> - Return:  返回被引用数组长度

``` javascript
var arry = [1,6,8,'2ue','o90']
arry.push() //返回5，arry = [1,6,8,'2ue','o90']  实际没有任何意义
arry.push(true) //返回6，arry = [1,6,8,'2ue','o90',true]
arry.push('dmw') //返回7，arry = [1,6,8,'2ue','o90',true,'dmw']
arry.push('') //返回8，arry = [1,6,8,'2ue','o90',true,'dmw','']
arry.push(3) //返回9，arry = [1,6,8,'2ue','o90',true,'dmw','',3]
arry.push(undefined) //返回10，arry = [1,6,8,'2ue','o90',true,'dmw','',3,undefined]
arry.push(null) //返回11，arry = [1,6,8,'2ue','o90',true,'dmw','',3,undefined,null]
arry.push(['9','8']) //返回12，arry = [1,6,8,'2ue','o90',true,'dmw','',3,undefined,null,['9','8']]
arry.push({key:'hah'}) //返回13，arry = [1,6,8,'2ue','o90',true,'dmw','',3,undefined,null,['9','8'],{key:'hah'}]
//接收多个参数
var arry = [1,6,8,'2ue','o90']
arry.push(true,'dmw','',3,undefined,null,['9','8'],{key:'hah'})
//返回13，arry = [1,6,8,'2ue','o90',true,'dmw','',3,undefined,null,['9','8'],{key:'hah'}]
```

## unshift：在数组尾部添加一个元素

> - Method:  Arry.unshift(value,...)
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  `value`非必需。
>   - `value`不存在(不传递str)返回被引用数组长度，无实际意
>   - `value`可以为`合法的`布尔，字符串，数组，对象，数字，`null`，`undefined`，空
>   - 其中也可以接收多个参数。
> - Return:  返回被引用数组长度

同`.push()`方法

## concat：在尾部添加元素到数组

> - Method:  Arry.concat(value,...)
> - **被引用数组(Arry)是否改变:  NO**
> - Arguments:  `value`非必需。
>   - `value`不存在(不传递str)返回组成的新数组，无实际意
>   - `value`可以为`合法的`布尔，字符串，数组，对象，数字，`null`，`undefined`，空，也可以接收多个参数。
>   - 其中当`value`为数组时，那么添加的是数组中的元素，而不是数组，所以可以用`.concat()`来连接数组
> - Return:  返回组成的新数组

``` javascript
//返回值为一个新的数组，不改变原数组
//参数为数组时
var arry = [1,6,8,'2ue','o90']
var newArry = arry.concat(['lalal','mof'])
//返回值 newArry = [1,6,8,'2ue','o90','lalal','mof']
//原数组 arry = [1,6,8,'2ue','o90']
//其它情况同push方法一致
```

## pop：删除最后一个元素

> - Method:  Arry.pop()
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  无
> - Return:  返回被删除(最后一个)元素，被引用数组为空，不改变数组，返回`undefined`

``` javascript
var arry = [1]
arry.pop() //返回1，arry = []
arry.pop() //返回undefined，arry = []
```

## shift：删除第一个元素

> - Method:  Arry.shift()
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  无
> - Return:  返回被删除(第一个)元素，被引用数组为空，不改变数组，返回`undefined`

同`.pop()`

## reverse：颠倒数组元素顺序

> - Method:  Arry.reverse()
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  无
> - Return:  返回对数组的引用，返回值为数组类型

``` javascript
var arry = [1,6,8,'2ue','o90']
arry.reverse() //返回['o90','2ue',8,6,1] arry = ['o90','2ue',8,6,1]
```

## sort：数组元素排序

> - Method:  Arry.sort(fun)
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:  fun非必需
>   - **fun如果为空，那么默认安装字符编码的顺序进行排序**
>   - **如不为空，那么fun必须为函数类型**。
>   - Arry.sort(fun(value1,value2){})，fun函数参数`value1` 的值为`Arry[i]`，`value2` 的值为`Arry[i+1]`，其中`0< = i < Arry.length - 1`。所以请注意，`.sort()`方法排序会对被引用数组进行遍历，遍历的次数为`Arry.length - 1`，而非`Arry.length`。因为在`Arry.length - 1`次时，排序其实就已经完成了。
> - Return:  返回对数组的引用，返回值为数组类型

``` javascript
var arry = [1,'2ue','o90',6,890,9,7990]
arry.sort()//返回[1, "2ue", 6, 7990, 890, 9, "o90"] arry = [1, "2ue", 6, 7990, 890, 9, "o90"]
var arry = [1,65443,6,890,9,7990]
arry.sort(function(value1,value2){
    return value2-value1
})
//返回[65443, 7990, 890, 9, 6, 1] arry = [65443, 7990, 890, 9, 6, 1]
```

## slice：根据索引返回数组的一部分

> - Method:  Arry.slice(satrtIndex,endIndex)
> - **被引用数组(Arry)是否改变:  NO**
> - Arguments:
>   - `satrtIndex`开始索引(**不包含开始索引**)，必须，且必须为`nubmer`类型，正负皆可。为正或者`0(0,+0,-0)`表示从数组正向开始索引，为负表示从方向开始索引(**-1表示倒数的0**)。
>   - `endIndex`结束索引(**不包含结束索引**)，必须，且必须为`nubmer`类型，正负皆可。为正或者`0(0,+0,-0)`表示从数组正向开始索引，为负表示从方向开始索引(**-1表示倒数的0**)。
>   - 最终`satrtIndex`的实际值必须小于`endIndex`，且他们所在的那段索引必须与被引用数组的索引有交集，否则返回空数组。
> - Return:  根据索引返回数组的一部分，返回值为数组类型

``` javascript
//被引用数组值不会改变
var arry = [1,6,8,'2ue','o90']
arry.slice(1,3) //返回[6,8,'2ue']
arry.slice(3,1) //返回[]
arry.slice(-1,2) //返回[]
arry.slice(1,-2) //返回[6,8]
arry.slice(1,-4) //返回[]
arry.slice(-3,-1) //返回[6,8,'2ue']
arry.slice(-1,-3) //返回[]
```

## splice：移除元素

> - Method:  Arry.splice(satrtIndex, deleteCount, value, ...)
> - **被引用数组(Arry)是否改变:  YES**
> - Arguments:
>   - `satrtIndex`开始索引，必须，且必须为`nubmer`类型，正负皆可。为正或者`0(0,+0,-0)`表示从数组正向开始索引，为负表示从方向开始索引(**-1表示倒数的0**)。
>   - `deleteCount`将删除的个数，非必须，且必须为`nubmer`类型。从start开始，包括start所指的元素在内要删除的元素个数。这个参数是可选的，如果没有指定它，splice()将删除从start开始到原数组结尾的所有元素，小于等于0将不会删除。
>   - `value`要插入数组的零个或多个值，从start所指的下标处开始插入。可以为`合法的`布尔，字符串，数组，对象，数字，`null`，`undefined`，空，可接收多个参数。
> - Return:  被移除元素组成的数组

``` javascript
var arry = [1,6,8,'2ue','o90',4,5,6,7]
arry.splice(7)  // 返回 [6,7]; arry = [1,6,8,'2ue','o90',4,5]
arry.splice(1,2)  // 返回 [6,8]; arry = [1,'2ue','o90',4,5]
arry.splice(-1,1)  //返回 [5]; arry = [1,'o90',4]
arry.splice(0,0,2,3,[8,9])  // 返回 []; arry = [2,3,[8,9],1,'o90',4]
```

## 来一张表

|     方法名     |        功能         | 原数组是否改变 |      返回      |
| :---------: | :---------------: | :-----: | :----------: |
| **length**  |      获取数组长度       |   NO    |   被引用数组长度    |
|  **join**   | 将数组元素连接起来以构建一个字符串 |   NO    |   转换后的字符串    |
|  **push**   |      在尾部添加元素      | **YES** |    新数组长度     |
| **unshift** |      在头部添加元素      | **YES** |    新数组长度     |
| **concat**  |      在尾部添加元素      |   NO    |     新数组      |
|   **pop**   |     删除最后一个元素      | **YES** |    被删除元素     |
|  **shift**  |      删除第一个元素      | **YES** |    被删除元素     |
| **reverse** |     颠倒数组元素顺序      | **YES** |    对数组的引用    |
|  **sort**   |      数组元素排序       | **YES** |    对数组的引用    |
|  **slice**  |   根据索引返回数组的一部分    |   NO    | 根据索引返回数组的一部分 |
| **splice**  |   插入、删除或替换数组的元素   | **YES** |  被移除元素组成的数组  |
