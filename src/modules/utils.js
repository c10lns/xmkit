let sUserAgent = navigator.userAgent.toLowerCase();

/**
 * 当前运行环境
 */
let browser = {
        isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isUc: sUserAgent.match(/ucweb/i) == "ucweb",
        isAndroid: sUserAgent.match(/android/i) == "android",
        isQQ: sUserAgent.match(/qq/i) == "qq",
        isWechat: sUserAgent.match(/micromessenger/i) == "micromessenger",
        isWeibo: sUserAgent.match(/weibo/i) == "weibo",
        isHuawei: sUserAgent.match(/huawei/i) == "huawei",
        isSupportWebp: function() {
            return this.isAndroid && this.androidVersion > 4.1 && !this.isHuawei
        },
        androidVersion: Number(sUserAgent.substr(sUserAgent.indexOf('android') + 8, 3))
    };

/**
 * 通过配置获取url
 * 
 * @param {object} config 配置
 */
let getUrlByConfig = function(config) {
    if (config && config.service && config.funid) {
        let paramsString = '';
        if (config.params) {
            Object.getOwnPropertyNames(config.params).map(function(item, index) {
                paramsString += '&' + item + '=' + config.params[item];
            });
        }
        return location.origin + '/' + config.service + '/common?funid=' + config.funid + paramsString + new Date().getTime();
    } else {
        throw new Error('config is not correct!');
    }
}

/**
 * 从url中获取query属性值，默认使用当前页面地址
 * 
 * @param {string} name 参数名称
 */
let getQueryParam = function(name, url){
    let searchString,
        regMatch,
        reg;

    if (url) {
        let urlSearchPot = url.indexOf('?');
        if(urlSearchPot <= -1){
            return null;
        }
        searchString = url.substr(urlSearchPot, url.length);
    } else {
        searchString = window.location.search;
    }

	reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    regMatch = searchString.substr(1).match(reg);
	return regMatch ? unescape(regMatch[2]) : null;
};

/**
 * 阻止事件传递
 * 
 * @param {Event} event 当前事件
 */
let stopEvent = function(event) {
    //取消事件的默认动作。
    event.preventDefault();
    //阻止把事件分派到其他节点。
    event.stopPropagation();
    //把元素绑定的同类型事件阻止
    event.stopImmediatePropagation();
};

let isNull = function(object) {
    //解决处理判断数字0===''的问题
    if(object === 0){
		return false;
	}
    return object == null || object == '' || object == 'undefined';
}

/**
 * 判断是否登录
 */
let isLogin = function() {
    return !isNull(phead) && !isNull(phead.access_token);
};

/**
 * Object.assign兼容
 */
let polyfill = function() {
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            //第一个传参不能是undefined和null，因为它们不能被转为对象
            if (target === undefined || target === null) {
                throw new TypeError('Can not convert undefined or null to object');
            }
            //使用Object对象化target
            let output = Object(target);
            for (let idx = 1,l=arguments.length; idx < l; idx++) {
                let source = arguments[idx];
                //后续传参也需要判断undefined和null
                if (source !== undefined && source !== null) {
                    for (let key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            output[key] = source[key];
                        }
                    }
                }
            }
            return output;
        };
    }
}

/**
 * 开启或禁止屏幕滚动
 * 
 * @param {boolean} canMove true：允许滚动；false：不允许滚动
 */
let allowBodyMove = function (canMove) {
    if (!canMove) {
        $('body').on('touchmove scroll mousewheel', function (event) {
            return false;
        });
    } else {
        $('body').off('touchmove scroll mousewheel').on('touchmove scroll mousewheel');
    };
};

/**
 * 开始图片懒加载
 */
let initLazyLoad = function () {
    $('img.lazy').each(function () {
        let $this = $(this);
        // let $original = getFormatImg($this.attr('data-original'));
        let $original = $this.attr('data-original');
        $this.attr('data-original', $original);
    }).lazyload({
        threshold: 200
    });
};

let mount = function(xm) {
    xm.prototype.getUrlByConfig = getUrlByConfig;
    xm.prototype.getQueryParam = getQueryParam;
    xm.prototype.stopEvent = stopEvent;
    xm.prototype.isNull = isNull;
    xm.prototype.isLogin = isLogin;
    xm.prototype.polyfill = polyfill;
    xm.prototype.allowBodyMove = allowBodyMove;
    xm.prototype.initLazyLoad = initLazyLoad;
    xm.prototype.isIOS = function() {return browser.isIOS},
    xm.prototype.isAndroid = function() {return browser.isAndroid},
    xm.prototype.isSupportWebp = browser.isSupportWebp.bind(browser)
}

export default {
    mount: mount,
    getUrlByConfig: getUrlByConfig,
    getQueryParam: getQueryParam,
    stopEvent: stopEvent,
    isNull: isNull,
    isLogin: isLogin,
    polyfill: polyfill,
    allowBodyMove: allowBodyMove,
    initLazyLoad: initLazyLoad,
    isIOS: function() {return browser.isIOS},
    isAndroid: function() {return browser.isAndroid},
    isSupportWebp: browser.isSupportWebp.bind(browser)
}