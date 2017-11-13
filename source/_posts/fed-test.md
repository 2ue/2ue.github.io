---
title: 前端测试探索
date: 2017-10-10 10:06:30
author: J.2ue
comments: true
tags:
- 自动化测试
- 前端测试
categories:
- test
---


> 前端测试是保证代码质量以及程序稳定的一种可靠方式，同时也从代码层面解决了自测难，自测烦等前端测试综合症。当然在前端开发引入测试环节无疑会增加人力和时间成本，如果最终产生的结果和增加的成本能够两两抵消产生正面效应，那么有必要考虑把测试环节加入到团队的规划中。

Ps：本次更多的是讲述概念性的东西，代码性的具体实例不做过多实践

------
## GUI(Graphical User Interface)软件测试

> 前端测试不同于后端测试，因为除了一般的逻辑测试以外，由于存在界面交互，所以涉及到模拟用户行为达到测试的目的。由此引入了一个概念：GUI(Graphical User Interface)软件测试，也就是图形用户界面软件测试

## TDD(Test Driven Development) & BDD(Behaviour Driven Development)

`TDD`很明显的意思是测试驱动开发，也就是说我们可以从测试的角度来检验整个项目。大概的流程是先针对每个功能点抽象出接口代码，然后编写单元测试代码，接下来实现接口，运行单元测试代码，循环此过程，直到整个单元测试都通过。
`TDD`的好处自然不用多说，它能让你减少程序逻辑方面的错误，尽可能的减少项目中的`bug`，开始接触编程的时候我们大都有过这样的体验，可能你觉得完成得很完美，自我感觉良好，但是实际测试或者应用的时候才发现里面可能存在一堆bug，或者存在设计问题，或者更严重的逻辑问题，而`TDD`正好可以帮助我们尽量减少类似事件的发生。
当然，并不是所有的项目都适合`TDD`，要使用`TDD`,我认为必须至少具备以下两个条件

- 项目的业务逻辑很清晰，并且程序员对开发逻辑很清晰
- 项目模块的复杂度和依赖度不高。如果复杂度高和依赖度高会导致在最开始拆分单元的时候造成很大的困扰，有可能根本不能顺利拆分

`BDD`行为驱动开发，这里的行为不是指程序员的行为，而是指业务（程序）的逻辑行为，实际上`BDD`可以看作是对`TDD`的一种补充，当然你也可以把它看作`TDD`的一个分支，因为在`TDD`中，我们并不能完全保证根据设计所编写的测试就是用户所期望的功能

## 如何实现自动化

说一千道一万，新环节的引入必然带来成本的增加，那么我们如何控制增加的成本在合理范围内？很自然的我们想到了使用工具来实现自动化的测试，让机器帮我完成复杂的交互和测试，并自动监控返回错误报警，为我们手动排除问题提供参考

## 可覆盖的测试

> 那到底前端在开发中需要测试哪些东西？在目前技术又可以实现那些测试？

- 函数功能测试
  - 全局变量
  - 公共方法
- 界面&交互测试
  - 事件交互
  - 数据输入交互
  - 特征检测
    - 设计图还原度
    - 图片大小
    - ...
  - 特殊情况
    - 自适应和响应式测试
    - 浏览器兼容
    - 多端测试
    - ...
- 网络请求测试
  - 数据库访问
  - 模拟用户登陆等
  - ajax请求
- 直观的错误信息展示
    - 网页表格
    - 截图
- 性能测试
- 回归测试
- 自动化
  - 测试用例数据自动化 - 结合mockjs打造假数据
  - 测试用例自动化创建 - 通过读取源码中的注释来自动生成测试用例？

## 业务逻辑/业务代码/测试用例的关系

业务代码的颗粒度与测试用例的复杂度成反比：颗粒度划分越多（细），复杂度越低
业务代码的量与测试用例的量成正比

## Good

- 相对于等待问题产生，更倾向于避免可能的问题
- 有利于形成团队代码规范，对团队未来成员的扩充是一个很好的约束规范
- 对输出的产品有进一步的质量保证

## Bad

- 增加维护测试用例本（时间和人力）
- 增加编码复杂度（需要靠如何更友好的进行测试），对团队人员的编码要求提高了
- 也许会增加学习成本（并不一定所有人都会写测试用例）
- 需要把控测试用例的合理性、覆盖率、通过率

## 测试框架

### [PhantomJS](http://phantomjs.org/)/[CasperJS](http://casperjs.org)

`PhantomJS`是一个服务器端的支持`JavaScript API`的`WebKit`。其支持各种Web标准：`DOM`处理, `CSS`选择器, `JSON`, `Canvas`和`SVG`。对于`web`测试、界面、网络捕获、页面自动化访问等等方面。当启动的时候会在内存在开启一个无界面浏览器，以此模拟用户各种操作，可以对界面截图
`Casperjs`是对`PhantomJS`的封装，提供了更加易用的`API`, 增强了测试等方面的支持

### [PhantomCSS](https://github.com/Huddle/PhantomCSS)

像素对比工具，基于`PhantomJs`开发，结合了`Casperjs`截图和`ResembleJs`图像对比分析

### [Page-monitor](https://github.com/fouber/page-monitor)

`DOM`结构对比工具，基于`PhantomJS`开发，根据`DOM`结构与样式的对比来对比整个页面的变动部分

### [BackstopJS](https://garris.github.io/BackstopJS)

主要通过`PhantomJS`、`capserJS`等工具在不同尺寸下截图，然后根据`resemberJS`进行像素比对判断是否正常，以实现响应式测试

### [Mocha + Chai](https://www.zybuluo.com/mdeditor#911714-full-reader)

`mocha+chai`是一个经典的组合主要用来测试函数功能，也能测试异步操作。也有常用`chai`的超集（拓展库）`sion-chai`来加强`chai`

### [Selenium2](http://www.seleniumhq.org/docs)

`Selenium2`，它的主要新功能是集成了`Selenium1.0`以及`WebDriver`。
也就是说`Selenium2`是`Selenium`和`WebDriver`两个项目的合并，即`Selenium2`兼容`Selenium`，它既支持`Selenium API`也支持`WebDriver API`。`WebDriver`是一个用来进行复杂重复的`web`自动化测试的工具,意在提供一种比`Selenium1.0`更简单易学，有利于维护的`API`。它没有和任何测试框架进行绑定，所以他可以很好的在单元测试中调用。当启动`Selenium2`时通常会调起一个可见的界面，但也可以通过设置，让它以`PhantomJS`的形式进行无界面的测试
当然使用`Selenium2`必须额外的安装每种浏览器的`WebDriver`
`Selenium2`上手难度大于`PhantomJS`

### [NightwatchJs](http://nightwatchjs.org/guide)

推特出品，基于`Selenium WebDriver API`开发，意味着支持浏览器自动化测试，内部集成了`mocha+chai`并将它加强，同时支持分组测试和单个测试，对语法进行了简化，归纳有以下特点:

- 简单但强大的语法（更符合`js`书写习惯），只需要使用`JavaScript`和`CSS`选择器，开发者就能够非常迅捷地撰写测试。
- 开发者也不必初始化其他对象和类，只需要编写测试规范即可。
- 使用`CSS`选择器或`Xpath`，定位并验证页面中的元素或是执行命令。
- 易于扩展，便于开发者根据需要，实现与自己应用相关的命令。
- ...

目前，`Selenium`是`JavaScript`的验收测试方面最流行的工具之一，同类的还有`PhantomJS`。二者都有其独到的方法：`Selenium`使用`WebDriver API`，而`PhantomJS`使用无界面的`WebKit`浏览器。它们都是非常成熟的工具，都具有强大的社区支持。它们与`Nightwatch`之间最大的不同，主要是在于语法的简易度以及对持续集成的支持。与`Nightwatch`相比，`Selenium`和`PhantomJS`都拥有更加冗长的语法，这会让编码变得更庞大

``` javascript
this.demoTestGoogle = function (browser) {
   browser
     .url(“http://www.google.com”)
     .waitForElementVisible('body', 1000)
     .setValue('input[type=text]', 'nightwatch')
     .waitForElementVisible('button[name=btnG]', 1000)
     .click('button[name=btnG]')
     .pause(1000)
     .assert.containsText('#main', 'The Night Watch')
     .end();
};

//也可以
module.exports = {
  'step one' : function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
  },

  'step two' : function (browser) {
    browser
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .end();
  }
};
```

## 对前端框架的支持

在实际开发中，我们可能是用了不同的框架。虽然我们完全可以在把源码编译成普通的`HTML/CSS/JS`代码然后测试，但是此种方法的弊端也显而易见：不易于自动化，必须等到所有模块开发完成才能测试...为此我们必须寻找某种方式使得测试不收框架的限制

### Vue

本身可以通过`new`一个`Vue`的方式挂载节点达到效果。
下面是一个简单的测试用例，测试`.hello h1`标签内容是否符合预期

``` javascript
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
```

### React

1.官方提供了两种方法：

- 渲染虚拟`DOM`（`Shallow Rendering`）

只渲染第一层，不渲染子组件，速度快，返回一个浅渲染的虚拟`DOM`对象。然后拿到节点的各种信息，进行测试

- 渲染真实`DOM`节点（`renderIntoDocument`）

`renderIntoDocument` 方法要求存在一个真实的`DOM`环境，否则会报错。因此，测试用例之中，`DOM`环境（即`window`, `document` 和 `navigator` 对象）必须是存在的。`jsdom`库提供这项功能

``` javscript
import jsdom from 'jsdom';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
```

2.`Enzyme`
`Enzyme`是官方测试工具库的封装，它模拟了`jQuery`的`API`，非常直观，易于使用和学习，主要提供三种方法：

- shallow

`shallow`方法就是官方的`shallow rendering`的封装

```javascrpit
import {shallow} from 'enzyme';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
};
```

- render

`render`方法将`React`组件渲染成静态的`HTML`字符串，然后分析这段`HTML`代码的结构，返回一个对象。它跟`shallow`方法非常像，主要的不同是采用了第三方HTML解析库`Cheerio`，它返回的是一个`Cheerio`实例对象。

- mount

`mount`方法用于将`React`组件加载为真实`DOM`节点

## 最后

回到开始，个人认为不要滥用测试，需要合理评估测试用例对团队项目的积极作用和消极作用。不合理或者不恰当的使用测试只会增加工作复杂度和成本。
并且测试用例只是检查代码的工具，所以不要本末倒置以测试用例强行约束业务代码

## 参考

- [关于TDD、BDD和DDD的一些看法](http://www.cnblogs.com/ustbwuyi/archive/2012/10/26/2741223.html)
- [虚拟座谈会：代码测试比率、测试驱动开发及行为驱动开发](http://www.infoq.com/cn/articles/virtual-panel-`TDD`-`BDD`)
- [Mocha](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [PhantomJS](https://segmentfault.com/a/1190000009333157)
- [NightwatchJs](http://www.infoq.com/cn/news/2014/02/nightwatch)
- [前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)
