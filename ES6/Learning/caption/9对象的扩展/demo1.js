// 1.属性的简洁表示法

// ES6 允许直接写入变量和函数 作为对象的属性和方法
var foo = 'bar';
var baz = { foo };
baz //{foo: 'bar'}

// 等同于
var baz = { foo: foo };

function f(x, y) {
    return { x, y };
}
// ES6允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。
function f2(x, y) {
    return { x: x, y: y };
}

f(1, 2) // Object{x:1,y:2}

// 方法也可以简写
var o = {
    method() {
        return "Hello!";
    }
};
//等价于

var o = {
    method: function() {
        return "Hello";
    }
};

// 一个例子

var birth = '2016/01/18';

var Person = {
    name: 'zhansan',
    birth,
    hello() {
        console.log('我的名字是', this.name);
    }
};

function getPonit() {
    var x = 1;
    var y = 10;
    return { x, y };
}

getPonit();

// {x:1,y:10}

// CommonJS 模块输出变量，就非常适合使用简洁写法

var ms = {};

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {};
}

module.exports = { getItem, setItem, clear };

// 等同于
module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
};


//  属性的赋值器（setter)和取值器（getter) ,事实上也是采用这种写法

var cart = {
    _wheels: 4,
    get wheels() {
        return this._wheels;
    },
    set wheels(value) {
        if (value < this._wheels) {
            throw new Error("数值太小了！");
        }
        this._wheels = value;
    }
}

// ！！！注意：简洁的写法的属性名总是字符串，会导致一些看上去比较奇怪的结果
var obj = {
    class() {}
};
// 等同于 
var obj = {
    'class': function() {};
}

// 上面代码中，class是字符串，所以不会因为它属于关键字，而导致语法解析报错。

// 如果某个方法的值是一个Generator函数，前面需要加上星号。
var obj = { * m() {
        yield 'hello world';
    }
};

// 2. 属性名表达式
// JavaScript 语言定义对象的属性，有两种方法

// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

// 但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

var obj = {
    foo: true,
    abc: 123
};
// ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};


// 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};
// myObject // Object {[object Object]: "valueB"}
// 
// 上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。
