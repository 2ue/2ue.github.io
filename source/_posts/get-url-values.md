---
title: 利用javascrit获取url传递的参数
date: 2016-06-15 20:54:14
author:  J.Yof
tags:
- javascript
- url
categories:
- case
---

## 神奇的url

一条url包含了很丰富的信息，那么我们如何来获取这些信息并有效的加以利用呢?
随便举个例子：https://github.com/search?utf8=%E2%9C%93&q=javascript
这条url就是在github上搜索javascript后跳转页面对应的url。我们要做的就是获取'?'后面的参数，以及获取后可以用来做什么。

## 获取参数

### window.location的对象方法

![window.location的参数](/images/posts/windowLocation.png)

### 获取url所有的参数

url的参数其实就是'?'后那一部分，所以我们要做的就是把'?'后面的字符串数组化(对象化)。

``` javascript
function getUrlVal(){
//  https://github.com/search?utf8=%E2%9C%93&q=javascript
    var urlValStr = window.location.search.replace('?','');
    var urlValArry = urlValStr.split('&');
    //在实际中，可以根据所需保存为json或者对象，即也可以写成var urlValObject = [];
    var urlValObject = {};
    for(i in urlValArry){
        urlValObject[urlValArry[i].split('=')[0]] = urlValArry[i].split('=')[1];
    };
    return urlValObject;
};

console.log(getUrlVal());  //输出 Object {utf8: "%E2%9C%93", q: "javascript"}
```

### 获取url中指定键名(name)的键值(val)

方法一：利用上面的方法，然后获取指定参数
方法二：如果只获得指定键名的键值，其实没必要获得整个对象，直接通过已知的键名截取对应字符串就行了

``` javascript
function getOneVal(name){
//  'http://www.gotoplay.com/active?itemtype=sport&active=basketball&time=20160614&place=N230&peopleNum=657'
    var urlValStr = window.location.search.replace('?','');
    var afterNameStr = urlValStr.split(name)[1];
    var strFirstSite = afterNameStr.indexOf('&');
    strFirstSite = (strFirstSite == -1) ? afterNameStr.length : strFirstSite // 返回第一个&位置，如果没有'&'则返回字符串长度
    var val = afterNameStr.slice(1,strFirstSite);
    return val;
};

console.log(getOneVal('time'))  //输出20160614
console.log(getOneVal('peopleNum'))  //657
```

## 参数的利用

在项目中这些参数有哪些用处呢？

### 导航定位

什么是导航定位？就是点击导航栏的标签，页面跳转后，对应的标签相应的会突出变化。如下图：
![navLocation](/images/posts/navLocation.png)

跳转后有两种情况：
一种ajax异步刷新，只是局部页面发生变化，因为可以直接用点击事件来控制。
另外一种比较常见的方式就是整个页面刷新，这种情况下，点击事件就没用了，就必须另辟蹊径：
    1.比较传统的方法就是每个页面里面写一段CSS样式来控制
    2.那么另外一种不用说就是通过url的参数来定位咯
假如用每个页面写CSS样式来控制，可以明显感受到的弊端是：每次新的页面都需要修改对应的CSS
那么利用url来控制又需要做哪些事呢？
    1.首先需要约定参数，并且后台来传递这些参数
    2.然后在导航栏部分，对应的地方加上参数值，这一步，导航栏都是公用模板，并且规则都一样，所以只需要一次添加
    3.跳转后定位

## html代码

``` html
<div class="nav">
    <a href="/index.htm?nav=index">首页</a>
    <a href="/layout/post.htm?nav=post">文章</a>
    <a href="/layout/tag.htm?nav=tags">标签</a>
    <a href="/layout/about.htm?nav=aboutUs">关于我</a>
</div>
```

### js代码

``` javascript
function getOneVal(name,urlValStr){
    var afterNameStr = urlValStr.split(name)[1];
    var strFirstSite = afterNameStr.indexOf('&');
    strFirstSite = (strFirstSite == -1) ? afterNameStr.length : strFirstSit;
    var val = afterNameStr.slice(1,strFirstSite);
    return val;
};

var thisUrlVal = window.location.search.replace('?','');
var thisNVal = getOneVal('nav',urlValStr);

//定位
$('.nav a').each(function(){
    var _this = $(this);
    var urlValStr = _this.attr('href').split('?')[1];
    var nVal = getOneVal('nav',urlValStr);
    if(nVal == thisNVal) {
        _this.addClass('on');
    }
})
```