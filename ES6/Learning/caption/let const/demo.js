// let

{
    let a = 10; //在代码块内有效
    var b = 1;
}
//在for 循环计数器中的使用

for (let i = 0; i < 10; i++) {

}

// 块级作用域、
// 块级作用域的出现，实际上使得获得广泛应用你的立即执行函数表达式（ IIFE ）不再必要了

// IIFE 写法
(function() {
    var temp = "..........";
})();

// 块级作用域
{
    let temp = ".............";
}

// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要的话，也应该写成函数表达式，而不是函数声明语句。

// 函数声明语句
{
    let a = "secret";

    function f() {
        return a;
    }
}

// 函数表达式
{
    let a = "secert";
    let f = function() {
        return a;
    };
}

//另外，还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

// 不报错
'use strict';
if (true) {
    function f() {}
}

// 报错
'use strict';
if (true)

function f() {}


// do 表达式
// 使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。
// let x = do {
//     let t = f();
//     t * t + 1;
// }

// const 命令
// const 声明一个只读的常量。 一旦声明，常量的值 就不能改变，因此 const 声明的变量应立即初始化

const PI = 3.1415;
PI; // 3.1415

// PI = 3;  // error

// 对于符合类型的变量，变量名不指向数据，而是指向数据所在的地址。const 命令只是保存变量名指向的地址不变，并保存改地址的数据不变，所以将一个对象声明为常量就必须小心

const foo = {};

foo.name = "vincent";

foo.name// vincent

foo={};  //TypeError: "foo" is read-only


// 对象冻结  可以使用 Object.freeze 方法
const foo=Object.freeze({});

foo.sex="man" //error