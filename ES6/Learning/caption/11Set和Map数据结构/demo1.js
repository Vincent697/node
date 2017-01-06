// 1 Set 
// Set 类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成Set数据结构。

var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
// 等价于
// [2, 3, 5, 4, 5, 2, 2].map(function(x){
//     return s.add(x);
// });
for (let i of s) {
    console.log(i);
}
// 2 3 5 4 
// 可以通过 add 方法向Set结构加入成员，结果表明Set结构不会添加 重复的值

// Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化

var set = new Set([1, 2, 4, 54, 43, 2, 2, 31]);
console.log([...set]);
// [ 1, 2, 4, 54, 43, 31 ]

var items = new Set([1, 2, 3, 4, 5, 6, 6, 5, 4, 4, ]);
console.log(items.size);
// 5

// function divs() {
//     return [...document.querySelectorAll('div')];
// }

// var set2= new Set(divs());
// console.log(set2.size); // 56

// 一种去除数组重复成员的方法
console.log([...new Set([1, 2, 3, 2, 1, 2, ])]);

// 向 Set 加入值的时候，不会发生类型装换
// 两个对象是不相等的
let set3 = new Set();

set3.add({});
console.log(set3.size); // 1 

set3.add({});
console.log(set3.size); // 2
// 上面的代码表示，由于两个空对象不相等，所以它们被视两个值。


//  Set 实例的属性和方法
//  Set 结构的实例有 Set.prototype.constructor : 构造函数，默认就是 Set 函数,  Set.prototype.size: 返回 Set 实例的成员总数
//  Set 实例的方法分为两大类 
//  四个操作方法：
//   add(value): 添加某个值， 返回Set 结构本身
//   delete(value)：删除某个值 ，返回一个布尔值，表示删除是否成功
//   has(value)：返回一个布尔值，表示该值是否为 Set 的成员
//   clear()： 清除所有成员，没有返回值

// 下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。

// 对象的写法
// var properties = {
//     'width': 1,
//     'height': 1
// };

// if (properties[someName]) {
//     // do something
// }

// // Set的写法

// var properties = new Set();

// properties.add('width');
// properties.add('height');

// if(properties.has(someName)){
//     // do something
// }

// Array.from 方法 可以将Set 结构转为数组

var set4 = new Set([1, 2, 34, 3, 'ass', 2, 2, 5]);

var array2 = Array.from(set4);
console.log(array2);

// 去除数组重复成员的另一种方法
function dedupe(array) {
    return Array.from(new Set(array));
}

//数组去重

console.log(dedupe([1, 2, 3, 2, 1, 2, 3]));

// Set结构实例的 遍历方法
// keys() : 返回键名的遍历器
// values(): 返回键值的遍历器  (--- 是默认遍历器)
// entries(): 返回键值对的遍历器
// forEach(): 使用回调函数遍历每个成员

// 由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys 方法和 values 方法的行为完全一致

let set5 = new Set(['red', 'green', 'blue']);

for (let item of set5.keys()) {
    console.log(item);
}

for (let item of set5.values()) {
    console.log(item);
}

for (let item of set5.entries()) {
    console.log(item);
}

// Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values 方法
// 因此可以省略 values 方法
let set6 = new Set(['2', '2', 2, 'w', 'd', 2, 4]);

for (let item of set6) {
    console.log(typeof item + '-------' + item);
}


// forEach()
// 用于对每个成员执行某种操作，没有返回值

let set7 = new Set([1, 23, 43, 3]);
set7.forEach((value, key) => console.log(value * 2));

// 遍历的应用

// 1.扩展运算符（...）内部使用 for ... of 循环，所以也可以用于Set 结构
let set8 = new Set(['red', 'green', 'blue']);
let arr=[...set8];
console.log(arr);

// 2.去除数组的重复成员
let arr9 = [3, 5, 2, 2, 5, 5];
let unique9 = [...new Set(arr)];
console.log(unique9);
// [3, 5, 2]``
// 数组的map 和 filter 方法也可以用于Set了

let set10 =new Set([1,2,3]);
set10