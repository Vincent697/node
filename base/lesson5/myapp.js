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
        concurrency++;

        console.log('现在的并发数是', concurrency, ', 正在抓取的是', url);
        superagent.get(url).end(function (err, res) {
            if (err || res.statusCode !== 200) {
                requestAgain(url, cb);
                return;
            }
            concurrency--;

            var $=cheerio.load(res.text);

            var tempCon={};
            tempCon.title = $('.topic_full_title').text().trim(),
            tempCon.href = url,
            tempCon.comment1 = $('.reply_content').eq(0).text().trim(),
            
            callback(null,tempCon);
        });
    };

    // 并发深度抓取
    /**
     * 第一个参数 urls 为数组，保存了需要爬取页面的 100 个 url，
     * 第二个参数 5 表示并发爬取数量为 5，
     * 第三个参数是迭代函数（每个 url 需要执行这个函数），其第一个参数 url，是 urls 数组的每个 item，第二个参数 callback 与 mapLimit 方法第四个参数有关，callback 会往 result 参数里存放数据。如何理解？callback 是第三个参数 iterator 的回调，以爬虫为例，爬完页面肯定会分析一些数据，然后保存，执行 callback 函数就能把结果保存在 result（第四个参数函数中的参数） 中。
     */
    async.mapLimit(topicUrls, 5, function(url,callback){
        requestAgain(url,callback);
    },function(err, result){
        console.log(':final');
        console.log(result);
    });

});

