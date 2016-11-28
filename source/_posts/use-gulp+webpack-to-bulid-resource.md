---
title: 使用webpack + gulp构建项目
date: 2016-11-24 14:46:41
author: J.Yof
comments: true
tags:
- gulp
- webpack
categories:
- tools
---

> 平时在项目中使用它们的机会不多，以下都是自己项目之外的折腾，如果有错误之处，请不吝指出
>
> 有人说为什么会使用webpack+gulp呢？强大的webpack完全可以摒弃gulp了嘛？
>
> 话虽如此，但个人觉得webpack配置太繁琐复杂，相对来说gulp更简单一点，并且gulp也能很好的完成我期望的任务。
>
> 所以我想用webpack来处理js任务（因为它支持AMD和CMD，并且可以直接引入模块），用gulp处理images/css/html等资源



## 配置webpack

webpack.config.js具体的如何配置这里就不一一赘述了，详见官方文档。

``` javascript
'use strict';
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); //公共部分打包到common.js，输出路径为output中的path

module.exports = {
    // devtool: 'cheap-module-eval-source-map', //配置生成Source Maps，选择合适的选项
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        'app' : './src/js/page/app.js',
    },
    //入口文件输出配置
    output: {
        path: './dist/js/page', //webpack启动时需要
        filename: '[name].js' //[name]指向entry中'app',对应关系
    },
  	module: {
        //加载器配置，另外还可以添加额外的css/images等加载器
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss']
    }
};
```

上面的配置就是对js进行打包处理，当然webpack肯定也可以处理css和images等资源，webpack的强大毋庸置疑，但为什么不用webpack来处理css等任务呢？

- webpack处理css默认情况下会把css合并到js文件，这点很不爽
- 如果要把css文件独立处理，则需要额外的配置，有点烦，所以果断用gulp了

执行`webpack`，看看效果，可以正常运行

``` bash
{ webpackGulpDeom }  » webpack
  Hash: 4eeaff8e1f7bda682e10
  Version: webpack 1.13.3
  Time: 1141ms
      Asset     Size  Chunks             Chunk Names
     app.js   367 kB    0, 1  [emitted]  app
  common.js  3.54 kB       1  [emitted]  common.js
      + 5 hidden modules
{ webpackGulpDeom }  »
```



## 配置gulp

gulpfile.js同样，gulp的配置文档详情参考官方文档，这里以编译less文档并压缩css文档为例

``` javascript
'use strict';
var gulp = require('gulp'),
    less = require('gulp-less');

var isDev = true;
var entrySrc = 'src/'
var pathSrc = isDev ? 'dist/' : 'online/';

//开发环境：编译less和css
gulp.task('less', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});
//上线发布：压缩合并css，有less和css，具体看情况
gulp.task('cssUglify', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});
//开发环境
gulp.task('watch', function (done) {
    gulp.watch(entrySrc + 'css/*',['less'], function(event) {
        console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
    }).on('end', done);
});

//开发，执行gulp
gulp.task('default', ['less','watch']);
//发布，执行gulp dev
gulp.task('dev', ['cssUglify']);
```

ps：这里只列举了一个编译less的任务。



## 在gulp里执行webpack任务

> 到了这一步，gulp和webpack任务都编写完成了，如果单单是这样是没有意思的，因为每次启动都需要单独的执行两次命令：一次webpack，一次gulp命令，这样无疑是非常糟糕的。所以我们必须得想办法把gulp和webpack连接起来。怎么连接呢？具体的有两种办法。
>
> 一种是使用gulp-webpack插件
>
> 另一种是使用gulp-util插件
>
> 那么我们来重写gulpfile.js和webpack.config.js吧



### 利用gulp-webpack插件

重写`gulpfile.js`

``` javascript
'use strict';
var gulp = require('gulp'),
    less = require('gulp-less'),
    webpack = require("gulp-webpack"),
    webpackConfig = require("./webpack.config.js");

var isDev = true;
var entrySrc = 'src/'
var pathSrc = isDev ? 'dist/' : 'online/';

//开发环境：编译less和css
gulp.task('less', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});

//上线发布：压缩合并css，有less和css
gulp.task('cssUglify', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});

//用gulp执行webpack.config.js
gulp.task('buildJs', function () {
    var myConfig = Object.create(webpackConfig);
    return gulp
        .src([entrySrc + 'js/page/*.js'])
        .pipe(webpack(myConfig))
        .pipe(gulp.dest('dist/js/page')); //出口文件目录，此处配置之后在webpack.config.js中就必须去掉，不然会报错
});

//开发环境
gulp.task('watch', function (done) {
    gulp.watch(entrySrc + '*/*',['less', 'buildJs'], function(event) {
        console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
    }).on('end', done);
});

//开发，执行gulp
gulp.task('default', ['less', 'buildJs', 'watch']);
//发布，执行gulp dev
gulp.task('dev', ['cssUglify', 'buildJs']);
```

`gulpfile.js`的变化：

- 增加了可以一个buildJs任务来执行webpack.config.js文件的配置
- 相应的监听对象扩大了

现在来重写`webpack.config.js`，注释掉`output`项中的path就行了

``` javascript
'use strict';
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); //公共部分打包到common.js，输出路径为output中的path

module.exports = {
    // devtool: 'cheap-module-eval-source-map', //配置生成Source Maps，选择合适的选项
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        'app' : './src/js/page/app.js',
    },
    //入口文件输出配置
    output: {
        //path: './dist/js/page', //webpack启动时需要
        filename: '[name].js' //[name]指向entry中'app',对应关系
    },
  	module: {
        //加载器配置，另外还可以添加额外的css/images等加载器
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss']
    }
};
```

`webpack.config.js`和`gulpfile.js`都配置好了,那么现在只要执行gulp的相关命令就可以了

```shell
{ webpackGulpDeom }  » gulp
[14:20:43] Using gulpfile D:\wamp64\www\webpackGulpDeom\gulpfile.js
[14:20:43] Starting 'webpack'...
[14:20:45] Version: webpack 1.13.3
    Asset     Size  Chunks             Chunk Names
   app.js   367 kB    0, 1  [emitted]  app
common.js  3.54 kB       1  [emitted]  common.js
[14:20:45] Finished 'webpack' after 1.37 s
[14:20:45] Starting 'default'...
[14:20:45] Finished 'default' after 34 μs
{ webpackGulpDeom }  »
```

### 利用gulp-util插件

> 这种方案只需要修改gulpfile.js就行了，webpack.config.js理论上来说不需要任何变化

``` javascript
'use strict';
var gulp = require('gulp'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    webpackConfig = require("./webpack.config.js"),
    myDevConfig = Object.create(webpackConfig),
    devCompiler = webpack(myDevConfig);

var isDev = true;
var entrySrc = 'src/'
var pathSrc = isDev ? 'dist/' : 'online/';

//开发环境：编译less和css
gulp.task('less', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});

//上线发布：压缩合并css，有less和css，具体看情况
gulp.task('cssUglify', function (done) {
    gulp.src([entrySrc + 'css/main.less', entrySrc + 'css/*.css'])
        .pipe(less())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(pathSrc + 'css/'))
        .on('end', done);
});

//引用webpack.config.js对js资源进行打包
gulp.task("buildJs", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:buildJs", err);
        gutil.log("[webpack:buildJs]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//开发环境
gulp.task('watch', function (done) {
    gulp.watch(entrySrc + '*/*',['less', 'buildJs'], function(event) {
        console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
    }).on('end', done);
});

//开发，执行gulp
gulp.task('default', ['less', 'buildJs', 'watch']);
//发布，执行gulp dev
gulp.task('dev', ['cssUglify', 'buildJs']);
```

执行结果：

``` shell
{ webpackGulpDeom }  » gulp
[14:28:59] Using gulpfile D:\wamp64\www\webpackGulpDeom\gulpfile.js
[14:28:59] Starting 'buildJs'...
[14:29:00] [webpack:buildJs] Hash: 4eeaff8e1f7bda682e10
Version: webpack 1.13.3
Time: 1232ms
    Asset     Size  Chunks             Chunk Names
   app.js   367 kB    0, 1  [emitted]  app
common.js  3.54 kB       1  [emitted]  common.js
chunk    {0} app.js (app) 357 kB {1} [rendered]
    [0] ./src/js/page/app.js 285 bytes {0} [built]
    [1] ./src/js/common/jquery-1.9.1.min.js 92.6 kB {0} [built]
    [2] (webpack)/buildin/amd-options.js 42 bytes {0} [built]
    [3] ./~/vue/dist/vue.common.js 259 kB {0} [built]
    [4] ./~/process/browser.js 5.3 kB {0} [built]
chunk    {1} common.js (common.js) 0 bytes [rendered]
[14:29:00] Finished 'buildJs' after 1.24 s
[14:29:00] Starting 'default'...
[14:29:00] Finished 'default' after 7.21 μs
{ webpackGulpDeom }  »
```


## 两种方案对比

从以上输出结果可以看出：

### 使用gulp-webpack

- `gulpfile.js`与`webpack.config.js`都要修改
- 执行命令打印的信息更少
- 编译时间更多？

### 使用gulp-util

- 只需要修改`gulpfile.js`,即使以后单独使用其中一个也不需要再做额外修改
- 打印信息更丰富
- 编译时间更短？

关于编译时间多少这块，我也没弄太清楚，如果有错误，请读者指出。就个人而言是比较喜欢第二种方案的