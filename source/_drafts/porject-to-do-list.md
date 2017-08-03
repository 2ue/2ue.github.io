## 待做项目

## 弹幕

播放器

- 暂停，快进，快退，全屏，音量
- 弹幕开启/关闭
- 快捷键

输入文字
- 增加各种样式，并记录
  - 控制长度（在输入端控制和在显示端控制）
- 记录播放时间，以便于在播放时显示
- 存储在服务器(待定)
- 本地持久化存储(待定)
- 同时显示效果

显示弹幕
- 动画显示
    - 考虑用css实现或者js实现
- 时间节点

网站广告

## 组件
- rem
- reset.css
- util
- 瀑布流插件
- 时间加载器
- 滚动条
- 下拉刷新，下拉加载下一篇
- 倒计时

## 博客--自己开发主题
- 设计，自主设计
- 模块
  - 文章
  - 读书
  - 简介
  - 音乐
  - 视频 （推荐视频，弹幕播放器等）
  - 项目list

## vue-组件
参考三秒和ele

## node写一个通过注释自生成文档的脚本



## css button

参考：http://www.bootcss.com/p/buttons/

发布到npm上，

- button.css：未压缩的样式，包括了rest和button
- button.min.css：用于直接引用，包括了rest和button
- rest.min.css：初始化样式
- button.code.css：按钮样式
rest.min.css 和 button.code.css用于用户直接编译。
rest.min.css内部的样式会加前缀（如input.className{}），覆盖掉用户自己的rest（重叠部分），如果用户不希望自己的rest被覆盖可以只引入button.code.css