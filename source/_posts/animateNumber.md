---
title: 实现数字滚动变化以及延伸
date: 2016-06-14 12:39:19
author: J.Yof
comments: true
tags:
- animation
- javascript
categories:
- case
---

>利用jquery.animateNumber插件实现一个简单的数字滚动效果

## 需求分析

1. 后台传过来的值是123,989,90或者9,123.00这样的数据，所以必须格式化数据；
2. 根据页面设计的效果图（如图），需要把数字字符串拆分成单个数字字符串

![animateNumber_01](/images/posts/animateNumber_01.png)

3. 每一个数字进行滚动变化
4. 最后，在项目中，我选取了插件[jquery.animateNumber](http://aishek.github.io/jquery-animateNumber/)来实现滚动效果。这个插件的使用方式很简单，在官方有很详尽的文档来展示各个案例，就不一一赘述了。


## HTML布局
其中num是后台传入的值,notChangeUint用来标记不进行单位变换的值

``` html
<div class="warp">
    <div class="net-credit-num" >
        <p>平台累积会员人数（人）</p>
        <span date-num="123" class="animateNumber notChangeUint"></span>
    </div>
    <div class="net-credit-money">
        <p>平台完成投资金额（万元）</p>
        <span date-num="91,123,456.00" class="animateNumber"></span>
    </div>
    <div class="net-return-money">
        <p>累计已还款金额（万元）</p>
        <span date-num="8,895,678.00" class="animateNumber"></span>
    </div>
</div>
```
## 撸JS

### 去除逗号(,)

``` js
num = num.replace(',','');
```

上面这种方法只能去除字符串中的第一个逗号，但是实际数据中可能存在多个逗号，所以需要用到正则全局匹配替换，代码如下：

``` js
var reg = new RegExp(',','g');
num = num.replace(reg,'');
```

### 转化单位(元-->万元)
把金额单位转化为万元，并且保留两位小数，人数不进行转化

``` javascript
if(!numWarpParent.hasClass('notChangeUint')){
    num = (Number(num) / 10000).toFixed(2);
}
```

### 字符串拆分为数组

``` javascript
numArry = num.split('');
```

### 把数字添加到页面并调用animateNumber的方法
``` js
for(var i = 0; i < numArry.length; i++){
    var thisNum = parseInt(numArry[i]);
    var spanNum;
    if (!isNaN(thisNum)){
        spanNum = $('<span class="single-num">' + numArry[i] +'</span>');
    }else{
        spanNum = $('<span class="single-point">.</span>');
    };
    numWarpParent.append(spanNum);
    thisNumWarp.prop('number', stratNum).animateNumber({
        number: thisNum
    }, time);
}
```

## 最后代码
``` javascript
$('.animateNumber').each(function(){
    var _this = $(this);
    var totalNum = _this.attr('date-num'); //后台数据储存在date-num上
    appendNum(totalNum,_this);
});
function appendNum(num,numWarpParent){
    var newNum;
    var reg = new RegExp(',','g'); //正则匹配所有逗号
    newNum = num.replace(reg,'');
    if(isNaN(num)) newNum = 0;  //容错，当后台传入的参数错误(非数字)时，将只值置为0，以保证页面的正常渲染
    if(!numWarpParent.hasClass('notChangeUint')){ //判断是否需要转换单位
        newNum = (Number(newNum) / 10000).toFixed(2);
    };
    numArry = newNum.split('');
    for(var i = 0; i < numArry.length; i++){
        var thisNum = numArry[i];
        var numWarp;
        if (!isNaN(thisNum)){ //判断是否可以转化为数字
            numWarp = $('<label class="single-num">' + numArry[i] +'</label>');
        }else{
            numWarp = $('<label class="single-point">.</label>');
        };
        numWarpParent.append(numWarp);
        isAnimate(thisNum,numWarpParent,i);
    };
};
function isAnimate(num,numWarpParent,index){
    if (isNaN(num))return;
    //调用animate.js插件方法
    numWarpParent.find('label').eq(index).prop('number', 0).animateNumber({
        number: num
    }, num * 100);
};
```

## 总结
1.功能模块化，尽量一个方法(函数)只做一件事情
2.容错，由于涉及到DOM操作，所以为了保证页面的正常渲染必须有容错处理机制：数据出错不影响整个流程(页面渲染)的畅通