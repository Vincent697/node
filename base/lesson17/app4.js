// 一个读取文件的例子

var Q =require('q');
var fs =require('fs');

function printFileContent(fileName){
    return function(){
        var defer =Q.defer();
        fs.readFile(fileName,'utf8',function(err,data){
            if(!err && data){
                console.log(data);
                defer.resolve();
                console.log("--------------分割线--------------");
            }else{
                console.log(fileName+ ' is not exit');
                defer.resolve();
            }
        });
        return defer.promise;
    }
}

//手动链接
printFileContent('app.js')()
    .then(printFileContent('app2.js'))
    .then(printFileContent('app3.js'))
    .then(printFileContent('app4.js'))
    .then(printFileContent('app5.js'))
    .then(printFileContent('sample.txt'));



//--------------------------- 优化

