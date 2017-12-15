## 待写文章列表

### vue

- 插入html代码的三种方式
  - v-html
  - filter
  - 通过虚拟DOM转换
- vue-router
  - 路由基本规则
  - 重定向
  - 子路由嵌套
    - 重定向
    - 父级根路由
  - 动态路由
  - 404匹配
- 脚手架
- 框架搭建

## es6

## ...运算符

- https://segmentfault.com/a/1190000007022442




1.获取属性，获取公用属性，通过标签分类
2.组件初始化时computed无法拿到props的属性，无法拿到method的方法
3.methods里面不能使用箭头函数: 会改变this的指向

git常用命令：
https://segmentfault.com/q/1010000006864939?_ea=1159571

axios
http://www.cnblogs.com/libin-1/p/6607945.html
http://www.jianshu.com/p/3ab216fa185c


## H5
HTML5事件——visibilitychange 标签可见性


## 判断经纬度是否在GEOJSON范围

``` javascript
function isInPolygon(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];

    for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount];
        if (  checkPoint[0] > Math.min(p1[0], p2[0]) &&checkPoint[0] <= Math.max(p1[0], p2[0])) {
            if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
                if (p1[0] != p2[0]) {
                    xinters =(checkPoint[0] - p1[0]) * (p2[1] - p1[1]) /(p2[0] - p1[0]) + p1[1];
                    if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                        counter++;
                    }
                }
            }
        }
        p1 = p2;
    }
    if (counter % 2 == 0) {
        return false;
    } else {
        return true;
    }
}

isInPolygon(
    [121.51702880859374, 31.168159735435708],

    [
        [121.53814315795897, 31.213021677784425],
        [121.55908584594727, 31.213021677784425],
        [121.55908584594727, 31.22337141316801],
        [121.53814315795897, 31.22337141316801],
        [121.53814315795897, 31.213021677784425]
    ]
);
```

截图粘贴上传图片
document.onpaste=function(e){
    var data = e.clipboardData;
    for(var i=0; i<data.items.length; i++){
        var item = data.items[i];
        if(item.kind=='file' && item.type.match(/^image\//i)){
            var blob = item.getAsFile();
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload=function(event){
                console.log(event.target.result)
            }
        }
    }
}

兼容 IOS11 头尾部多出来的空间
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

浏览器知否支持WEBP格式
function canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        return false;
    }
}
http://stackoverflow.com/questions/5573096/detecting-webp-support


IOS10 SAFARI禁止缩放网页
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1)event.preventDefault();
}, false);
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300)event.preventDefault();
    lastTouchEnd = now;
}, false);



VUE中解决IOS在获取焦点后点空白无法关闭键
setFocus(e){
    var autoClose = (event)=>{
        if(event.target.tagName!="INPUT"){
            window.setTimeout(function(){
                e.target.blur()
                document.removeEventListener('touchend', autoClose,false)
            },300)
        }
    }
    document.addEventListener('touchend', autoClose,false)
}

滚动条返回顶部动画实现
function toTop(){
    let d = 500     //运行时间（毫秒）
    let b =document.body.scrollTop //开始位置
    let c = 0-b     //结束位置
    let now = Date.now()
    //减速曲线
    let calc=(t, b, c, d)=>{
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    // 跑帧
    let go=()=>{
        let t = Date.now() - now
        if (t >= d){
            window.cancelAnimationFrame(go)
            return
        }
        document.body.scrollTop = calc(t,b,c,d)
        window.requestAnimationFrame(go)
    }
    // 初始化
    window.requestAnimationFrame(go)
}
这是es6原生js写的动画用在vuejs里面合适

H5获取经纬度
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        window.latitude = position.coords.latitude;//纬度
        window.longitude = position.coords.longitude;//经度
    });
}
