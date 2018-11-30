const chalk = require("chalk");
const path = require('path');
const express = require('express');
const cors = require('cors')
const proxy = require("http-proxy-middleware");
const CONST = require('./config/constant.json');
const app = express();
app.use(cors());
const router = express.Router();


// 处理代理
if (CONST.proxy) {
    const proxyConfig = require('./config/server.proxy');
    proxyConfig.forEach(function (element) {
        if (element.enable) {//代理开启
            //默认配置项
            let proxyOpt = {
                target: element.url,
                logLevel: "debug",
                changeOrigin: true,
                ws: true,                         // proxy websockets
                pathRewrite: {
                    '^/api/' : '/',           // remove base path
                    '^/dl/' : '/'           // remove base path
                },
                headers: (typeof element.headers !== 'undefined' ? element.headers : {}),
                onProxyRes: function (proxyRes) {
                    proxyRes.headers["Proxy-Server"] = "true";
                }
            }
            app.use(element.router, proxy(proxyOpt));
            console.log(chalk.green(`[proxy] : ${element.router} to ${element.url}`));
        }
    });
}

//
// router.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
router.all('*', function (req, res, next) {
    // 设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // pass
});

app.use(router);

// 端口
app.listen(CONST.port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + CONST.port);
});
