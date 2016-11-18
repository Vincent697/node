/**
 * Author by vincent
 */
// 可以发起  http 请求
var superagent=require('superagent');
// 使可以实现类似 jquery 的功能
var cheerio= require('cheerio');
// 并发控制
var async =require('async');
var url= require('url');
//抓取地址
var cnodeurl='https://cnodejs.org/';


//抓取开始
superagent.get(cnodeurl).end(function(err,res){
    //异常控制
    if(err){
        return console.error(err);
    }

    var topicUrls=[];
    var $= cheerio.load(res.text);
    
    //获取 首页所有的链接
    $('#topic_list .topic_title').each(function(index, el) {
        var $element =$(el);
        // 这里由于获取的相对地址  可以使用 url.resolve 来自动推断出完整的 url
        var href =url.resolve(cnodeurl,$element.attr('href'));
        topicUrls.push(href);
    });

    //console.log(topicUrls);

    //并发计数器
    var concurrency=0;

    var requestAgain = function (url, callback) {
        superagent.get(url).end(function (err, res) {
            if (err || res.statusCode !== 200) {
                requestAgain(url, cb);
                return;
            }

            callback(res);
        });
    };

    // 并发深度抓取
    async.mapLimit(topicUrls, 5, function(url,callback){

        requestAgain(url,function(res){
            console.log('fetch ' + url + ' ' + res.statusCode);
        })
        // superagent.get(url).end(function(err,res){
        //     if(err){
        //         return console.log(err);
        //     }

        //     var returnText=[];
        //     var $=cheerio.load(res.text);

        //     console.log($('.topic_full_title').text().trim());

        // });

    },function(err, result){
        console.log(':final');
        console.log(result);
    });

});

