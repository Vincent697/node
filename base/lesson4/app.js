// 依赖   superagent cheerio eventproxy

// 可以发起  http 请求
var superagent=require('superagent');

var cheerio= require('cheerio');

var eventproxy= require('eventproxy');

var url = require('url');

var cnodeurl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res){
	if(err){
		return console.error(err);
	}
	
	var topicUrls=[];
	var $= cheerio.load(res.text);
	
	//获取 首页所有的链接
	$('')
});
