---
title: windows平台下超强的cmd工具Babun使用笔记
date: 2017-3-15 13:01:33
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

## [Babun](https://Babun.github.io/)

官方贴出了Babun的十大特性

- Pre-configured Cygwin with a lot of addons： 预置大量的Cygwin插件
- Silent command-line installer, no admin rights required：静默命令行安装，不需要管理员权限
- pact - advanced package manager (like apt-get or yum)： 支持pact高级包管理器，类似于apt-get、yum等
- xTerm-256 compatible console： xterm-256兼容控制台
- HTTP(s) proxying support： HTTP(s) 代理支持
- Plugin-oriented architecture： 插件体系，可以安装丰富的插件
- Pre-configured git and shell： 预置git和shell，支持自定义配置
- Integrated oh-my-zsh： 集成了zsh
- Auto update feature： 自动检测最新版本
- "Open Babun Here" context menu entry： 支持右键菜单“此处打开Babun"

当然对于上面这些特性，我不得不补充一点，那就是它强大的命令提示功能，能从根据你的输入匹配历史输入，狠棒！

### Cygwin

`Babun`的核心包括一个预配置的`Cygwin`。`cygwin`是一个非常好的工具，但有很多使用技巧，使你能够节省大量的时间。`Babun`解决了很多问题，它里面包含了很多重要的软件包，是你能够第一时间能够使用它们

### shell

`Babun`的`shell`通过调整，已达到最佳的用户体验，`Babun`有两个配置之后马上使用的`shell`(默认使用`zsh`，可以使用`bash`或者`zsh`命令切换到对应的模式)，`Babun`的`shell`具有以下的特点:
- 语法高亮
- 具有unix的工具
- 软件开发工具
- git-语义提示
- 自定义脚本和别名
- ...

### Console

`Babun`支持`HTTP`代理，只需添加地址和`HTTP`代理服务器的凭据。`Babunrc`文件所在文件夹执行源`Babunrc`启用HTTP代理。目前还不支持`SOCKS`代理。

### 开发者工具

Babun提供多种方便的工具和脚本，是你的开发工作更轻松，具有的功能如下:
- 编程语言(python,Perl, etc等)
- git(各种各样的别名调整)
- UNIX工具((grep, wget, curl, etc)
- vcs (svn, git)
- oh-my-zsh
- 自定义脚本(pbcopy, pbpaste, Babun, etc)

## 安装

### 默认安装

双击`install.bat`脚本，`Babun`使用默认安装位置`C:\Users\userName\.Babun`，安装好的`Babun`会在`C:\Users\userName\`下；
当然也可以指定安装位置

### 自定义安装

通过`cmd`命令行在执行`install.bat`时指定参数`/t`或`/target`指定安装的目录。
执行：Babun.bat /t install-dir

``` bash
Babun.bat /t c:\Babun
```

安装好之后会在`d:\Babun`目录下生成一个`.Babun`的目录，`Babun`所有文件都在这个目录中。注意安装目录最好不要有空格，这是`cygwin`要求的

启动`Babun`默认是在'%userprofile%\.Babun\cygwin\home\username'

## 开发环境配置

### pip

`Babun`内置了`Python`、`Perl`等解释器。`cygwin`自带的`python`没有`pip`，需手动安装。
直接执行下面这个命令就好了。

``` bash
wget https://bootstrap.pypa.io/get-pip.py -O - | python
```

有了pip就可以自由的安装诸如`ipython`之类的东西，还有包罗万象的类库。

### 常用插件

`Babun`默认是安装了`oh-my-zsh`的，这里可以根据自身情况安装一些插件。具体可参考[利用`oh-my-zsh`打造你的超级终端一文](http://blog.csdn.net/czg13548930186/article/details/72858289);

### 包管理器使用

`Babun`提供一个叫`pact`包管理工具，类似于`linux`上面的`apt-get`或`yum`的包管理工具

## 配置别名（alias）

可以在`.Babun\cygwin\home\username`目录下配置对应工具的别名，而并不仅限于`git-bash`。
当然记忆别名其实也是体力活，我的想法是对一些常用的命令、经常手滑手速过快打错的命令、复杂的命令配置一些别名，例如

``` bash
gt = git
gti = git
n = npm
nr = npm run dev
gtlg = git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
...等等
```

## 问题

### 本地SSH-KEY不可用

查看我记录的[Babun导致本地SSH-KEY不可用](https://2ue.github.io/2017/06/15/babun-casue-ssh-key-bad/)一文

### 中文乱码问题

找了很多解决方案，都不能完美的解决问题，最后还是回归原始：不解决！！！

### 锁定文件夹

在使用`Babun`时（比如此时进入了`a`目录），它会锁定文件夹`a`目录，导致你可能无法做一些危险操作。必须关闭`Babun`后才能解锁进程

参考文章：

- [windows下的命令行工具Babun](http://www.mamicode.com/info-detail-1653353.html)
