// 学习使用express 

// 引入 express 模块
var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });


app.get('test',function(req, res){
    res.send('running by url test');
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});