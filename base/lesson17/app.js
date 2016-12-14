// 使用 promise 替代回调函数

// var fs= require('fs');

// fs.readFile("sample.txt",'utf8',function(err,data){
//     if(err){
//         console.log("error");
//         return false;
//     }
//     console.log(data);
// });

// promise 有三种状态 未完成 完成（fulfilled） 和失败（rejected）
// promise 的状态可以由未完成 转换成完成 或者转换成失败
// promise 的状态只发生一次

// promise 有一个then方法 then方法可以接受3个函数 作为参数
// 前两个函数对应 promise的两种状态 fullfilled rejected 的回调函数， 第三个函数用于处理进度信息


// promiseSomething().then(function(fulfilled){
//     //完成调用
// },function(rejected){
//     //失败调用
// },function(progress){
//     //返回进度信息 ，调用次函数
// });

//举一个例子

var Q =require('q');

var defer = Q.defer();

/**
 * 获取初始promise
 * [getInitialPromise description]
 * @return {[type]} [description]
 */
function getInitialPromise(){
    return defer.promise;
}

getInitialPromise().then(function(success){
    console.log(success);
}, function(error){
    console.log(error);
}, function(progress){
    console.log(progress);
});

defer.notify('in progress');//控制台打印in progress
defer.resolve('resolve');//控制台打印resolve
defer.reject('reject'); //没有输出。promise的状态只能改变一次