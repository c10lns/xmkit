import './styles/toast.scss';

import xmUtils from './utils';

/**
 * 弹出toast，使用方法
 * 1 添加DOM
 * <div class="xm-toast">
        <div></div>
    </div>
 * 
 * 2 js调用，xm.toast('msg')
 * 
 * @param {string} text toast文案
 * @param {string} selector 选择器
 */
let toast = function(text, selector) {
    let toastTimeout = null,
        toastContainer = $('.xm-toast');
    
    if (toastContainer.length === 0) {
        return;
    }

    $('.xm-toast div').text(text);

    if (toastContainer.css('display') === 'none') {
        toastContainer.show();
        toastTimeout = setTimeout(function() {
            toastContainer.hide();
        }, 3000);
    } else {
        toastContainer.hide();
        window.clearTimeout(toastTimeout);
        toast(text, selector);
    }
    if (!xmUtils.isNull(selector)) {
        $(selector).focus();
    }
};

let mount = function(xm) {
    xm.prototype.toast = toast;
}

export default {
    mount: mount,
    toast: toast
}