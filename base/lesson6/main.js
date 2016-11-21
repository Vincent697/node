// 学习使用 测试框架 mocha 
// 学习使用断言库 should 
// 学习是使用测试率覆盖工具 istanbul
// 简单的Makefilen 的编写

var fibonacci = function(n) {
    if (typeof n !== 'number') {
        throw new Error('n should be a Number');
    }
    if (n < 0) {
        throw new Error('n should >= 0')
    }
    if (n > 10) {
        throw new Error('n should <= 10');
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
};

exports.fibonacci = fibonacci; //对外暴露 fibonacci 

if (require.main === module) {
    //如果死直接执行 main.js ,则进入此处
    //如果 main.js 被其他文件 require ,则此处不会执行

    var n = 10; //process.argv返回命令行脚本的各个参数组成的数组。

    console.log('fibonacci(' + n + ') is', fibonacci(n));
}
