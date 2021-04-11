# 常用中间件

express给我们制作了一些常用的中间件，通过注册这些中间件，可以轻松实现一些通用功能

## express.static

```js
// 该函数返回一个中间件
// 它将指定的目录作为静态资源目录
// 当访问服务器时，该中间件会通过 path 对应该目录中的文件
// 如果能够找到文件，则直接响应文件内容，不再向后移交
// 若无法找到文件，向后移交
express.static(dir);
```

使用示例：

```js
app.use(express.static(path.resolve(__dirname, "public")))
```

## express.urlencoded

```js
// 该函数返回一个中间件
// 如果它发现请求头中的 content-type 的值是 application/x-www-form-urlencoded
// 则会把请求体中的内容解析为一个对象，保存到 req.body 中，然后向后移交
// 否则，直接向后移交
express.urlencoded();
```

使用示例：

```js
// 使用配置 {extended: true}，避免报出警告
app.use(express.urlencoded({extended: true}));
```

## express.json

```js
// 该函数返回一个中间件
// 如果它发现请求头中的 content-type 的值是 application/json
// 则会把请求体中的内容解析为一个对象，保存到 req.body 中，然后向后移交
// 否则，直接向后移交
express.json();
```

使用示例：

```js
app.use(express.json());
```

## express.Router

```js
// 该函数返回一个中间件，称之为路由中间件
var router = express.Router();

// 匹配 GET 基路径/
router.get("/", function(req, res){
  
})
// 匹配 GET 基路径/a
router.get("/a", function(req, res){
  
})
// 匹配 POST 基路径/
router.post("/", function(req, res){
  
})
// 当基路径为 /api/user 时，交给该路由处理
// 如果路由没有命中，则它会自动往后移交
app.use("/api/user", router);
```

使用路由中间件处理请求更加有助于模块拆分