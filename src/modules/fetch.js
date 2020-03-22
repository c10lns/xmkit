import loading from './loading';
import toast from './toast';

let _phead;

/**
 * 发起请求
 * 
 * @param {*object} config 
 * {
 *      service     服务名
 *      path        路径，默认为common
 *      funid       接口号
 *      url         如果是特殊url，直接指定即可
 *      data        post的数据
 *      showLoading 是否展示loading浮层
 *      beforeSend  请求前回调
 *      callback    请求成功回调
 *      failCallback 请求成功但是服务器出错
 *      onError     请求发生错误回调
 *      complete    请求完成回调
 *      ignoreError 忽略服务器下发的错误状态
 * }
 */
let request = function(config) {
    let url, 
        postData, 
        paramData, 
        displayLoading = true; // 是否展示loading

    paramData = {
        phead: _phead,
        ispage: 1
    }
    url = config.url || (location.origin + '/' +  config.service + '/common?funid=' + config.funid + '&rd=' + new Date().getTime());
    postData = {
        data: Object.assign(paramData, config.data),
        shandle: 0,
        handle: 0
    }

    if (config['showLoading'] === false) {
        displayLoading = false;
    }

    displayLoading && loading.showLoading();
    $.ajax({
        type: "post",
        timeout: 30000,
        url: url,
        data: JSON.stringify(postData),
        async: true,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function() {
            config.beforeSend && config.beforeSend();
        },
        success: function(data) {
            if (data.result && data.result.status === 1) {
                config.callback && config.callback(data);
            } else {
                config.failCallback && config.failCallback();
                if (!config.ignoreError) {
                    toast.toast(data.result && data.result.msg);
                }
            }
        },
        error: function(xhr, status, errorThrown) {
            config.onError && config.onError(errorThrown);
            if (!config.ignoreError) {
                toast.toast("出错了");
            }
        },
        complete: function(xhr, status) {
            config.complete && config.complete();
            displayLoading && loading.hideLoading();
        }
    });
};

let mount = function(xm, phead) {
    _phead = phead;
    xm.prototype.request = request;
}

let updatePhead = function(phead) {
    _phead = phead;
}

export default {
    mount: mount,
    updatePhead: updatePhead,
    request: request
};