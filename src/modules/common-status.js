import './styles/common-status.scss';

const DEFAULT_EMPTY_TITLE = '暂无数据',
    DEFAULT_ERROR_TITLE = '不好意思出错啦，点击按钮刷新试试！',
    DEFAULT_NET_ERROR_TITLE = '网络错误，请刷新重试',
    DEFAULT_BTN_TEXT = '点击刷新';

let showStatusEmpty = function(config) {
    config.pic = '';
    config.title = config.title || DEFAULT_EMPTY_TITLE;
    this.fillAndShow(config);
}

let showStatusNetError = function(config) {
    config.pic = '';
    config.title = config.title || DEFAULT_NET_ERROR_TITLE;
    config.btnText = config.btnText || DEFAULT_BTN_TEXT;
    this.fillAndShow(config);
}

let showStatusError = function(config) {
    config.pic = '';
    config.title = config.title || DEFAULT_ERROR_TITLE;
    config.btnText = config.btnText || DEFAULT_BTN_TEXT;
    this.fillAndShow(config);
}

let showStatusNormal = function(config) {
    let selector = config.selector;
    $(selector).hide();
}

let fillAndShow = function(config) {
    let selector = config.selector,
        title = config.title,
        subTitle = config.subTitle,
        pic = config.pic,
        btnText = config.btnText,
        callback = config.callback;

    $(selector + ' .xm-common-status-pic').attr('src', pic).show();

    if (title && title !== '') {
        $(selector + ' .xm-common-status-title').text(title).show();
    } else {
        $(selector + ' .xm-common-status-title').hide()
    }

    if (subTitle && subTitle !== '') {
        $(selector + ' .xm-common-status-sub-title').text(subTitle).show();
    } else {
        $(selector + ' .xm-common-status-sub-title').hide();
    }

    if (callback) {
        $(selector + ' .xm-common-status-btn').text(btnText).show().off('click').on('click', function() {
            callback();
        });
    } else {
        $(selector + ' .xm-common-status-btn').off('click').hide();
    }
    $(selector).show();
}

let mount = function(xm) {
    xm.prototype.showStatusEmpty = showStatusEmpty.bind(this);
    xm.prototype.showStatusError = showStatusError.bind(this);
    xm.prototype.showStatusNetError = showStatusNetError.bind(this);
    xm.prototype.showStatusNormal = showStatusNormal.bind(this);
}

export default {
    mount: mount,
    showStatusEmpty: showStatusEmpty,
    showStatusError: showStatusError,
    showStatusNetError: showStatusNetError,
    showStatusNormal: showStatusNormal,
    fillAndShow: fillAndShow
}