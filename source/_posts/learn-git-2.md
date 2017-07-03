---
title: Git学习之常用命令
date: 2017-7-1 13:13:01
author: J.Yof
tags:
- git
categories:
- tools
---

> 记录一些项目中常用的命令



## 查看状态

可以查看工作区(edit即add之前)和暂存区(add之后，commit之前)

``` shell
git status 
```

## 提交到暂存区

``` shell
//提交某个文件
git add fileName
//提交所有修改文件的三种写法
git add *
git add .
git add --all
```
## 保存在本地仓库

``` shell
git commit -m "note text"
```

## 提交到远程仓库

其中origin是本地仓库名，remote是远程仓库分支名

``` shell
git push <origin> <remote>
//如提交本覅origin到远程master分支
git push origin master 
```

## 分支

### 查看分支

``` shell
//查看本地分支
git branch
//查看远程分支
git branch -r
//查看所有分支
git branch -a
```

### 创建分支

``` shell
git branch name
```

### 删除分支

``` shell
//删除本地分支
git branch -d name
//删除远程分支两种方法
git push origin :name //冒号不能省
git branch -r -d origin/name
```

### 切换分支

``` shell
git checkout name //如果分支不存在则创建一个名为name的新分支
```

### 合并分支

``` shell
//例如：合并分支dev到master
//首先保持dev和master分支最新，即在本地切换到对应分支，各pull一次
//然后切换分支到最终要合并的分支上（此处为master）
git checkout master
//执行本地合并（合并dev到master）
git merge dev
//推送合并到远程
git push origin master
```

