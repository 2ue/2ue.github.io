# 前端开发之单元测试到自动化测试

key:  `单元测试`、`GUI软件测试`、`TDD`、`BDD`、`自动化测试`、`持续集成`、`mock`

------

> 前端测试是保证代码质量以及程序稳定的一种可靠方式，同时也从代码层面解决了自测难，自测烦等前端测试综合症。当然在前端开发引入测试环节无疑会增加人力和时间成本，如果最终产生的结果和增加的成本能够两两抵消产生正面效应，那么有必要考虑把测试环节加入到团队的规划中。

Ps：本次更多的是讲述概念性的东西，代码性的具体实例不做过多实践

## 单元测试（Unit Test）
需要访问数据库的测试不是单元测试
需要访问网络的测试不是单元测试
需要访问文件系统的测试不是单元测试

## GUI(Graphical User Interface)软件测试
> GUI软件就是图形用户界面软件，由于存在大量的`人机`交互，所以增加了测试的复杂度和成本，更是阻碍了自动化测试发展进程

## TDD(Test Driven Development) & BDD(Behaviour Driven Development)
TDD测试驱动开发，讲求先写测试用例，在进行开发。
BDD行为驱动开发，讲求以需求为主，先进行开发，待开发稳定后再编写测试案例测试

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
- 网页截图
- 性能测试
- 自动化
  - 测试用例数据自动化 - 结合mockjs打造假数据
  - 测试用例自动化创建 - 通过读取源码中的注释来自动生成测试用例？

## 业务逻辑/业务代码/测试用例的关系
业务代码的颗粒度与测试用例的复杂度成反比：颗粒度划分越多（细），复杂度越低
业务代码的量与测试用例的量成正比

## Good
- 能主动更全面的发现问题：消极等待问题产生是可怕的
- 有利于形成团队代码规范，对团队未来成员的扩充是一个很好的约束规范
- 对输出的产品有进一步的质量保证

## Bad
- 增加维护测试用例本（时间和人力）
- 增加编码复杂度（需要靠如何更友好的进行测试），对团队人员的编码要求提高了
- 也许会增加学习成本（并不一定所有人都会写测试用例）
- 需要把控测试用例的合理性、覆盖率、通过率

## 框架
### [PhantomCSS](https://github.com/Huddle/PhantomCSS)
像素对比工具

### [page-monitor](https://github.com/fouber/page-monitor)
DOM结构对比

### [BackstopJS](https://garris.github.io/BackstopJS)
主要通过`PhantomJS`、`capserJS`等工具在不同尺寸下截图然后根据`resemberJS`进行像素比对判断是否正常:

### [Mocha + Chai](https://www.zybuluo.com/mdeditor#911714-full-reader)
`mocha+chai`是一个经典的组合主要用来测试函数功能，也能测试异步操作。也有常用`chai`的超集（拓展库）`sion-chai`来加强`chai`

### [PhantomJS](http://phantomjs.org/)/[CasperJS](http://casperjs.org)
`PhantomJS`是一个服务器端的支持`JavaScript API`的`WebKit`。其支持各种Web标准：`DOM`处理, `CSS`选择器, JSON, `Canvas`和`SVG`。对于`web`测试、界面、网络捕获、页面自动化访问等等方面。
`Casperjs`是对`PhantomJS`的封装，提供了更加易用的`API`, 增强了测试等方面的支持

### [Selenium2](http://www.seleniumhq.org/docs) & [WebDriverIO](http://webdriver.io)
`Selenium2`，它的主要新功能是集成了`Selenium1.0`以及`WebDriver`。
也就是说`Selenium2`是`Selenium`和`WebDriver`两个项目的合并，即`Selenium2`兼容`Selenium`，它既支持`Selenium API`也支持`WebDriver API`。
`WebDriver`是一个用来进行复杂重复的`web`自动化测试的工具,意在提供一种比`Selenium1.0`更简单易学，有利于维护的`API`。
它没有和任何测试框架进行绑定，所以他可以很好的在单元测试中调用。

### [NightwatchJs](http://nightwatchjs.org/guide)
推特出品，基于`Selenium WebDriver API`开发，意味着支持浏览器自动化测试，内部集成了`mocha+chai`并将它加强，同时支持分组测试和单个测试，对语法进行了简化，归纳有以下特点
- 简单但强大的语法（更符合js书写习惯），只需要使用JavaScript和CSS选择器，开发者就能够非常迅捷地撰写测试。
- 开发者也不必初始化其他对象和类，只需要编写测试规范即可。
- 内建命令行测试运行器，允许开发者同时运行全部测试或者分组或者单个运行。
- 自动管理Selenium服务器；如果Selenium运行在另一台机器上，那么也可以禁用此特性。
- 支持持续集成：内建JUnit XML报表，因此开发者可以在构建过程中，将自己的测试与系统（例如Hudson 或Teamcity等）集成。
- 使用CSS选择器或Xpath，定位并验证页面中的元素或是执行命令。
- 易于扩展，便于开发者根据需要，实现与自己应用相关的命令。
目前，Selenium是JavaScript的验收测试方面最流行的工具之一，同类的还有PhantomJS。
二者都有其独到的方法：Selenium使用其WebDriver API，而PhantomJS使用无界面的WebKit浏览器。
它们都是非常成熟的工具，都具有强大的社区支持。它们与Nightwatch之间最大的不同，主要是在于语法的简易度以及对持续集成的支持。
与Nightwatch相比，Selenium和PhantomJS都拥有更加冗长的语法，这会让编码变得更庞大，而且不支持从命令行中进行开箱即用的持续集成

## 最后
回到开始，个人认为不要滥用测试，需要合理评估测试用例对团队项目的积极作用和消极作用。不合理或者不恰当的使用测试只会增加工作复杂度和成本。
并且测试用例只是检查代码的工具，所以不要本末倒置以测试用例强行约束业务代码

## 参考
- [Mocha](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [PhantomJS](https://segmentfault.com/a/1190000009333157)
- [NightwatchJs](http://www.infoq.com/cn/news/2014/02/nightwatch)