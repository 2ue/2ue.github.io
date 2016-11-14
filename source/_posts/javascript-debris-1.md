---
title: 常用javascript碎片(1)
date: 2016-11-9 10:02:30
author: J.Yof
tags:
- javascript
categories:
- record
- sinpats
---

> 重复造轮子是一件痛苦的事，造好轮子找不到轮子确实一件更痛苦的事，因此本文记录了一下日常code中经常使用的一些javascript代码片段，以便下次使用时更方便的查找。



## 1.placeholder属性支持

```javascript
//修复不支持placeholder属性 start
var isSurportPlder = "placeholder" in document.createElement("input"); // 判断浏览器是否支持 placeholder
if (!isSurportPlder) {
  $("[placeholder]").focus(function () {
    var _this = $(this);
    if (_this.val() == _this.attr("placeholder")) {
      _this.val('');
    }
  }).blur(function () {
    var _this = $(this);
    if (_this.val() == '' || _this.val() == _this.attr("placeholder")) {
      _this.val(_this.attr("placeholder"));
    }
  }).blur();
};
```



## 2.转换时间，输出2016-08-02格式日期

```javascript
function formatDate(date) {

  var resDate = '';
  var _val = !date ? new Date() : new Date(date); //没传入时间则默认为当前系统时间
  var year = _val.getFullYear(),
      month = _val.getMonth() + 1,
      day = _val.getDate();

  month = (month < 10) ? ('0' + month) : month;
  day = (day < 10) ? ('0' + day) : day;
  resDate = year + '-' + month + '-' + day;

  return resDate;

};
```



## 3.判断浏览器版本(PC)

```javascript
function BrowserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    return fIEVersion;
  } //isIE end

  if (isFF) {
    return "FF";
  }
  if (isOpera) {
    return "Opera";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }
  if (isEdge) {
    return "Edge";
  }
  return 'Others';
}
```



## 4.数字转换成千分位格式(如：123,456,9.89)

```javascript
function translateThree(num) {
  var newNum = num.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
  return newNum;
}
```



