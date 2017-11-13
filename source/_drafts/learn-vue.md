---
title: vue踩坑记（一）
date: 2017-5-18 20:14:23
author: J.2ue
tags:
- vue
categories:
- vue
---

> <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=86 src="//music.163.com/outchain/player?type=2&id=22677433&auto=1&height=66"></iframe>

# 发端
从使用vue以来，断断续续已有半年，期间写过几个简单的demo，还厚颜无耻的放到了我的github上。直到最近，在项目中运用了vue，才发现以前自己对他的运用和理解真的很浅薄（-_- 现在也很浅薄），我觉得有必要记录一些使用心得（其实就是坑）。

# 遇到的坑
- 计算属性VS监听属性VS深度监听
- 关于vue中style的scoped属性
- 关于编译第三方ui库自定义样式
- 如何在vue实例上注册全局方法以及是否有必要在vue上注册方法
- 父子组件数据互通
    - 数据值互通
    - 方法函数互通
    - 使用vue-resource实现状态的全局管理
- ajax的选择
- slot插槽的运用
- use方法的应用
- 在全局引用css
- 操纵DOM节点
    - 路由切换时操纵DOM节点可以通过监听$router变化来实现
    - 建议使用原生js封装一些通用方法
- 路由
    - 路由切换不刷新页面产生的影响以及解决方案
    - 前端如何实现重定向到404路由
    - 路由嵌套及继承（在子路由中使用'/'会发生什么）
    -

- 额外的周边工具的使用
    - webpack的配置

# 坑
- 获取属性，获取公用属性，通过标签分类
- 组件初始化时computed无法拿到props的属性，无法拿到method的方法
- methods里面不能使用箭头函数: 会改变this的指向
- v-if,v-else,v-else-if
# 解决方案
