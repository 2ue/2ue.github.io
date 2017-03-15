---
title: 使用babun的坑（一）
date: 2017-3-15 13:01:33
author: J.Yof
comments: true
tags:
- babun
- tool
categories:
- tips
---

## 使用babun的坑

#### 1.导致本地的git ssh key不可用

原因：安装babun会添加全局变量Home，指向.babun/cymwin/home，在读取时会出错

```bash
ssh -T git@github.com
Permission denied (publickey).
```

解决办法：

1.删掉以前C:\Users\userName\\.ssh （username一般为Administrator，如果不是就替换成你的用户名）里的所有文件

2.生成重新生成ssh key，并把key关联到相应github账户（此处以github为例）注意此时的ssh key在C:\Users\userName\\.babun\cymwin\home\userName\\.ssh 下

3.测试联通

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

发现Permissions 0670错误

3.copy生成的ssh key到C:\Users\userName\\.ssh目录

4.执行以下命令

```bash
ln -s /c/Users/Administrator/.ssh /home/Administrator/.ssh
```

此操作会在.babun/cymwin/home/Administrator/.ssh生成一个.ssh文件

5.最后执行

进入到`.babun`所在目录下执行

```bash
chmod 700 id_rsa
chmod 400 id_rsa
ssh -T git@github.com
Hi 2ue! You've successfully authenticated, but GitHub does not provide shell access.
```

参考文章：

1.https://github.com/babun/babun/issues/327

2.http://stackoverflow.com/questions/9270734/ssh-permissions-are-too-open-error

