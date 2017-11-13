---
title: hexo踩坑记
date: 2017-11-1 14:42:22
author: J.2ue
tags:
- hexo
categories:
- tools
---

> hexo是一个静态博客生成工具，其集成了大量的三方插件，来丰富博客功能。

[TOC]

## error deployer not found: git

出现这种问题一般有两种情况，按照下面的两步来操作就OK了

- 检查根目录下`_config.yml`文件的`deploy`的`type`值是否为`git`，如果不是请修改成`git`
- 检查当前项目是否安装`hexo-deployer-git`，如未安装，请执行`npm install hexo-deployer-git --save`

## end of the stream or a document separator is expected at line x, column y

一般是书写markdown文档出现语法错误，缺少分隔符（一般都是因为缺少空格）
