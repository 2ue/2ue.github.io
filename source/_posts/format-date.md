---
title: 前端时间格式化
date: 2016-06-15 15:12:24
author: J.Yof
tags:
- date
- javascirpt
categories:
- code
- case
---

## 格式化时间
需求比较简单，把标准时间格式化为'2016-06-14'这种格式。

``` javascript
function formateDate (date,char){
    //char为连接年月日的字符
    var year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();
    month = (month < 10) ? ('0' + month) : month;
    day = (day < 10) ? ('0' + day) : day;
    var time = year + char + month + char + day;
    return time;
}
```


上述方法确实也解决了需求，但是应对需求变化的灵活性远远不足，比如需要格式化为'2016-06-14 15:22:40'这样的格式，再去按照这种方式实现显得比较冗余。所以在网上扒了一下，发现已有大神们解决了这个问题，下面这种方法个人比较喜欢，也是比较简洁的一种方式。

``` javascript
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//调用：
var time1 = new Date().Format("yyyy-MM-dd");
var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
```

## 注意
在实际生产过程中，我们的值可能来自于后台或者在页面的某一处取得，此时，如果我们直接对这些字符串格式化是会报错的，因为getFullYear等方法是不能处理一般格式的字符串的，所以，必须把字符串new Date()一下，才可以使用getFullYear()等方法。

``` javascript
var str = getFromBackTime;
var date = new Date(str).Format("yyyy-MM-dd");
```

