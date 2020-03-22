import fetch from './fetch';

const TYPE = {
    ERROR: 1,
    PERFORMANCE: 2
}

let _page;

let mount = function(xm, page) {
    _page = page;
    xm.prototype.sendErrorLog = sendErrorLog;
    bindErrorMonitor();
}

let bindErrorMonitor = function() {
    window.onerror = (msg, url, line) => {
        //控制台不输出错误
        if(msg.indexOf('setSelectionRange') > -1){
            return true;
        }else{
            let info = {
                msg: msg,
                url: url,
                line: line
            };
            sendErrorLog(info);
        }
    };
}

let bindPerformanceTimingMonitor = function() {
    //延时获取performance保证准确性
    setTimeout(() => {
        const performance = window.performance;
        if (!performance) {
            // 当前浏览器不支持
            return;
        } else {
            let times = {};
            const t = performance.timing;

            //【重要】页面加载完成的时间
            //【原因】这几乎代表了用户等待页面可用的时间
            times.loadPage = t.loadEventEnd - t.navigationStart;

            //判断如果页面加载完成的时间大于2s才写入数据库
            if(times.loadPage < 2000){
                return;
            }

            //【重要】重定向的时间
            //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
            //times.redirect = t.redirectEnd - t.redirectStart;

            //【重要】DNS 查询时间
            //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
            // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)            
            //times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

            //【重要】读取页面第一个字节的时间
            //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
            // TTFB 即 Time To First Byte 的意思
            // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
            times.ttfb = t.responseStart - t.navigationStart;

            //【重要】内容加载完成的时间
            //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
            times.request = t.responseEnd - t.requestStart;

            //【重要】执行 onload 回调函数的时间
            //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
            times.loadEvent = t.loadEventEnd - t.loadEventStart;

            // DNS 缓存时间
            //times.appcache = t.domainLookupStart - t.fetchStart;

            // 卸载页面的时间
            //times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

            // TCP 建立连接完成握手的时间
            //times.connect = t.connectEnd - t.connectStart;

            _send(TYPE.PERFORMANCE, _page, times);
        }
    }, 500)
}

let _send = function(type, page, info) {
    fetch.request({
        url:  `${location.origin}/frontend_service/monitor?rd=${new Date().getTime()}`,
        data: {
            type: type,
            info: info,
            page: _page
        },
        showLoading: false,
        ignoreError: true
    })
}

let sendErrorLog = function(info) {
    _send(TYPE.ERROR, _page, info)
}

export default {
    mount: mount,
    bindErrorMonitor: bindErrorMonitor,
    bindPerformanceTimingMonitor: bindPerformanceTimingMonitor,
    sendErrorLog: sendErrorLog
};