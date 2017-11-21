var fs = require('fs');
var path = require('path');

var sourcePath = path.join(__dirname, '../source');
var remotePath = path.join(sourcePath, '_posts');
var readmePath = path.join(__dirname, '../README.md');
//markdown模板
var readmeDemoPath = path.join(__dirname, '../README.demo.md');

//获取模板文件内容
console.log('======获取模板文件内容======\n', readmeDemoPath, '\n');
var demoText = fs.readFileSync(readmeDemoPath, 'utf8');

//获取文章列表
console.log('======获取文章列表======\n', remotePath, '\n');
var posts = fs.readdirSync(remotePath);
var resText = '', postsInfo = [];

//解析文章标题和地址
console.log('======解析文章标题和地址======\n', posts, '\n');
posts.forEach(function (file, index) {
    var fileName = file.split('.')[0];
    var textArr = fs.readFileSync(path.join(remotePath, file), 'utf8').split('\n');
    var title = textArr[1].replace(/(title: )|[\n\r\cx\f]/g, '');
    var time = textArr[2].replace(/(date: )|[\n\r\cx\f]/g, '');
    var date = time.split(' ')[0].replace(/\-/g, '/');
    postsInfo.push({
        time: time,
        date: date,
        sortTag: new Date(time).getTime(),
        content: `- [[${time} - ${title}](https://2ue.github.io/${date}/${fileName}/)]`
    });

});

console.log('======按文章时间顺序排序（越新越靠前）======\n', postsInfo, '\n');

//按文章时间顺序排序（越新越靠前）
postsInfo.sort(function (a, b) {
    return b.sortTag - a.sortTag;
});

console.log('====== 开始拼装数据 ======\n', postsInfo, '\n');

//按文章时间顺序排序（越新越靠前）
postsInfo.forEach(function (post, index) {
    resText += `${post.content}${posts.length == index + 1 ? '' : '\n'}`;
});

console.log('====== 开始写入数据 ======\n', resText, '\n');

// 写入文章列表
fs.writeFile(readmePath, demoText.replace('[POST_LIST]', resText), 'utf-8', (err) => {
    if (err) throw err;
    console.log('======The file has been saved!======');
});
fs.writeFile(path.join(sourcePath, 'README.md'), demoText.replace('[POST_LIST]', resText), 'utf-8', (err) => {
    if (err) throw err;
    console.log('======The file has been saved!======');
});
