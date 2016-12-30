// ES6 允许使用 "箭头" ( => )定义函数
var f = v => v;

// 上面的箭头函数等同于：

var f = function(v) {
    return v;
}

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

var f = () => 5;
// 等同于 
var f = function() {
    return 5
};

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
    return num1 + num2;
};

// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并使用 return 语句返回

var sum = (num1, num2) => {
    return num1 + num2;
}

// 由于大括号被解释为代码块，所以如果函数箭头直接返回一个对象吧，必须在对象外面加上括号

var getTempItem = id => ({ id: id, name: "Temp" });

// 箭头函数可以与变量解构结合使用

const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
    return person.first + "" + preson.last;
}

// 箭头函数使得表达式更加简洁
const isEven = n => n % 2 == 0;
const square = n => n * n;

// 箭头函数的一个用处是简化回调函数
// 正常的函数写法
[1, 2, 3].map(function(x) {
    return x * x;
});

// 箭头函数写法
[1, 2, 3].map(x => x * x);



var result = values.sort(function(a, b) {
    return a - b;
});

var result = values.sort((a, b) => a - b);

// rest参数与箭头函数结合的例子
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5);
// [1,2,3,4,5]


const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
    // [1,[2,3,4,5]]

// 使用注意点
// 箭头函数有几个使用注意点。

// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);

    setInterval(function() {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);

// s1: 3
// s2: 0


// 嵌套的箭头函数
// 箭头函数内部，还可以再使用箭头函数，

// ES5 
function insert(value) {
    return {
        into: function(array) {
            return {
                after: function(afterValue) {
                    array.splice(array.indexOf(afterValue) + 1, 0, value);
                    return array;
                }
            };
        }
    };
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

let insert = (value) => ({
    into: (array) => ({
        after: (afterValue) => {
            array.splice(array.indexOf(afterValue) + 1, 0, value);
            return array;
        }
    })
});

insert(2).into([1, 3]).after(1); //[1, 2, 3]

// 一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入

const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);
// reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。

const plus1 = a => a + 1;
const mult2 = a => a * 2;

const addThenMult = pipeline(plus1, mult2);

addThenMult(5);
// 12


// 箭头函数还有一个功能，就是可以很方便地改写λ演算。

// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
    (x => f(v => x(x)(v)));
// 上面两种写法，几乎是一一对应的。由于λ演算对于计算机科学非常重要，这使得我们可以用ES6作为替代工具，探索计算机科学。

// 尾调用优化
// 尾调用（Tail Call）是函数式编程的一个重要的概念，本身非常简单，就是指某个韩式的最后一步是调用另一个函数

function f(x) {
    return g(x);
}

// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。

function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
// 上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。