---
title: 如何写一个日历组件
date: 2017-11-2 10:08:43
author: J.2ue
tags:
- 日历
- kalendar
categories:
- javascript
---

> 众所周知，虽然`javascript`中关于时间的API有不少，我们可以通过方法单独的获取年、月、日、时、分、秒、毫秒...貌似很多，最近写了一个日历（以前写的，但写得很烂，最近优化一下），所以下面简单的记录一下如何写一个日历，列出了一些我在写日历过程中自己封装的一些方法

## 效果图

先来一张效果图，由于没有UI设计，所以就自己简单的设计了一个样式（好歹我也是设计专业的，虽然已不做设计很多年），虽然略丑，但重要的是功能！！！

![datepicker](/images/posts/datepicker.gif)

## 思路

一个日历到底是怎样用代码生成的？其实观察一下现有的日历展现形式，可以很快的形成思路，就是：根据计算把日期号数对应到正确的星期几上，并按照顺序逐一输出。
以下是我的思路:
- 取得月份的天数
- 取得月份第一天是星期几
- 循环对应号数和星期几返回一个数组对象
    - 返回数组对象的每一个子项至少包含：号数，星期几，然后根据情况添加：是否高亮，是否当前月，是否节日...等属性

## 方法封装

注意，为了保持方便调用`javascript`的方法，以及保持输出结果符合实际，所有的方法都有如下约定：
- 在计算过程中
    - 所有的关于月份都是0~11的数字
    - 所有的关于星期都是0~6的数字
- 在输出的结果中
    - 所有关于月份的输出默认都是1-12的数字
    - 所有关于星期的输出默认都是1-7的数字

所以在向调用方法传递参数过程中，月份以及星期几统统都需要按照实际月份减一

### 获取月份天数

在`javascript`中没有直接获取月份天数的方法，但是它提供了一个`getDate`方法可以获取日期的某一天。那我们只需要获取月份的最后一天（下一个月的第0天）就可以得知这个月的天数：

``` javascript
// year是要获取的年份，闰年不一样
// month是要获取的月份
// 返回当前月天数
function getMonthDays(year, month){
    return new Date(year, month + 1, 0).getDate();
}

getMonthDays(2016,2) //29
getMonthDays(2017,2) //28
```

### 获取星期几

``` javascript
// year是要获取的年份
// month是要获取的月份
// 返回数字几则是星期几
function getWeekday(year, month, day){
    return new Date(year, month, day).getDate() + 1;
}

getWeekday(2016,10,9) //输出4，表示2016年11月9是星期4
getWeekday(2017,10,9) //输出5，表示2017年11月9是星期5

```

### 获取月份有几个星期

要计算月份包含几个星期，需要两个数据：月份天数和月份第一天是星期几，就能得到想要的结果

``` javascript
// year是要获取的年份
// month是要获取的月份
// 返回当前月包含几个星期
function getweeksInMonth(year, month){

    var days = getMonthDays(year, month);
    var FirstDayWeekday = getWeekday(year, month, 1);
    return Math.ceil(days + FirstDayWeekday);
}
```

### 循环生成月份对象

有了以上方法之后，就可以通过循环生成一个简单的月份对象了。
在这里需要注意，日历的排序有两种：
- 每一行以星期日开头
- 每一行以星期开头

``` javascript
// year是要获取的年份
// month是要获取的月份
// day天，用来判断是否是当前天
// type表明要星期几开头，0为星期一开头，1为星期日开头，默认为0
// 返回当前月包含几个星期

const WEEKTABLE = [{
    cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    cns: ['日', '一', '二', '三', '四', '五', '六'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
},{
    cn: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    cns: ['一', '二', '三', '四', '五', '六', '日'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}]

getMonthDaysArray(year, month, day， type) {
    if (typeof day === 'undefined' && year === YEAR && month === MONTH) day = DAY;

    var dayArrays = [];
    var days = this.getMonthDays(year, month), preDays = this.getMonthDays(year, month - 1);
    var thisMonthFirstDayInWeek = this.getWeekday(year, month, 1), thisMonthLastDayInWeek = this.getWeekday(year, month, days);

    type = !type || type !== 1 ? 0 : 1;

    //上月在当月日历面板中的排列
    for (var i = 0; i < thisMonthFirstDayInWeek; i++) {
        dayArrays.push({
            dayNum: (preDays - thisMonthFirstDayInWeek + i + 1),
            weekDay: WEEKTABLE[type].cn[i]
        })
    }
    //当月日历面板中的排列
    for (var i = 1; i <= days; i++) {
        var weekDayFlag = (thisMonthFirstDayInWeek + i - 1) % 7
        dayArrays.push({
            dayNum: i,
            weekDay: WEEKTABLE[type].cn[weekDayFlag],
            selected: i === +day,
            isThisMonth: true
        })
    };
    //下月在当月日历面板中的排列
    for (var i = 1; i <= (6 - thisMonthLastDayInWeek); i++) {
        var weekDayFlag = (thisMonthFirstDayInWeek + days + i - 1) % 7
        dayArrays.push({
            dayNum: i,
            weekDay: WEEKTABLE[type].cn[weekDayFlag]
        })
    };
    return dayArrays;
}
```

### 格式化时间

涉及到时间时，常常需要把时间格式进行转换，为了应对多中需求，所以自己封装了一个

``` javascript
// 参数fmt必须
// date参数不必须，允许字符串和时间对象，不传或者传无法转换成合法时间对象的字符串则默认当前时间,
// 年(YYYY/yyyy)固定四个占位符
// 月(M)、日(d)、小时(h)、分(m)、秒(s)可以用 1-2个占位符,严格区分大小写，
// 毫秒（ms/mss）最多三个占位符，分别对应56，056这种类型
// 例子：
// (Format("yyyy-MM-dd hh:mm:ss:ms") ==> 2006-07-02 08:09:04:23
// (Format("yyyy-MM-dd hh:mm:ss:mss") ==> 2006-07-02 08:09:04:023
// (Format("yyyy-M-d h:m:s:ms")      ==> 2006-7-2 8:9:4.180
function formate(fmt, date){
    date = new Date(date).toString() === 'Invalid Date' ? new Date() : new Date(date);
    var _rules = [{
        rule: '[yY]{4}',
        value: _date.getFullYear()
    }, {
        rule: 'M+',
        value: _date.getMonth() + 1
    }, {
        rule: '[dD]+',
        value: _date.getDate()
    }, {
        rule: 'h+',
        value: _date.getHours()
    }, {
        rule: 'm+',
        value: _date.getMinutes()
    }, {
        rule: 's+',
        value: _date.getSeconds()
    }, {
        rule: 'ms{1,2}',
        value: _date.getMilliseconds()
    }];

    _rules.forEach(function (_r){
        const rule = _r.rule, val = _r.value;
        fmt = fmt.replace(new RegExp(rule), function ($1) {
            const rLen = val.toString().length, fLen = $1.length;
            return (fLen !== 2 || rLen >= fLen) ? val : ['00', val].join().substr(rLen);
        });
    });
    return fmt;
}
//调用：
var time1 = formate("YYYY/MM/DD hh:mm:ss", new Date()); //2017/11/2 11:09:20
var time2 = formate("YYYY-MM-DD", time1); //2017-11-2
var time3 = formate("MM-DD-YYYY", time2); //11-2-2017
```

## 最后

附上这些方法的源码[datepicker](https://github.com/2ue/vui/blob/master/src/utils/datepicker.js)
基于vue实现的一个demo[vue-datepicker](https://2ue.github.io/vui/#/DatePicker)
当然这只是最简单的日历输出，思路也是超级简单（感觉有点Low），如果有大神愿意分享它的经验欢迎，来邮~
