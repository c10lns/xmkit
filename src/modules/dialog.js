import './styles/dialog.scss';

import xmUtils from './utils';

let _config= {};

/**
 * 展示弹框，搭配jQuery使用
 * 
 * @param {string} selector 选择器
 * @param {object} config  配置，可选
 * {
 *      title: '', // 标准弹框标题文案
 *      content: '', // 正文html
 *      sureBtnText: '', // 按钮文本
 *      onSureBtnClick: function() {} // 确认按钮点击回调
 *      autoDismiss: true, // 触摸非弹框区域是否隐藏，默认true
 *      beforeShow: function() {} // 弹出前回调，用于特定弹框设定数据
 *      afterShow: function() {} // 弹出后回调
 *      beforeClose: function() {} // 关闭前回调
 *      afterClose: function() {} // 关闭后回调
 * }
 * 
 * DOM结构
 * <!-- 通用提醒弹窗 -->
    <div class="xm-dialog" id="JtipsDialog">
        <!--背景层-->
        <div class="xm-dialog-bg"></div>

        <!--弹框内容-->
        <div class="xm-dialog-cont">
            <div class="xm-title-cont relative text-center">
                <p class="xm-title">标题</p>
                <i class="xm-close xm-dialog-close"></i>
            </div>
            <div class="xm-title-divider divider divider-horizontal"></div>
            <!--正文-->
            <div class="xm-content"></div>
            <div class="xm-btn-cont">
                <button class="xm-btn xm-btn-blue sure xm-dialog-close">关闭</button>
            </div>
        </div>
    </div>
 * 
 * 其他：
 * class：xm-dialog-close，该控件被点击时是否关闭弹框
 */
let show = function(selector, config) {
    // console.log('show dialog: ' + selector, config);
    if (!_config) {
        _config = {};
    }
    config = Object.assign({
        autoDismiss: true
    }, config);
    _config[selector] = config;

    let $target = $(selector);

    // 设置弹框内容
    if (config.title) {
        $target.find('.xm-title').text(config.title);
    }
    if (config.content) {
        $target.find('.xm-content').html(config.content);
    }
    if (config.sureBtnText) {
        $target.find('.xm-btn.sure').text(config.sureBtnText);
    }

    if (_config[selector] && _config[selector].beforeShow) {
        _config[selector].beforeShow();
    }

    $target.show();
    xmUtils.allowBodyMove(false);

    if (_config[selector] && _config[selector].afterShow) {
        _config[selector].afterShow();
    }

    let _this = this;

    // 点击背景
    if (_config[selector] && _config[selector].autoDismiss) {
        $target.find('.xm-dialog-bg').off('click').on('click', function(e) {
            _this.hide(selector);
        })
    }

    // 点击关闭按钮
    $target.find('.xm-dialog-close').off('click').on('click', function(e) {
        _this.hide(selector);
    })

    // 配置的事件绑定需要放在最后
    if (config.onSureBtnClick) {
        $target.find('.xm-btn.sure').off('click').on('click', function(e) {
            config.onSureBtnClick(e);
        })
    }
};

let hide = function(selector) {
    if (_config[selector] && _config[selector].beforeClose) {
        _config[selector].beforeClose();
    }

    let $target = $(selector);
    $target.hide();
    xmUtils.allowBodyMove(true);

    if (_config[selector] && _config[selector].afterClose) {
        _config[selector].afterClose();
    }
}

/**
 * 隐藏当前弹框
 * 
 * return true：有弹框并且成功隐藏；false：当前无弹框
 */
let hideCurrent = function() {
    let needHide = false;
    Object.getOwnPropertyNames(_config).map(function(item, i) {
        let $target = $(item);
        if ($target && $target.css('display') === 'block') {
            needHide = true;
            hide(item);
        }
    })
    return needHide;
}

let mount = function(xm) {
    xm.prototype.showDialog = show.bind(this);
    xm.prototype.hideDialog = hide.bind(this);
    xm.prototype.hideCurrentDialog = hideCurrent.bind(this);
}

export default {
    mount: mount,
    show: show,
    hide: hide,
    hideCurrent: hideCurrent
}