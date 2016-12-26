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