// 依赖   superagent cheerio eventproxy

// 可以发起  http 请求
var superagent=require('superagent');
// 使可以实现类似 jquery 的功能
var cheerio= require('cheerio');
// 起到计数器的作用  ，它来帮你管理到底这些异步操作是否完成，完成时候，会自动调用处理函数，并将抓取到的数据当作参数传过来
var eventproxy= require('eventproxy');
// eventproxy 提供了不少其他场景所需的 API，但最最常用的用法就是以上的这种，即：
// 1. 先 `var ep = new eventproxy();` 得到一个 eventproxy 实例。
// 2. 告诉它你要监听哪些事件，并给它一个回调函数。`ep.all('event1', 'event2', function (result1, result2) {})`。
// 3. 在适当的时候 `ep.emit('event_name', eventData)`。

//url 模块是node js 标准库里面的
var url = require('url');

var cnodeurl = 'https://cnodejs.org/';

superagent.get(cnodeurl).end(function(err, res){
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


    var ep = new eventproxy();

    //命令 ep 重复监听 topicUrls.length 次（40） ‘ topic_html’ 事件再行动
    
    // ep.after 适用于 需要重复操作的任务，当存在循环的异步是 可以使用 after 操作 
    ep.after('topic_html', topicUrls.length, function(topics){
        // topics 是个数组，包含了40 次的 ep.emit('topic_html', pair)中的那40个pair
        
        // 开始行动
        // 这里使用了 map 来存数据 (注意输出的顺序)
        topics= topics.map(function(topicPair) {  
            var topicUrl= topicPair[0];  //[topicUrl, res.text] 中的 url
            var topicHtml= topicPair[1]; //[topicUrl, res.text] 中的 res.text
            
            var $= cheerio.load(topicHtml);
            return ({
                title :$('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
            });
        });
        console.log('final: ');
        console.log(topics);
    });

    // 定义一个 防止抓取失败的方法，当请求失败，重新请求.
    var requestAgain = function (url, cb) {
        superagent.get(url).end(function (err, res) {
            if (err || res.statusCode !== 200) {
                requestAgain(url, cb);
                return;
            }

            cb(res);
        });
    };
     
    topicUrls.forEach(function(topicUrl){

        requestAgain(topicUrl, function (res) {
            console.log('fetch ' + topicUrl + ' ' + res.statusCode);

            ep.emit('topic_html', [topicUrl, res.text]);
        });
        // superagent.get(topicUrl).end(function(err, res){
        //     console.log('fetch '+ topicUrl + ' successful');
            
        //     console.log('#################################### \n')
        //     console.log(topicUrl+'**************'+res.statusCode);
        //     //console.log(res.text);
        //      console.log('#################################### \n')
        //     ep.emit('topic_html', [topicUrl, res.text]);
        // });
    });

});

/**
 * 经测试，发现抓取数据时  多次出现 503 错误，造成抓取失败
 * 因此在这做一个处理，当 请求不是 200 的时候  自动重新发起请求 
 * 顺利抓取到正常的数据
 */
