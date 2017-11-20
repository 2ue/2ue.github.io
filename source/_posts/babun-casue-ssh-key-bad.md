---
title: Babun导致本地SSH-KEY不可用
date: 2017-6-15 19:11:24
author: J.2ue
comments: true
tags:
- Babun
- cmd
- shell
- git
categories:
- tools
---

> Babun是一款集颜值功能于一身的window平台下的命令行工具。它集成了zsh、Cygwin等强大的工具，支持各种配置，并且有丰富的插件支持；并且有丰富的命令和命令提示功能，以及超级棒的历史命令提示。

ps: 前文有我记录的关于`Babun`的一些特点，以及使用，请看[windows平台下超强的cmd工具Babun使用笔记](https://2ue.github.io/2017/03/15/Babun/)一文

## 问题描述

如果你本地先安装了git命令行工具并生成了`ssh-key`，再安装`Babun`之后，可能会导致原有的`ssh-key`不可用，原因：
安装`Babun`会添加全局变量`Home`，指向`Babun`安装目录下的`.Babun/cymwin/home`，因此在使用命令生成key时不会在`C:\Users\userName\.ssh`目录。

``` bash
ssh -T git@github.com
Permission denied (publickey).
```

### 解决办法

- 删掉以前目录（`C:\Users\userName\.ssh`）下的ssh-key。
- 生成重新生成`ssh key`，此时生成的key在`.Babun\cymwin\home\userName\.ssh`下。
- 把生成的key映射到`C:\Users\userName\.ssh`目录。
- 获取权限
- 把key关联到相应github账户（此处以github为例）。
- 测试`ssh key`是否可用

``` bash
ssh -T git@github.com
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0670 for '/home/Administrator/.ssh/id_rsa' are too open.
It is recommended that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/home/Administrator/.ssh/id_rsa": bad permissions
Permission denied (publickey).
```

当生成key之后，测试是否联通，你会发现还是报错了，提示权限不够，错误信息为`Permissions 0670`

#### 在终端切换到`C:\Users\userName\.ssh`目录，执行下面命令

``` bash
ln -s /c/Users/userName/.ssh /home/userName/.ssh
```

此操作会把`.Babun\cymwin\home\userName\.ssh`目录下的`ssh key`映射`C:\Users\userName\.ssh`

#### 在终端切换到根目录（~），执行以下命令(一般只执行其中一个)

```bash
chmod 400 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh/id_rsa
ssh -T git@github.com
Hi 2ue! You've successfully authenticated, but GitHub does not provide shell access.
```

参考文章：

1.https://github.com/Babun/Babun/issues/327
2.http://stackoverflow.com/questions/9270734/ssh-permissions-are-too-open-error
