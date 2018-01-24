---
title: Git学习之常用命令
date: 2017-7-1 13:13:01
author: J.2ue
tags:
- git
categories:
- tools
---

> 虽然有了git的图形化工具，但个人还是喜欢命令行，并且结合alias功能，也能非常快速的完成很多功能。记录一些项目中常用的git命令，方便查阅

## 查看状态

可以查看工作区(edit即add之前)和暂存区(add之后，commit之前)

``` bash
git status
```

## 提交到暂存区

``` bash
//提交某个文件
git add fileName
//提交所有修改文件的三种写法
git add *
git add .
git add --all
```
## 保存在本地仓库

``` bash
git commit -m "note text"
```

## 提交到远程仓库

其中origin是本地仓库名，remote是远程仓库分支名

``` bash
git push <origin> <remote>
//如提交本覅origin到远程master分支
git push origin master
```

## 分支

### 查看分支

``` bash
//查看本地分支
git branch
//查看远程分支
git branch -r
//查看所有分支
git branch -a
```

### 创建分支

``` bash
git branch name
```

### 删除分支

``` bash
//删除本地分支
git branch -d name
//删除远程分支两种方法
git push origin :name //冒号不能省
git branch -r -d origin/name
```

### 切换分支

``` bash
git checkout name //如果分支不存在则创建一个名为name的新分支
```

### 合并分支

``` bash
//例如：合并分支dev到master
//首先保持dev和master分支最新，即在本地切换到对应分支，各pull一次
//然后切换分支到最终要合并的分支上（此处为master）
git checkout master
//执行本地合并（合并dev到master）
git merge dev
//推送合并到远程
git push origin master
```

### 放弃本地修改强制更新

> git fetch只是下载远程的库的内容，不做任何的合并；git reset把HEAD指向刚刚下载的最新的版本

``` bash
git fetch --all
git reset --hard origin/master
```

### 回退到某个历史版本

> 首先使用git log命令获取某个历史版本的ID，假设ID是c3470ee7edf566cc359b666d3e27a38220abaf66

``` bash
//在本地回退到c3470ee7edf566cc359b666d3e27a38220abaf66版本
git reset --hard c3470ee7edf566cc359b666d3e27a38220abaf66
//推送到远程分支，注意：由于本地版本旧于远程仓库版本，这里需要使用-f参数，强制推送
git push -f origin master
```
