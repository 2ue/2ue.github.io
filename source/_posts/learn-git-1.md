---
title: Git学习（一）-- git入门
date: 2016-06-20 15:51:17
author: J.Yof
tags:
- git
- github
categories:
- tools
- git
---

> 工欲善其事，必先利其器。git一个不可或缺的利器，其魅力值得我们慢慢品尝！

## 安装

官网下载最新版本安装，然后查看是否安装成功

``` bash
$ git -v
git version 2.7.3.windows.1  //2.7.3为当前版本
```


## 全局个人信息配置

``` bash
$ git config --global user.name "username"
$ git config --global user.email "email"
```

windows环境也可以打开计算机用户文件夹下的.gitconfig编辑

``` html
[user]
    name = username
    email = email
```


## 基本命令

#### 初始化本地仓库

``` bash
$ cd storage
$ git init //初始化当前目录为本地仓库
Initialized empty Git repository in D:/storages/.git/  //初始化了一个空的目录为本地仓库
```

#### 第一次提交(提交到本地)

``` bash
$ git add README.md
$ git commit -m "添加项目文档简介"  //-m 参数后面跟表示对当前提交的一个简单说明
```

#### 查看状态

查看当前文件处于何种状态

``` bash
$ git status
```

#### 回退

当你`add`或`commit`了错误的文件时，可以使用以下命令来撤回`add`或者`commit`;
那么你必须首先明白工作区和暂存区是什么？
直白的说.git文件夹所在的目录(即`git init`初始化的目录)为当前工作区
当`add`之后，`add`的文件就会进入暂存区
当`commit`之后，暂存区就会清空，`commit`的文件就会进入本地当前的分支(如master分支)
PS：关于工作区和暂存区更详细的解释可以去看廖雪峰[工作区和暂存区](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000)

#### 丢弃工区的修改

命令`git checkout -- filename`可以把`filename`文件在工作区的修改全部撤销

``` bash
$ git checkout -- README.md
```

#### 撤销暂存区的修改

命令`git reset HEAD filename`可以把`filename`文件在暂存区的修改全部撤销

``` bash
$ git reset HEAD README.md
$ git checkout -- README.md //--参数不能省
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

当然`reset` 命令,不仅能够撤销暂存区的内容，还能回退版本，即使你错误提交，也可以用`reset`回滚到之前的版本
如果你提交了错误文件，可以使用以下命令来回退;

```bash
$ git reset --hard HEAD^
```

`git reset --hard HEAD^`表示回退到上一个版本，`HEAD`后面的参数可以跟`commit ID`，这个ID可以通过以下命令获得

``` bash
$ git log
commit 97c8460bc1cda8233866686d9cae270e0e0113f1
Author: 2ue <jie746635835@163.com>
Date:   Mon Jun 20 15:44:01 2016 +0800

    update README.md

.....(中间有10条日志)

commit 2d936223341333384dd41533dd44ba8e0640493c
Author: 2ue <jie746635835@163.com>
Date:   Mon Jun 01 13:16:22 2016 +0800

    README.md
```

`commit 97c8460bc1cda8233866686d9cae270e0e0113f1`，这一长串就是我们所需的ID,一般情况下，只需要前7位就够了。

```bash
$ git reset --hard HEAD 2d93622 //回退到commit 2d936223341333384dd41533dd44ba8e0640493c
$ git reset --hard HEAD~12 //回退到往上第12个版本，也是2d93622这个版本
```

--------------------------

## 提交到服务器

当`commit`后，你做出的修改只是提交到了暂存区，下一步就需要把代码提交到服务器。这里的服务器，可以自己搭建，也可以是公司的，或者第三方的。这里我们将代码提交到`github`上(假设你是已经有一个`github`账户，并创建了一个仓库)。

#### 本地生成SSH KEY

`SSH KEY`就是连通本地与`github`的桥梁，钥匙，使用以下命令来生成：

``` bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

然后回车，中途会提示设置密码，可以设置也可以不设置，如果设置密码，以后每次提交需要输入密码。
然后在用户主目录（例如：C:\Users\Administrator\.ssh）找到`.ssh`，其中`id_rsa`表示私钥不能泄露和`id_rsa.pub`表示公钥，用于对外，可以公开。

#### github设置本地公钥

打开`id_rsa.pub`，复制里面的全部内容；
进入`github`账户；
找到 `setting`；
打开`SSH KEYS`新建一个`SSH KEY`，名字随便取，然后粘贴`id_rsa.pub`的内容，保存；

#### 测试是否连通

理论上讲，上一步操作无特殊错误，就已经和`github`连通的，为了放心，我们可以测试一下

```
$ ssh -T git@github.com
Enter passphrase for key '/c/Users/Administrator/.ssh/id_rsa':  //如果设置了密码，此处将会提示你输入密码
Hi 2ue! You've successfully authenticated, but GitHub does not provide shell access.
```

上面就是成功的提示

#### github仓库和本地仓库关联

有两种方式把本地仓库和`github`仓库关联起来

###### 方法一：clone自己的仓库，简单，并且本地文件目录和github上名字一样

登陆账号，新建仓库(new repository)；
进入仓库主页，找到按钮`clone or download`按钮，复制里面的`git@github.com:userName/repositoryName.git`;
打开`git bash`，clone；

``` bash
$ git clone git@github.com:userName/repositoryName.git
```

就会把这个项目克隆到你当前目录下。此时你就可以顺畅的像`github`推送你的东西了。

###### 方法二：利用命令关联仓库，本地仓库名可以和`github`的仓库名不一样

假设你github上有一个项目，`git@github.com:userName/repositoryName.git`

``` bash
$ mkdir testRepository  //新建目录testRepository
$ cd testRepository  //切换到这个目录
$ git init  //初始化当前目录
$ git remote add origin git@github.com:userName/repositoryName.git
// origin为本地暂存区的名字，为了语义化，建议默认为它
// 注意github上的repositoryName与本地的testRepository可以不一样
```

#### 提交(push)

###### 第一次提交

```
$ git push -u origin master
```

###### 第二次及以后

```
$ git push origin master
```

第一次提交带参数`-u`是为了让你本地和`github`的仓库保持同步。

#### 更新代码(pull)

当我们在一台设备上对`github`提交(push)代码之后，在另外的设备上修改这个项目时就必须先从`github`更新代码，以保持代码的同步

```bash
$ git pull
```

-------------

## 总结

###### 至此一个比较完整的流程走通了，当然在这些过程中也许还会遇到其它的问题，如，代码冲突，分支，分支合并等等。

`github`上创建一个新的项目
`github repositoryName`：testGit
`github userName`：2ue

```bash
$ makdir testGit   //创建一个空文件夹testGit(名字任意取)，做仓库
$ cd testGit    //切换到目录testGit
$ git init    //初始化testGit为本地仓库
$ echo 'this repository is localhost' > README.md
//创建文件README.md，并写入'this repository is localhost'
//在window下以上操作的第一步和第四步可以在图形化界面中完成
$ git add README.md
$ git commit -m 'add README.md'//提交更新，并注释信息“add README.md”
$ git remote add origin git@github.com:2ue/testGit.git   //关联github上的项目
$ git push -u origin master   //提交到github
```