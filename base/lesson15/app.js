// var post ={
//     title: '呵呵',
//     author: 'Vincent',
//     content: 'sasadsa',
//     tags: ['heh','ee0','ee'],
// };

//mongoose 是个odm 'Object-Document Mapping' 对象文档映射


var mongoose = require('mongoose');

//连接对应的数据库 mongoose://localhost/test

//连接 mongodb
mongoose.connect('mongodb://139.199.20.246/test');

var Cat = mongoose.model('Cat',{
    name: String,
    friends: [String],
    age: Number,
});

//new 一个对象，名叫 kitty ,接着为 kitty 的属性们赋值

var kitty = new Cat({name:'Zildjian',friends:['tom','jerry']});

kitty.age=3;

//调用 .save 方法后，mongoose 会去你的 mongodb中的数据库里，存入一条记录
kitty.save(function(err){
    if(err){
        console.log('an error has happened');
    }else{
        console.log('meow');
    }
});

//----- 设计一个简单的博客程序
var post = mongoose.model("Post",{
    title: String,
    content: String,
    author: String,
    create_at: Date,
});
 