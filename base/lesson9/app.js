// 正则表达式

//(1)js 中，对于四种零宽断言，只支持 零宽度正预测先行断言 和 零宽度负预测先行断言 这两种。

//(2) js中，正则表达式后面可以跟三个 flag  like:  `/something/igm`
// * i 的意思是，不区分大小写
// * g 的意思是，匹配多个
// * m 的意思是，`^` 和 `$` 可以匹配**每**一行的开头。

'/a/'.test('A') // false
'/a/i'.test('A') // true

'hello hell hoo'.match('/h.*?b/') //[ 'hello', index: 0, input: 'hello hell hoo' ]

'hello hell hoo'.match('/h.*?\b/g') // => [ 'hello', 'hell', 'hoo' ]

'aaa\nbbb\nccc'.match('/^[\s\S]*?$/g')  // => [ 'aaa\nbbb\nccc' ]

'aaa\nbbb\nccc'.match('/^[\s\S]*?$/gm')  // => [ 'aaa', 'bbb', 'ccc' ]

