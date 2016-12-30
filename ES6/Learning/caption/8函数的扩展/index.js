// 1.函数参数的默认值
// 在 ES6 之前，不能直接为函数的参数指定默认值

function log(x, y) {
    y = y || 'world';
    console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World


function log2(x, y) {
    if (typeof y === 'undefined') {
        y = 'world';
    }
    console.log(x, y);
}

// 在ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面

function log(x, y = 'world') {
    console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

// 参数变量是默认声明的，所以不能用let 或 const 再次声明

function foo(x = 5) {
    let x = 1; //error
    const x = 2; //error
}
// 上面代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。


// rest参数
// ES6 引入rest 参数 （形式为"...变量名"），用于获取函数的多余参数，这样就不需要使用 arguments 对象了， rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中


function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum += val;
    }

    return sum;
}

add(2, 5, 3); //10


// 对比

// arguments 变量写法
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}

// rest 参数写法
const sortNumbers = (...numbers) => numbers.sort();

// rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用rest参数改写数组push方法的例子。
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3)

// 注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

//  扩展运算符
//  含义： 扩展运算符（spread）是三个点（...） 它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列

console.log(...[1, 2, 3])
    // 1 2 3

console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]


// 一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

// ES5 写法
Math.max.apply(null, [12, 3, 4, 32, 3]);

// ES6
Math.max(...[12, 3, 4, 32, 3]);

//等同于
Math.max(12, 3, 4, 32, 3);

// 上面代码的ES5写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。
// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);


// 下面是另外一个例子。

// ES5
new(Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

// 严格模式
// 从ES5开始，函数内部可以设定为严格模式。

function doSomething(a, b) {
    'use strict';
    // code
}
// 《ECMAScript 2016标准》做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
// 报错
function doSomething(a, b = a) {
    'use strict';
    // code
}

// 报错
const doSomething = function({ a, b }) {
    'use strict';
    // code
};

// 报错
const doSomething = (...a) => {
    'use strict';
    // code
};

const obj = {
    // 报错
    doSomething({ a, b }) {
        'use strict';
        // code
    }
};


// 函数的 name 属性 返回该函数的函数名

function foo() {}

foo.name // "foo"

// 需要注意的是，ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名。
var func1 = function () {};

// ES5

// ES6
func1.name // "func1"

// Function构造函数返回的函数实例，name属性的值为“anonymous”。

(new Function).name // "anonymous"
// bind返回的函数，name属性值会加上“bound ”前缀。

function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "