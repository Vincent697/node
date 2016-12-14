// 在 redis 中 存储 session
// session 存放在内存中不方便进程间共享 ，因此可以使用 redis 等缓存来存储session
// 假设你的机器是 4 核的，你使用了 4 个进程在跑同一个 node web 服务，当用户访问进程1时，他被设置了一些数据当做 session 存在内存中。而下一次访问时，他被负载均衡到了进程2，则此时进程2的内存中没有他的信息，认为他是个新用户。这就会导致用户在我们服务中的状态不一致。
// 需要使用到 connect-redis 模块

var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
app.listen(5000)
console.log('Server starting  on port 5000');

app.use(session({
    // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
    // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
    // 编写自己的 store 也很简单
    store: new redisStore(),
    secret: 'somesecrettoken'
}));

app.get('/', function(req, res) {
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来这里');
    }
});
