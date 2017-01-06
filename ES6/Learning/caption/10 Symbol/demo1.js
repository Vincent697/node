// ES6 引入Symbol 从根本上防止属性名的冲突
// ES6 引入了一种新的原始数据类型Symbol, 表示独一无二的值。 是JavaScript 语言的第七种数据类型
// Undefined,Null,布尔值（Boolean）,字符串（String）,数值（Number）,对象（Object）,Symbol

var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1 //Symbol(foo)
s2 //Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"


// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。

const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)

// 注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

s1 === s2 // false

// 作为属性名的Symbol
// 由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

// 注意，Symbol值作为对象属性名时，不能用点运算符。

var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"


// Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
// 下面是另外一个例子。

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('Undefined color');
    }
}
// 常量使用Symbol值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。

// 还有一点需要注意，Symbol值作为属性名时，该属性还是公开属性，不是私有属性。

// 3 实例：消除魔术字符串

// demo
function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case 'Triangle':
            area = .5 * options.width * options.height;
            break;
            // .............
    }

    return area;
}

getArea('Triangle', { width: 100, height: 100 });

// 上面代码中，字符串“Triangle”就是一个魔术字符串，多次出现，与代码形成了 “强耦合”。不利于将来的修改和维护

//常用的消除魔术字符串的方法，就是把它写成一个变量。

var shapeType = {
    triangle: 'Triangle'
};

function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

// getArea(shapeType.triangle, { width: 100, height: 100 });
// 上面代码中，我们把“Triangle”写成shapeType对象的triangle属性，这样就消除了强耦合。

// 如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用Symbol值。

const shapeType = {
    triangle: Symbol()
};
// 上面代码中，除了将shapeType.triangle的值设为一个Symbol，其他地方都不用修改。

// 6 实例： 模块的 Singleton 模式 
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例
// 对于Node来说，模块文件可以看出是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？，很容易想到，可以把实例放到顶层对象 global

// mod.js
function A() {
    this.foo = 'hello';
}

if (!global._foo) {
    global._foo = new A();
}

module.exports = global._foo;

// 然后，加载上面的mod.js
var a = require('./mod.js');
console.log(a.foo);

// 但是，这里有一个问题，全局变量 global._foo 是可写的，任何文件都可以修改

var a = require('./mod.js');
global._foo = 123;


//为了防止这种情况的出现，可以使用  Symbol


// Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
    this.foo = 'hello';
}

if (!global[FOO_KEY]) {
    global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];
