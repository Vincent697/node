// signedCookie
// 假设我的服务器有个秘密字符串，是 `this_is_my_secret_and_fuck_you_all`，我为用户 cookie 的 `dotcom_user` 字段设置了个值 `alsotang`。cookie 本应是

// ```js
// {dotcom_user: 'alsotang'}
// ```

// 这样的。

// 而如果我们签个名，比如把 `dotcom_user` 的值跟我的 secret_string 做个 sha1

// `sha1('this_is_my_secret_and_fuck_you_all' + 'alsotang') === '4850a42e3bc0d39c978770392cbd8dc2923e3d1d'`

// 然后把 cookie 变成这样

// ```js
// {
//   dotcom_user: 'alsotang',
//   'dotcom_user.sig': '4850a42e3bc0d39c978770392cbd8dc2923e3d1d',
// }