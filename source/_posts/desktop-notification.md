---
title: H5的Notification特性 - Web的桌面通知功能
date: 2017-10-16 10:16:37
author: J.2ue
tags:
- Notification
- javascript
categories:
- H5
---

> 目前，`web`网页使用桌面通知功能的越来越多，包括微博，腾讯视频等大厂站，桌面通知功能是`H5`的一个`API` - `Notifications`。它允许网页或应用程序可以发出通知，通知将被显示在页面之外的系统层面上（通常使用操作系统的标准通知机制，但是在不同的平台和浏览器上的表现会有差异），这样即使应用程序空闲或在后台也可以向用户发送信息。

## 应用场景

`Notifications`的诞生简化了网站或者应用与用户之间的沟通成本（时间成本和开发成本），增强用户黏性（减少了用户离开应用的可能）。传统的通知方式，大多是通过站内信（消息），邮件，短信等方式，它们通常需要刷新（跳转）页面、离开应用打开其他应用或终端来查看消息；而桌面通知功能大大的简化了这个过程，消息的传递基本不消耗时间（如果不设置`setTimeout`，用时基本不会超过`1s`），并且用户不需要离开应用，这都带来了极大的方便。可以预见，`Notifications`将会在很多网页或应用中被大量使用。当然`Notifications`也具有它的局限性：无法存档、即看即毁
那么，这个功能到底能用在哪些场景呢？只能说能应用的场景很多：

- 社交类网站
- 资讯类网站
- 网页版邮件服务
- 即时通知类网站
- ...

举个例子，当你打开微博页面，你可能会看到（使用新版浏览器）如下图的通知：
![desktop-notification1](/images/posts/desktop-notification1.png)

这就是网站使用了桌面通知功能，当你选择允许，那么当网站有推送消息或者你登陆账号有新的消息将会在桌面的右下角出现一个小弹窗通知，如下：
![desktop-notification2](/images/posts/desktop-notification2.png)

感觉有点酷酷的！！！

## 用户权限 - Notification.permission

`Notification.permission`是一个静态方法，可以获取用户当前的通知权限状态，返回一个`String`，可以根据返回值判断用户是否授予了通知权限。返回值有三种情况：
- default
    - 用户还未被询问是否授权，所以通知不会被显示。
- granted
    - 表示之前已经询问过用户，并且用户已经授予了显示通知的权限。
- denied
    - 用户已经明确的拒绝了显示通知的权限。

当值为`default`或者`denied`时都不会显示通知消息，只有明确的被设置成`granted`才会显示通知消息

``` javascript
const permission = Notification.permission;
if(permission === 'granted'){
    console.log('已经授权通知，可以进行你的通知啦！');
}else{
    console.log('用户还未授权，请先授权！');
}
```

## 请求权限 - Notification.requestPermission(CALLBACK)

应用发送通知之前必须要取得发送通知的权限，才能成功进行通知。`Notification.requestPermission(CALLBACK)`是请求获取权限的方法（有点类似`javascript`的`confirm`弹窗窗），允许传入一个回调，回调会返回用户选择的何种权限，返回两个值，`granted`代表允许，`denied`代表拒绝。并且`Notification.requestPermission()`支持`then`方式的链式调用，也就意味着可以异步调用它。

``` javascript
Notification.requestPermission(function (permission) {
    console.log('用户是否允许通知： ',permission === 'granted' ? '允许' : '拒绝');
});
//两种方式是等价的
Notification.requestPermission().then(function (permission) {
    console.log('用户是否允许通知： ',permission === 'granted' ? '允许' : '拒绝');
});
```

## 创建通知 - new Notification(TITLE, OPTIONS)

`new Notification(TITLE, OPTIONS)`方法创建可以创建一个通知实例，允许参入参数两个参数`TITLE`和`OPTIONS`。注意默认情况下（实际可以通过`OPTIONS`中的`timestamp`参数控制）一旦通知实例被创建出来，它会立即被显示出来。

### TITLE参数

`TITLE`表示通知的标题。必须参数，允许数字、字符串和空

### OPTIONS参数

`OPTIONS`是非必须参数，必须为一个对象，它包含：
ps: 部分参数在某些浏览器可能会不生效，建议使用最新版的谷歌浏览器。以下某些内容从[Notification-MDN-EN](https://developer.mozilla.org/en-US/docs/Web/API/notification)结合谷歌翻译得来，很有可能翻译不准确，如有，请提出。

``` json
{
    //通知显示正文。非必须，默认为空
    body: '你的好友XX上线了！',
    //通知显示正文的图片地址。非必须，默认为空
    image: 'imgae url',
    //通知左侧图标。非必须，默认为空
    icon: 'imgae url',
    //通知的分类标记（ID）。非必须，默认为空
    tag: 'test',
    //通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
    data: '可以是任意数据类型',
    //通知显示延迟的时间。非必须，默认通知实例创建完成就显示
    timestamp: '',
    //通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
    dir: 'auto',
    //当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
    badge: 'xxx',
    //通知的语言。非必须默认为空
    lang: '',
    //通知显示时，设备的振动模式。非必须，默认为空
    vibrate: [200, 100, 200],
    //新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
    renotify: true,
    //通知是否静音。非必须，默认为false，表示无声
    silent: false,
    //通知声源文件地址。非必须，默认为空
    sound: 'mp3',
    //是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
    noscreen: false,
    //指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
    sticky: false,
    //指定通知是否保持活性，知道用户点击或关闭。非必须，默认为false
    requireInteraction: false
}
```

### 事件及事件钩子

当通知被创建成功后：
- 通知实例具有一个静态方法可以用来关闭通知
- 通知实例具有四个事件钩子，来跟踪通知当前的状态。这些事件可以通过事件处理跟踪`onshow`、`onclick`、`onclose`和`onerror`。因为`Notification`同样继承自`EventTarget`，因此可以对它调用`addEventListener()`方法。

``` javascript
const n = new Notification('XX网站消息通知', {
    body: '你的朋友有新状态啦，快去围观吧！',
    tag: '2ue',
    icon: 'https://2ue.github.io/images/common/avatar.png',
    data: {
        url: 'https://2ue.github.io'
    },
    timestamp: 3000
});

n.onshow = function () {
    console.log('通知显示了！');
}
n.onclick = function (e) {
    //可以直接通过实例的方式获取data内自定义的数据
    //也可以通过访问回调参数e来获取data的数据
    window.open(n.data.url, '_blank');
    n.close();
}
n.onclose = function () {
    console.log('你墙壁了我！！！');
}
n.onerror = function (err) {
    console.log('出错了，小伙子在检查一下吧');
    throw err;
}
```

## demo

写一个简单的例子，可以打开页面体验一下，建议用最新版谷歌浏览器打开~ [Notification.js](https://codepen.io/2ue/pen/rYYzwB)

``` javascript
const NotificationInstance = Notification || window.Notification;
if (!!NotificationInstance) {
    const permissionNow = NotificationInstance.permission;
    if (permissionNow === 'granted') {//允许通知
        CreatNotification();
    } else if (permissionNow === 'denied') {
        console.log('用户拒绝了你!!!');
    } else {
        setPermission();
    }
    function setPermission() {
        //请求获取通知权限
        NotificationInstance.requestPermission(function (PERMISSION) {
            if (PERMISSION === 'granted') {
                CreatNotification();
            } else {
                console.log('用户无情残忍的拒绝了你!!!');
            }
        });
    }
    function CreatNotification() {
        const n = new NotificationInstance('XX网站消息通知', {
            body: '你的朋友有新状态啦，快去围观吧！',
            tag: '2ue',
            icon: 'https://2ue.github.io/images/common/avatar.png',
            data: {
                url: 'https://2ue.github.io'
            }
        });
        n.onshow = function () {
            console.log('通知显示了！');
        }
        n.onclick = function (e) {
            //可以直接通过实例的方式获取data内自定义的数据
            //也可以通过访问回调参数e来获取data的数据
            window.open(n.data.url, '_blank');
            n.close();
        }
        n.onclose = function () {
            console.log('你墙壁了我！！！');
        }
        n.onerror = function (err) {
            console.log('出错了，小伙子在检查一下吧');
            throw err;
        }
        setTimeout(() => {
            n.close();
        }, 2000);
    }
}
```

## 兼容

`Notifications`是`H5`的新特性，毫无疑问，它的兼容肯定是一篇哀嚎.
![Notifications PC端兼容性](/images/posts/notify-jianrong-pc.png)
![Notifications 移动端兼容性](/images/posts/notify-jianrong-mobile.png)

## 参考

- [Notification-MDN-EN](https://developer.mozilla.org/en-US/docs/Web/API/notification)
- [Notification-MDN-CN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)
