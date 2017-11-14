var fs = require('fs');
var path = require('path');

var LIST_TEMPLATE = '';
var remotePath = path.join(__dirname, '../source/_posts');
var readmePath = path.join(__dirname, '../README.md');
var readmeDemoPath = path.join(__dirname, '../README.demo.md');

//获取模板文件内容
console.log('======获取模板文件内容======\n', readmeDemoPath, '\n');
var demoText = fs.readFileSync(readmeDemoPath, 'utf8');

//获取文章列表
console.log('======获取文章列表======\n', remotePath, '\n');
var posts = fs.readdirSync(remotePath);
var resText = '';

//解析文章标题和地址
console.log('======解析文章标题和地址======\n', posts, '\n');
posts.forEach(function (file, index) {
    var fileName = file.split('.')[0];
    var textArr = fs.readFileSync(path.join(remotePath, file), 'utf8').split('\n');
    var title = textArr[1].replace(/(title: )|[\n\r\s\cx\f]/g, '');
    var date = textArr[2].replace(/(date: )|[\n\r\s\cx\f]/g, '').split(' ')[0].replace(/\-/g, '/');
    resText += `- [[${title}](https://2ue.github.io/${date}/${fileName}/)]${posts.length == index + 1 ? '' : '\n'}`;

});
console.log('======解析文章标题和地址 success======\n', resText, '\n');
//写入文章列表
fs.writeFile(readmePath, demoText.replace('[POST_LIST]', resText), 'utf-8', (err) => {
    if (err) throw err;
    console.log('======The file has been saved!======');
});
