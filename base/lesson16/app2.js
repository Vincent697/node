// session 
// session 的运作通过一个 session_id 来进行。 session_id
// 通常是存放在客户端的cookie中，比如在express中 默认是 connect.sid 这个字段，当请求到来时，服务端检查cookie中保存的session_id 并通过这个session_id 与服务器端的session data 关联起来 进行数据的保存和修改

//在express 中操作 session要用到  express-session 这个模块，主要的方法就是 session(options) 其中的options 中包含可选参数 :
// name : 设置cookie 中，保存session 的字段名称，默认为 connect.sid
// store: session 的存储方法 默认存放在内存中，也可以使用 redis mongodb 
// secret: 通过设置 secret 字符串，来计算hash 值并存放在 cookie 中，使产生signedCookie 防篡改
// cookoe: 设置存放  session id 的 cookie 相关选项默认为- (default: { path: '/', httpOnly: true, secure: false, maxAge: null })
// genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 `uid2` 这个 npm 包。
// rolling: 每个请求都重新设置一个 cookie，默认为 false。
// resave: 即使 session 没有被修改，也保存 session 值，默认为 true。

var express = require('express');

var session = require('express-session');

var app = express();

app.listen(5000);

app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 }
}));

app.get('/', function(req, res) {

    // 检查 session 中的 isVisit 字段
    // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
        console.log(req.session);
    } else {
        req.session.isVisit = 1;
        res.send("欢迎第一次来这里");
        console.log(req.session);
    }
});
