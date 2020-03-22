import './modules/styles/reset.scss';
import './modules/styles/common.scss';

import utils from './modules/utils';
import toast from './modules/toast';
import loading from './modules/loading';
import dialog from './modules/dialog';
import event from './modules/event';
import fetch from './modules/fetch';
import monitor from './modules/monitor';
import commonStatus from './modules/common-status';

let isLoaded = false, // 是否已经回调onload
    isBinded = false,
    needCallBind = false, // 是否需要调用onbind，当platformBindFinish在onLoad之前被调用时此值被置为true
    xmkit;

if (window.xmkit) {
    //console.error('xmkit重复初始化！');
    xmkit = window.xmkit
} else {
    var XmKit = function (config) {};

    /**
     * 页面初始化
     * @param {*object} config 页面配置
     * {
     *      title: '', // 页面标题，统计用
     *      debug: true, // 是否开启调试
     *      loaded: function, // window onLoad回调
     *      binded: function, // jsbridge绑定成功回调
     *      phead: phead, // phead
     *      monitor: false, // 开启监控，默认false
     * }
     */
    XmKit.prototype.init = function (config) {
        // 这种方式在某些情况会导致出错
        // this.config = Object.assign({
        //     title: 'miss title',
        //     debug: false,
        //     loaded: function(){},
        //     binded: function(){},
        //     monitor: false,
        //     phead: {"pversion":"30","cversion":0,"cityid":"440100","gcityid":"440100"}
        // }, config);

        this.config = {
            title: 'miss title',
            debug: false,
            loaded: function () {},
            binded: function () {},
            monitor: false,
            phead: {
                "pversion": "30",
                "cversion": 0,
                "cityid": "440100",
                "gcityid": "440100"
            }
        };

        if (config) {
            if (config.title !== undefined) {
                this.config.title = config.title;
            }
            if (config.debug !== undefined) {
                this.config.debug = config.debug;
            }
            if (config.loaded !== undefined) {
                this.config.loaded = config.loaded;
                if(isLoaded){
                    config.loaded();
                }
            }
            if (config.binded !== undefined) {
                this.config.binded = config.binded;
                if(isBinded){
                    config.binded();
                }
            }
            if (config.monitor !== undefined) {
                this.config.monitor = config.monitor;
            }
            if (config.phead !== undefined) {
                this.config.phead = config.phead;
            }
        }

        this.log('XmKit init...' + this.config.title);
        utils.mount(XmKit);
        toast.mount(XmKit);
        loading.mount(XmKit);
        dialog.mount(XmKit);
        event.mount(XmKit);
        fetch.mount(XmKit, this.config.phead);
        commonStatus.mount(XmKit);
        this.config.monitor && monitor.mount(XmKit, this.config.title);

        this.log('XmKit init finish');
    }

    XmKit.prototype.loaded = function () {
        this.log('XmKit loaded');
        this.config.loaded();
        this.config.monitor && monitor.bindPerformanceTimingMonitor();
    };

    XmKit.prototype.binded = function () {
        this.log('XmKit binded');
        this.config.binded();
    }

    XmKit.prototype.log = function (msg) {
        this.config && this.config.debug && console.log(msg);
    }

    XmKit.prototype.updatePhead = function (phead) {
        this.config.phead = phead;
        fetch.updatePhead(phead);
    }

    xmkit = new XmKit({});

    window.xmkit = xmkit;
}

window.platformBindFinish = function () {
    if (isLoaded) {
        isBinded = true;
        xmkit.binded&&xmkit.binded();
    } else {
        needCallBind = true;
    }
};
window.addEventListener('load', function () {
    isLoaded = true;
    xmkit.loaded&&xmkit.loaded();
    if (utils.isAndroid() || needCallBind) {
        isBinded = true;
        xmkit.binded&&xmkit.binded();
    }
})

export default xmkit