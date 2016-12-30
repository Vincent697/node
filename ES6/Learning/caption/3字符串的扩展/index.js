// 字符串的遍历器接口
for (let codePoint of 'foo') {
    console.log(codePoint);
}
// f
// o
// o

// 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的 for 循环无法识别这样的码点

var text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
// " "
// " "

for(let i of text){
    console.log(i);
}
// "𠮷"

// includes(), startsWith(), endsWith()
// 传统上，javaScript 只有indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新的方法

// includes(): 返回布尔值，表示是否找到了参数字符串
// startsWith(): 返回布尔值，表示参数字符串是否在源字符串的头部
// endsWith(): 返回布尔值，表示参数字符串是否在源字符串的尾部

var s="hello world";

s.startsWith('hello')//true
s.endsWith('!') //true
s.includes('o')//true

//这三个方法都支持第二个参数，表示开始搜索的位置。 
var s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

// 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

// repeat() 方法返回一个新字符串，表示将原字符串重复n次

'x'.repeat(3) //'xxx'
'hello'.repeat(2) //'hellohello'
'na'.repeat(0) // ''

//参数如果是小数点，会被取整。
'na'.repeat(2.9) // 'nana'

// padStart(),padEnd()
// ES7 推出了字符串补全长度的功能。如果某个字符串不够指定的长度，会在头部或者尾部补全，padStart() 用于头部补全，padEnd()用于尾部补全

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'


// 模版字符串
// 在ES6 引入了 模版字符串的概念

// 传统写法
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
// ES6
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`); 


//模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`


// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());