---
title: 神器babun踩坑(一)
date: 2017-3-15 13:01:33
author: J.Yof
comments: true
tags:
- babun
- tools
- shell
categories:
- tools
---

babun使用默认安装，位置在'C:\Users\userName\.babun'

## 1.导致本地的git ssh key不可用

#### 原因
安装`babun`会添加全局变量`Home`，指向`babun`安装目录下的`.babun/cymwin/home`，因此在使用命令生成key时不会在'C:\Users\userName\.ssh`目录。

```bash
ssh -T git@github.com
Permission denied (publickey).
```

### 解决办法
#### 删掉以前目录（`C:\Users\userName\.ssh`）下的ssh-key。
#### 生成重新生成`ssh key`，此时生成的key在`.babun\cymwin\home\userName\.ssh`下。
#### 把生成的key映射到`C:\Users\userName\.ssh`目录。
#### 获取权限
#### 把key关联到相应github账户（此处以github为例）。
#### 测试`ssh key`是否可用

```bash
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

此时发现发现还是报错，错误信息为`Permissions 0670`

#### 复制`.babun\cymwin\home\userName\.ssh`目录下的`ssh key`到`C:\Users\userName`目录

#### 在终端切换到`C:\Users\userName\.ssh`目录，执行下面命令

```bash
ln -s /c/Users/userName/.ssh /home/userName/.ssh
```

此操作会把`.babun\cymwin\home\userName\.ssh`目录下的`ssh key`映射`C:\Users\userName\.ssh`

#### 在终端切换到根目录（~），执行以下命令(一般只执行其中一个)

```bash
chmod 400 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh/id_rsa
ssh -T git@github.com
Hi 2ue! You've successfully authenticated, but GitHub does not provide shell access.
```

参考文章：

1.https://github.com/babun/babun/issues/327

2.http://stackoverflow.com/questions/9270734/ssh-permissions-are-too-open-error

