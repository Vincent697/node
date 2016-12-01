// 作用域与闭包

//demo

var parent = function() {
    var name = 'parent_name';
    var age = 13;

    var child = function() {
        var name = 'child_name';
        var childAge = 0.3;

        // => child_name 13 0.3
        console.log(name, age, childAge);
    };

    child();

    //error
    console.log(name, age, childAge);

};

parent();

//----------------------------------

//不使用var 就成了全局变量
function foo() {
    value = 'hello';
}
foo();

console.log(value); // => hello
console.log(global.value); // => hello

//如果你确实要定义一个全局变量的话，请显示地定义在 `global` 或者 `window` 对象上。


//-----------闭包

var adder = function(x) {
    var base = x;
    return function(n) {
        return n + base;
    }
}

var add10 = adder(10);
console.log(add10(5)); // 

var add10 = adder(20)

// 一个坑
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 5);
}
//发现打印出来 5 个‘5’
//可以这样实现
for (var i = 0; i < 5; i++) {
    (function(idx) {
        setTimeout(function() {
            console.log(idx);
        }, 5);
    })(i);
}

//--------------------this
//在函数执行时，this总是指向调用该函数的对象。要判断 this 的指向，其实就是判断 this 所在的函数属于谁
//

/**
 * * 有对象就指向调用对象
 * * 没调用独享就指向全局对象
 * * 用 new 构造就指向新的对象、
 * * 通过 apply 或者 call 或 bind 来改变 this 的所指
 */


//1）函数有所属对象时：指向所属对象
var myObject = { value: 100 };
myObject.getValue = function() {
    console.log(this.value); // => 100
    // 输出 { value: 100, getValue: [Function] }，
    // 其实就是 myObject 对象本身
    console.log(this);

    return this.value;
}

console.log(myObject.getValue()); // => 100

//2) 函数没有所属对象：指向全局对象
var myObject = { value: 100 };
myObject.getValue = function() {
    var foo = function() {
        console.log(this.value) // => undefined
        console.log(this); // 输出全局对象 global
    };

    foo();

    return this.value;
};

console.log(myObject.getValue()); // => 100

// 3）构造器中的 this：指向新对象
// js 中，我们通过 `new` 关键词来调用构造函数，此时 this 会绑定在该新对象上。

var SomeClass = function() {
    this.value = 100;
}

var myCreate = new SomeClass();

console.log(myCreate.value); // =>100
//构造函数、普通函数、对象方法、闭包，这四者没有明确界线。界线都在人的心中。


//----------- apply 和 call 调用以及 bind 绑定：指向绑定的对象

// apply() 方法接受两个参数 第一个参数是函数运行的作用域，另一参数是一个参数数组( argument)

// call 方法第一个参数的意义与apply()方法相同，只是其他的参数需要一个个列举出来

// 简单来说，call的方式更接近我们平调用函数，而apply需要传递Array形式的数组给它，它们是可以相互转换的


var myObject = { value: 100};

var foo = function(){
    console.log(this);
}

foo(); //全局global
foo.apply(myObject);// {value: 100}
foo.call(myObject); // {value: 100}

var nweFoo =foo.bind(myObject);
newFoo(); //{value: 100}