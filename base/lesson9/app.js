// 正则表达式

//(1)js 中，对于四种零宽断言，只支持 零宽度正预测先行断言 和 零宽度负预测先行断言 这两种。

//(2) js中，正则表达式后面可以跟三个 flag  like:  `/something/igm`
// * i 的意思是，不区分大小写
// * g 的意思是，匹配多个
// * m 的意思是，`^` 和 `$` 可以匹配**每**一行的开头。

/a/.test('A') // false
/a/i.test('A') // true

'hello hell hoo'.match(/h.*?b/) //[ 'hello', index: 0, input: 'hello hell hoo' ]

'hello hell hoo'.match(/h.*?\b/g) // => [ 'hello', 'hell', 'hoo' ]

'aaa\nbbb\nccc'.match(/^[\s\S]*?$/g)  // => [ 'aaa\nbbb\nccc' ]

'aaa\nbbb\nccc'.match(/^[\s\S]*?$/gm)  // => [ 'aaa', 'bbb', 'ccc' ]

//在js中，g flag 会影响 `String.prototype.match()` 和 `RegExp.prototype.exec()`的行为

// `String.prototype.match()`中，返回数据的格式会不一样，加 g 会返回数组，不加 g 则返回比较详细的信息。



 'hello hell'.match(/h(.*?)\b/g)
//[ 'hello', 'hell' ]

 'hello hell'.match(/h(.*?)\b/)
//[ 'hello','ello',index: 0, input: 'hello hell' ]


//例：设：有字符串 var s = 'aaalllsss0tAAAnnn999';
//问：请找出所有在 3个连续相同字符 前的相邻 3个连续相同字符

var s = 'aaalllsss0tAAAnnn999';

var reg=/(\w)\1{2}(?=(\w)\2{2})/g;
console.log(s.match(reg));


// RegExp.prototype.exec() 中，加g之后，如果你的正则不是字面量的正则，而是存储在变量中的话，这个变量就会变得有记忆

