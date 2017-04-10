---
title: 将阿拉伯数字转化成中文数字
date: 2017-4-10 16:39:23
author: J.Yof
comments: true
tags:
- Javascript
- number
categories:
- javascript
---

``` javascript
//默认配置
var UNIT_ARRAY = ['千','百','十'];
var NUM_ARRAY = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var NUM_UNIT_ARRAY = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];



//以四位数分割
function splitNum(num,_len,_type){

    if(!num) return 0;

    return num.toString().replace(/\,/g,'').split('').reverse().join('').replace(/(\d{4}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('').split(',');

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
    return res.join('').replace(/(.)\1+/g,'$1');

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

    return reslt.replace(/(.)\1+/g,'$1');
        
};

console.log(jionNum('300000000000047740230023050789'));
```

