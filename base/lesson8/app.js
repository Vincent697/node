var express = require('express');

var fibonacci = function (n) {
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};

var app = express();

app.get('/fib', function (req, res) {
  var n = Number(req.query.n);
  try {
    res.send(String(fibonacci(n)));
  } catch (e) {
    res
      .status(500)
      .send(e.message);
  }
});

module.exports = app;

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

/**
 * npm i -g nodemon 这个库是专门调试的时候使用的，
 * 它会自动检测 nodejs 代码的改动，然后帮你自动的重启应用，
 * 在调试的时候完全可以用 nodemon 命令替代 node 命令
 */