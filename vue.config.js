module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },
    configureWebpack: {
        devServer: {
            before(app) {
                // 中间件
                app.use(function (req, res, next) {
                    // 检查token
                    if (/^\/api/.test(req.path)) { // 之校验/api开头的请求
                        if (req.path == '/api/login' || req.headers.token) {
                            next();
                        } else {
                            res.sendStatus(401); // 错误状态提示用户需要登录
                        }
                    } else {// 如果不是api
                        next();
                    }
                })

                app.get("/api/goods", function (req, res) {
                    res.json({
                        code: 0,
                        list: [
                            {id: 1, text: "Web全栈架构师", price: 1000},
                            {id: 2, text: "Python架构师", price: 1000}
                        ]
                    });
                });

                /*                app.get("/api/login", function (req, res) {
                                    const {username, password} = req.query;
                                    if (username === "jerry" && password === "123") {
                                        res.json({
                                            code: 0,
                                            token: "jilei"
                                        });
                                    } else {
                                        res.json({
                                            code: 1,
                                            message: "用户名或密码错误"
                                        });
                                    }
                                });*/
                app.get('/api/login', function (req, res) {
                    console.log("用户登录");
                    let body = [];
                    req.on("data", chunk => {
                        // 接收到一部分数据
                        console.log(chunk); //chunk是Buffer对象
                        body.push(chunk);
                    }).on("end", () => {
                        // 数据接收完毕
                        // 将body转换为完整的buffer
                        body = Buffer.concat(body).toString();//utf
                        console.log(body);
                        // 转换并保存前台传递的user
                        const {username, password} = JSON.parse(body); //{name:'aaa',age:20}
                        if (username == "jerry" && password == "123") {
                            res.json({
                                code: 0,
                                token: "jilei"
                            });
                        } else {
                            res.json({
                                code: 1,
                                message: "用户名或密码错误"
                            });
                        }
                    })
                });
                app.get('/api/logout', function (req, res) {
                    res.json({code: -1})
                })
            }
        }
    }
};
