---
title: 神器babun的折腾记录(一)
date: 2017-3-15 13:01:33
author: J.Yof
comments: true
tags:
- babun
- tool
- shell
categories:
- tool
---


## 1.导致本地的git ssh key不可用

#### 原因
安装`babun`会添加全局变量`Home`，指向`babun`安装目录下的`.babun/cymwin/home`，因此在识别时会报错。

```bash
ssh -T git@github.com
Permission denied (publickey).
```

### 解决办法
#### 删掉以前`C:\Users\userName\.ssh`(`username`替换成你的用户名)里的所有文件。
#### 生成重新生成`ssh key`，生成在`.babun\cymwin\home\userName\.ssh`下。
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
ln -s /c/Users/Administrator/.ssh /home/Administrator/.ssh
```

此操作会把`.babun\cymwin\home\userName\.ssh`目录下的`ssh key`映射`C:\Users\userName\.ssh`

#### 在终端切换到`.babun\cymwin\home\userName\.ssh`所在目录下执行，以下命令

```bash
chmod 600 id_rsa
chmod 700 id_rsa
chmod 400 id_rsa
ssh -T git@github.com
Hi 2ue! You've successfully authenticated, but GitHub does not provide shell access.
```

参考文章：

1.https://github.com/babun/babun/issues/327

2.http://stackoverflow.com/questions/9270734/ssh-permissions-are-too-open-error

