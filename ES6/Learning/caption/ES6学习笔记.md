# 第一章 let 和 const 命令

1、let 命令
ES6 新增了let命令，用来声明变量。作用类似var 但是所声明的变量，只有在let 命令所在的代码块内有效

不存在变量提升

```javascript
//给 number 对象添加一个 isFinite方法 来判断一个数值是否为有限的  （finite）
(function(global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);
```