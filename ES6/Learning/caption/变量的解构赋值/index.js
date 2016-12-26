// 1、数组的解构赋值


// 以前的写法
var a = 1;
var b = 2;
var c = 3;

// ES6 
var [a, b, c] = [1, 2, 3];


// 用途
// 1、交换变量的值
[x, y] = [y, x];
// 上面代码交换变量x 和 y 的值


// 2、从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方面
// 返回一个数组

function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function() {
    return {
        foo: 1,
        bar: 2
    };
}

var { foo, bar } = example();

// 3、函数参数的定义 
// 解构赋值可以方便地将一组参数与变量名对应起来

// 参数是一组有次序的值
function f([x, y, z]) {

}
f([1, 2, 3]);

//参数是一组无次序的值

function f({ x, y, z }) {

}
f({ z: 3, y: 2, x: 1 });

// 4、提取JSON数据
// 解构赋值对提取JSON对象中的数据，尤其有用

var jsonDate = {
    id: 42,
    status: 'ok',
    data: [66, 34]
};

let { id, status, data: number } = jsonDate;

console.log(id, status, data); // 42 '0k' [66, 34]

// 5、函数参数的默认值

jQuery.ajax = function(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
};
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。