---
title: node和npm版本管理器nvm的安装和使用
date: 2017-8-21 14:02:36
author: J.2ue
comments: true
tags:
- nvm
- node
- npm
categories:
- tools
---

>nvm：一个node和npm的版本管理器（node&npm version manager），能让你快速的在不同版本间切换。

## 安装

下载地址：[官网下载](https://github.com/coreybutler/nvm-windows/releases)
有两种版本`nvm-noinstall.zip`(便携版)和`nvm-setup.zip`(exe安装版)
两者唯一区别就是便携版需要手动配置全局变量，而安装版只需要在安装时选定安装目录则会自动配置好。

> 注意：安装之前最好先卸载之前的`node`

### 便携版安装

- 下载最新版的`nvm-noinstall.zip`后解压放到`D:\devTools`(可以放到任意位置，此处是我安装的目录，注意文件夹名不能存在空格);
    ``` bash
    elevate.cmd
    elevate.vbs
    install.cmd
    LICENSE
    nvm.exe
    ```
- 配置`nvm`，生成`settings.txt`，填写配置
    方法一：双击`install.cmd`，会生成`settings.txt`文件（生成位置就是你输入的地址，一般是在`nvm`目录下，如果不是，需要拷贝过来）
    方法二：直接在nvm目录下新建`settings.txt`文件
    ``` bash
    root: D:\devTools\nvm
    path: D:\devTools\nodejsv
    arch: 64
    proxy: none
    node_mirror: http://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/
    ```
    - root ： nvm的存放地址
    - path ： 存放指向node版本的快捷方式，使用nvm的过程中会自动生成。一般写的时候与nvm同级。
    - arch ： 电脑系统是64位就写64,32位就写32
    - proxy ： 代理
    - node_mirror: node镜像源，安装node时会从此镜像源下载。
    - npm_mirror: 同上，npm镜像源
- 全局变量配置
    1.添加变量`NVM_HOME`，值为`D:\devTools\nvm`
    2.添加变量`NVM_SYMLINK`，值为`D:\devTools\nodejsv`
    3.添加变量`NVM_HOME`和`NVM_SYMLINK`到全局变量`path`: 修改`path`的值最后加上`;%NVM_HOME%;%NVM_SYMLINK%;`
到此便携版nvm安装完成

### exe安装版

直接双击安装，可以使用默认的选项。也可以自己选择安装地址。然后安装过程中会自动把路径写入到全局变量。
> 注意： 如果安装了杀毒软件，应该先关闭杀毒软件，因为写入全局变量是一个敏感操作，某些杀毒软件会报警（不关闭，报警时需要选择允许操作）

## 使用

### 版本检测

``` bash
$ nvm version
1.1.6
// or
$ nvm v
1.1.6
```

### 安装node&npm

``` bash
$ nvm install [version]
// 如果安装最新版的，直接使用
$ nvm install latest
```

### 查看安装的node&npm

``` bash
$ nvm list
* 8.4.0 (Currently using 64-bit executable)
6.9.0
```

### 切换node版本

``` bash
$ nvm use [version]
Now using node v8.4.0 (64-bit)
```

### 卸载某个版本node

``` bash
$ nvm uninstall [version]
```

### nvm命令查看

``` bash
$ nvm
Running version 1.1.6.

Usage:

  nvm arch                     : Show if node is running in 32 or 64 bit mode.
  nvm install <version> [arch] : The version can be a node.js version or "latest" for the latest stable version.
                                 Optionally specify whether to install the 32 or 64 bit version (defaults to system arch).
                                 Set [arch] to "all" to install 32 AND 64 bit versions.
                                 Add --insecure to the end of this command to bypass SSL validation of the remote download server.
  nvm list [available]         : List the node.js installations. Type "available" at the end to see what can be installed. Aliased as ls.
  nvm on                       : Enable node.js version management.
  nvm off                      : Disable node.js version management.
  nvm proxy [url]              : Set a proxy to use for downloads. Leave [url] blank to see the current proxy.
                                 Set [url] to "none" to remove the proxy.
  nvm node_mirror [url]        : Set the node mirror. Defaults to https://nodejs.org/dist/. Leave [url] blank to use default url.
  nvm npm_mirror [url]         : Set the npm mirror. Defaults to https://github.com/npm/npm/archive/. Leave [url] blank to default url.
  nvm uninstall <version>      : The version must be a specific version.
  nvm use [version] [arch]     : Switch to use the specified version. Optionally specify 32/64bit architecture.
                                 nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode.
  nvm root [path]              : Set the directory where nvm should store different versions of node.js.
                                 If <path> is not set, the current root will be displayed.
  nvm version                  : Displays the current running version of nvm for Windows. Aliased as v.
```

## 总结

- `settings.txt`中`root`和`path`文件路径中不能存在空格，否则在使用`nvm use`命令时会报错
- 在使用`nvm use`命令时，貌似无法再`git-bash`中使用，暂时不知道原因，在自带的`cmd`中可以

## 最后的最后

> 安装nvm比较简单，喜欢折腾的可以使用便携版，反之这直接使用安装版一键安装。最后大家愉快的玩耍吧
