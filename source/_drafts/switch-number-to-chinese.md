---
title: 如何实现阿拉伯数字和中文数字互转
date: 2017-4-10 16:39:23
author: J.2ue
comments: true
tags:
- Javascript
- number
categories:
- utils
---

## 场景
> 在涉及到金融系统中，很多地方都会把阿拉伯数字转换成中文字。

## javascript的数值极限
> 在javascript的数值极限中Number类型的实质是64为浮点数，所以其能表示的数值范围-2^32到2^32。我们考虑此总极限情况的处理方式
- 方案一： 超过极限直接提示超出长度
- 方案二： 整个过程将数字转换成字符串类型，进行操作

## 中阿数值对照表及中文数字单位
### [中文数字单位](https://baike.baidu.com/item/%E6%95%B0%E5%AD%97%E5%8D%95%E4%BD%8D%E5%88%B6/394982?fr=aladdin)
> 一、十、百、千、万、亿、兆、京、垓、秭、穣、沟、涧、正、载、极、恒河沙、阿僧祇、那由他、不可思议、无量大数
对于`亿级`以上的单位除了`兆`用得稍多（相对于其它亿级以上单位），其它的单位在现实生活中基本上未使用。
- 保留所有单位，但需考虑亿级以上的单位是万进制，以下的十进制
- 去掉亿级单位，保留常用单位
### [中文数值对照表](https://baike.baidu.com/item/%E4%B8%AD%E6%96%87%E6%95%B0%E5%AD%97/2921705#1)
中文数值对照表分位繁体简体两种，可以考虑两种情况处理


``` javascript

//默认配置
var UNIT_ARRAY = ['千','百','十'];
var NUM_ARRAY = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var NUM_UNIT_ARRAY = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
var REG_DEL_REPEAT = /(.)\1+/g;
var REG_SPLIT_LEN = /(\d{4}(?=\d)(?!\d+\.|$))/g;


//以四位数分割
function splitNum(num,_len,_type){

    if(!num) return 0;

    return num.toString().replace(/\,/g,'').split('').reverse().join('').replace(REG_SPLIT_LEN, '$1,').split('').reverse().join('').split(',');

};

//拆分四位数，转换成几千几百几十几
function switchNum(num,_isFirst){
    // num 需要转换的数字
    //_isFirst 是否需要首位零，true表示不需要
    
    var _notFisrt = !_isFirst;
    //最终返回结果的数组
    var res = [];
    if(!num) return '';
    //不足四位的补足四位，以便补零
    num = num.split('').reverse().slice(0,4).reverse();

    for(let i = 0; i < num.length; i++){
    
        if(!num[i] || num[i] == 0) {
            // （i < num.length - 1 && (!num[i+1] || num[i+1] == 0) 在0-length-1（不包含边界）这个范围内，下一个为零，则当前不补位
            // i == num.length - 1如果最后一位为0，则不补位
            if(i < num.length - 1 && (!num[i+1] || num[i+1] == 0) || i == num.length - 1) {
                res.push('');
            }else{
                res.push(NUM_ARRAY[0]);
            }
            

        }else if(i != num.length - 1){
            res.push(NUM_ARRAY[num[i]] + UNIT_ARRAY[i])
        }else{
            res.push(NUM_ARRAY[num[i]])
        }
    };
    return res.join('').replace(REG_DEL_REPEAT,'$1');

}

//拼接
function jionNum (num) {
    // num = splitNum('300000000000047740230023050789');
    num = splitNum(num);

    var len = num.length;
    var reslt = '';
    for(let i = 0; i < len; i++){
        var temp = switchNum(num[i],i == 0);
        if(!temp) temp = NUM_ARRAY[0];
        if(len == 1 || len - 1 == i || temp == NUM_ARRAY[0]){
            reslt += temp;
        }else{
            reslt += (temp + NUM_UNIT_ARRAY[len - i - 2]);
        }
    };

    return reslt.replace(REG_DEL_REPEAT,'$1');
        
};

console.log(jionNum('300000000000047740230023050789'));
```

