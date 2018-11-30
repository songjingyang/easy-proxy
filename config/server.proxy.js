//远程代理访问，可以配置多个代理服务
const proxyConfig = [
    {
        enable: true,
        router: "/api/*",
        headers: {"X-XSS": "X-XSS"},
        //url: "http://172.168.3.141:8080"
        // url: "http://47.104.68.10:8080"
        // url: "http://172.168.3.60:8080"
        url: "http://47.93.179.52:8080"

    },
    {
        enable: true,
        router: ["/dl/*"],
        //url: "http://115.28.67.214:8080"
        url: "http://47.95.147.231:8081"

    },
    {
        enable: false,
        router: ["/users/*", "/orgs/*"],
        url: "https://api.github.com"
    }
];

module.exports = proxyConfig
