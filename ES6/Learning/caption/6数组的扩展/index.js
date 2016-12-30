// 1、Array.from()  用于将两类对象转为真正的数组

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5
var arr1 = [].slice.call(arrayLike);

console.log(arr1);

// ES6
let arr2 = Array.from(arrayLike);

console.log(arr2);

// 实际应用中 常见的类似数组的对象 是DOM操作返回的 NodeList 集合，以及函数内部的 arguments 对象。

let ps = document.querySelectorAll('p');

Array.from(ps).forEach(function(p) {
    console.log(p);
});

// arguments 对象
function foo() {
    // body...
    var args = Array.from(arguments);
}

// 2. Array.of() Array.of 方法用于将一组值，转换为数组 

var arr21 = Array.of(1, 2, 3);

console.log(arr21);

// 3. 数组实例的copyWithin()
// 数组实例的copyWithin 方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组，会修改当前数组
// 三个参数
// target（必需）：从该位置开始替换数据。
// start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
    // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
    // [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({ length: 5, 3: 1 }, 0, 3)
    // {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]

// 数组实例的find() 和findIndex()

//find()用于找出 第一个符合条件的数组成员
[1, 2, 34, 5, 3, 1].find(function(value, index, arr) {
    return value > 9;
});
// 9

// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

[1, 5, 10, 15].findIndex(function(value, index, arr) {
        return value > 9;
    }) // 2


// 另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
[NaN].indexOf(NaN)
    // -1

[NaN].findIndex(y => Object.is(NaN, y))
    // 0


// 数组实例的fill()  使用给定值，填充一个数组

['a', 'b', 'c'].fill(7);
// [7,7,7]

new Array(3).fill(7)
// [7,7,7]


// 数组实例的 entries(), keys() 和 values()
// ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"