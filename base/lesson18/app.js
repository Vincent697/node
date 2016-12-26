// 何为 connect 中间件

// 理解中间件的作用

var http = require('http');

var server = http.createServer(requestHandler);

function requestHandler(req, res) {
    res.end('hello world');
}

server.listen(3000);
console.log('server start on port 3000');

// 解决回调金字塔问题
// 四种解决方案
// EventProxy  事件发布订阅模式
// BlueBird    Promise方案
// Async       异步流程控制库
// Generator   ES6 原生的 Generator
// 
//***************************************


// 这里实现一个类似的链式调用

var middlewares = [
    function fun1(req, res, next) {
        parseBody(req, function(err, body) {
            if (err) return next(err);
            req.body = body;
            next();
        });
    },
    function fun2(req, res, next) {
        checkIdInDatabase(req.body.id, function(err, rows) {
            if (err) return next(err);
            res.dbResult = rows;
            next();
        });
    },
    function fun3(req, res, next) {
        if (res.dbResult && res.dbResult.length > 0) {
            res.end('true');
        } else {
            res.end('false');
        }
        next();
    }
];

function requestions(req,res){
    var i=0;

    //由middlewares 链式调用
    function next(err){
        if(err){
            return res.end('error: '.err.toString());
        }

        if(i< middlewares.length){
            middlewares[i++](req, res, next);
        }else{
            return;
        }
    }

    //触发第一个 middleware
    next();
}