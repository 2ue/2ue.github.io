---
title: mocha+chai使用记录
date: 2017-10-10 11:06:52
author: J.2ue
comments: true
tags:
- Javascript
- test
categories:
- libarys
---

>`mocha+chai`是比较流行的测试框架‘套装’，能实现一些基本的前端测试如函数功能测试，模拟登陆，异步测试,流程测试等

## 官方文档

### [mocha](http://mochajs.org/)
### [chai](http://chaijs.com/)

## 基本用法
>`mocha`是一个测试工具库，它只纯粹对测试行为(过程)进行描述；而`chai`是一个断言（推断）库，它可以将测试结果进行各种判断，以此推断是否符合预期，因此两者常常进行组合使用
### 安装
``` shell
//全局安装
$ npm install -g mocha
```
ps: 全局安装之后，`mocha`命令将会在全局注册，可以在任何地方使用`mocha`命令

``` shell
//安装项目依赖
$ npm install mocha chai
```
### 使用

### 目录结构
``` shell
├── test //测试用例
│   ├── hooks.js //生命钩子
│   ├── test.js //入口文件
│   └── unit //测试单例
│       ├── add.js
│       └── ...
└── src //业务代码
    ├── add.js
    └── ...
```
所有测试代码都在test目录，所有的业务代码都在src目录

### 一个简单的例子
``` javascript
//src/add.js
function add(a, b){
    return a + b;
}
module.exports = add;

```
``` javascript
//test/unit/add.js
var add = require('../../src/add.js');
var expect = require('chai').expect;

describe('加法函数', function () {
    it('1 + 3 = 4', function () {
        expect(add(1, 3)).to.be.equal(4);
    });
});
```
``` shell
$ mocha mocha/unit/add
  加法函数
    √ 1 + 3 = 4
  1 passing (16ms)
```

## Expect/Should/Assert
    The Expect / Should API covers the BDD assertion styles.
    The Assert API covers the TDD assertion style.

## 异步
- 非`promise`异步一定要带上`done()`，用于通知`mocha`该测试已经完成
- 异步通常和参数`-t`结合一起用

## 通配符
``` shell
//test/unit目录下add.js和minus.js
$ mocha test/unit/{add,minus}.js
//test/unit目录下所有js后缀的文件
$ mocha test/unit/*.js
```
`mocha`支持`shell`和`node`的通配符匹配规则，更多通配符规则可以查看各自的文档

## 命令行参数与配置文件mocha.opts
### 常用的命令行
- --recursive
`Mocha`默认不对指定目录的子级目录匹配，如果需要使自己目录的测试用例运行，则需要加上`--recursive`
- --reporter
输出报告的格式，默认是`--reporter spec`,可以用`--reporters`命令查看有哪些输出格式
- --watch
监听变化，每次修改自动执行test
- --timeout -t
`Mocha`默认每个测试用例最多执行`2000`毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用`-t`或`--timeout`参数指定超时门槛
- --hlep,-h
查看有哪些命令
`mocha.opts`放在`test`目录下，执行`mocha`命令时回去读取里面的配置
命令行参数可以写在`mocha.opts`文件内,如
``` shell
$ mocha --reporter tap --recursive -t 3000
```
等价于
`test/mocha.opts`文件内容
``` opts
--reporter tap
--recursive
-t 13000
```
``` shell
$ mocha
```

## hooks（钩子）
``` javascript
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```
可以写在测试用例内（每个`describe`块内），此时只对当前测试用例有效
也可以写在外部，此时对所有的测试用例有效

## 注意
- 内置`promise`对象
- `ES6`需要转码
