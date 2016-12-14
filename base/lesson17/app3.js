// promise 链

// promise 链提供了一种让函数顺序执行的方法

var Q = require('q');
var defer = Q.defer();

// 一个模拟的数据库

var users = [{'name': 'vincent','passwd':'password'}];

function getusername(){
    return defer.promise;
}

function getUser(username){
    var user;
    user.forEach(function(element){
        if(element.name === username){
            user = element;
        }
    });
    return user;
}

//promsise 链

getUsername().then(function(username){
    return getUser(username);
}).then(function(){
    console.log(user);
});

defer.resolve('andrew');