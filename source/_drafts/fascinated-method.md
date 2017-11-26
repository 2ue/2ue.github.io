## 连续回数生成

回数就是正反念都一样的数，如24542,8074708
连续回数就是还要满足他每个数字是连续或者倒序的，如123454321,5678765

``` javascript
function palindromeNum(n, m) {
    var res = [];
    function num(n, m) {
        res.push(n);
        if (n < m) {
            num(n + 1, m);
            res.push(n);
        }
    }
    num(2, 5);
    return res.join('');
};
palindromeNum(2,5); //2345432
```

## 替换数字末尾的连续0为9

如：1348900 => 1348999; 40670000 => 40679999

``` javascript
function zeroToNine(num){
    (num + '').replace(/0(?=(0+$)|\b)/g,9)
}
zeroToNine(1348900); //1348999
zeroToNine(40670000); //40679999
```
