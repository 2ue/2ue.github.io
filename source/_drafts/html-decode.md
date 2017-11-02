---
title: 开发中html的转义和反转义与javascript的转码和解码？
date: 2017-10-17 9:44:42
author: J.2ue
tags:
- 转义
- 转码
- 解码
- javascript
categories:
- tips
---

> 如果数据库需要存储一段前端相关的代码，通常在存储之前我们往往需要转义或转码。当我们再次从数据库得到数据插入到页面时，可能也要转义和转码。

## 目的

通常而言，转义和转码的目的不同。

转义通常是为了保持信息的完整度和存储一致性：

- 像`<`和`>`这类符号已经用来表示`HTML`标签，因此就不能直接当作文本中的符号来使用。为了在`HTML`文档中使用这些符号，就需要定义它的转义字符串，当解释程序遇到这类字符串时就把它解释为真实的字符。
- 有些字符在`ASCII`字符集中没有定义，因此需要使用转义字符串来表示

转码通常是对于`javascript`代码，一般是为了安全

- 为了防止注入攻击（`XSS`），需要转义

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

总的来说，反转义有两种方法，一种利用正则的的方式匹配替换，另外一种则是利用浏览器内核自动转换

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

## 利用浏览器自动转义

当转义后的字符串直接插入到DOM中后，浏览器会自动进行反转义。众所周知，`e.innerHTML`可以取出DOM节点的内容，但是他取出的内容是转义后的内容，只有通过`e.childNodes[i].nodeValue`方法取出的内容才是反转义的内容。

``` javascript
function htmlDecode(_html) {
    var e = document.createElement('div'), res = '';
    e.innerHTML = _html;
    for(var i = 0; i < e.childNodes.length; i++){
        res += e.childNodes[i].nodeValue;
    };
    return res;
};
```

注意：`e.childNodes`是一个数组，他将`_html`分段（每65536字符分一段）存储到`e.childNodes[i]`中，使用`e.childNodes`方法取得反转义后的字符串需要循环`e.childNodes`数组

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
function htmlEncode(html) {
  return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
};
//获取Html   
function htmlDecode(html) {
  var a = document.createElement('a');
  a.innerHTML = html;  
  return a.textContent;  
};