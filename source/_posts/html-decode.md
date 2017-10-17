---
title: 如何使用javascript优雅的实现html代码转义和反转义？
date: 2017-10-17 9:44:42
author: J.2ue
tags:
- javascript
- html转义
categories:
- tips
---

> 如果数据库需要存储一段前端相关（主要是html/javascript）的代码，通常在存储之前我们往往需要转义。当我们再次取出这段代码放到页面时，就需要反转义。



## 转义的目的

凡事多问10万个为什么？那么我们为什么要转义呢？主要有两方面的原因：

- 像“<”和“>”这类符号已经用来表示HTML标签，因此就不能直接当作文本中的符号来使用。为了在HTML文档中使用这些符号，就需要定义它的转义字符串。当解释程序遇到这类字符串时就把它解释为真实的字符
- 有些字符在ASCII字符集中没有定义，因此需要使用转义字符串来表示
- `HTML`代码中也许包含有`javascript`等代码，为了防止注入攻击（`XSR`），需要转义

## 转义字符串的组成

转义字符串（`Escape Sequence`），即字符实体（`Character Entity`）分成三部分：第一部分是一个`&`符号，英文叫`ampersand`；第二部分是实体（`Entity`）名字或者是#加上实体（`Entity`）编号；第三部分是一个分号。比如，要显示小于号（`<`），就可以写 `&lt;`或者 `&#60;`。
注意：
- 实体名称（`Entity`）是区分大小写的
- 同一个符号，可以用“实体名称”和“实体编号”两种方式引用，“实体名称”的优势在于便于记忆，但不能保证所有的浏览器都能顺利识别它，而“实体编号”则没有这种担忧，但它实在不方便记忆。
- “实体编号”可以通过`javascript`的`fromCharCode`方法来转换成字符串，但是“实体名称”则不行。

|    方法名     |   功能   | 原数组是否改变 |   返回    |
| :--------: | :----: | :-----: | :-----: |
| **length** | 获取数组长度 |   NO    | 被引用数组长度 |

## 转义

## 反转义
总的来说，反转义有两种方法，一种利用正则的的方式匹配替换，另外一种则是利用浏览器内核自动转码

### 利用正则


``` javascript

this.HTML_DECODE = {
    "<"  : "<", 
    ">"  : ">", 
    "&" : "&", 
    " ": " ", 
    """: "\"", 
    "©": "©"
};
(function getSTr(str){
    str.replace(/&\w+;|&#(\d+);/g,function($0,$1) {
        console.log('$0==>',$0)
        console.log('$1==>',$1)
    })
})('&lt;&#890;&99&#00&0x99;')
```

http://tool.oschina.net/commons?type=2

常用HTML转义字符,html转义符,JavaScript转义符,html转义字符表,HTML语言特殊字符对照表(ISO Latin-1字符集) - 来源：嘻嘻网 114.xixik.com
http://114.xixik.com/character/

转义字符_百度百科
https://baike.baidu.com/item/%E8%BD%AC%E4%B9%89%E5%AD%97%E7%AC%A6/86397?fr=aladdin

js字符实体 转义字符串 - 孟宇 - 博客园
http://www.cnblogs.com/mengyuxin/p/5970687.html

用Javascript（js）进行HTML转义工具（处理特殊字符显示） - 程序猿开发日志【学习永无止境】 - CSDN博客
http://blog.csdn.net/hj7jay/article/details/51280405

JS对HTML字符的转义和反转义 - CSDN博客
http://blog.csdn.net/u013026207/article/details/53994032

文字编码简介 - CSDN博客
http://blog.csdn.net/guolb57/article/details/6260215

function toWeirdCase(string){
  //TODO
  return string.replace(/([a-zA-z])(([a-zA-z]|\s)|)/g,(a,b,c) => (b.toUpperCase() + c))
}


function htmlDecode(str) {
    let e = document.createElement('div'), _html = '';
    e.innerHTML = pxToRem(str);
    for(let i = 0; i < e.childNodes.length; i++){
        _html += e.childNodes[i].nodeValue;
    };
    return _html;
};

//获取Html转义字符  
function htmlEncode( html ) {  
  return document.createElement( 'a' ).appendChild(   
         document.createTextNode( html ) ).parentNode.innerHTML;  
};  
//获取Html   
function htmlDecode( html ) {  
  var a = document.createElement( 'a' ); a.innerHTML = html;  
  return a.textContent;  
};