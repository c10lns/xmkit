import xmUtils from './utils';
import Cookies from './cookies';

let _isAPP = false;

let composePostData = function(param) {
    let postData = {"data": {"phead": phead}, "shandle": 0};
    let htmlUrl = encodeURI(param + '&data=' + JSON.stringify(postData));
    return htmlUrl;
};

/**
 * TODO 给链接添加参数
 * 
 * @param {any} nameArr 
 * @param {any} url 
 * @returns 
 */
function changeUrl(nameArr, url){
    for(let i = 0; i < nameArr.length; i ++){
        let sys = '?';
        if(url.indexOf('?') > -1){
            sys = '&';
        }
        if(!getUrlParam(nameArr[i], url) && $.getUrlParam(nameArr[i])){
            url += sys + nameArr[i] + '=' + $.getUrlParam(nameArr[i]);
        }
    }
    return url;
}

/**
 * 非app时跳转页面
 * @param {object} param 跳转页面参数
 */
let platformLaunchH5 = function(param){
    if(!param){
        return;
    }
    if(typeof param === 'string'){
        param = JSON.parse(param);
    }
    if(typeof param === 'object'){
        let htmlUrl = param.launchParams.htmlUrl;
        //往url添加参数
        htmlUrl = changeUrl(['prd_id', 'channel', 'shownav'], htmlUrl);
        if (param.launchParams.withHead) {
            htmlUrl = composePostData(htmlUrl);
        }
        window.location.href = htmlUrl;
    }
}

/**
 * TODO 非app时跳转登录
 */
let platformGotoLoginH5 = function(){
    let htmlUrl = location.origin + '/fanli_service/pages/sdk_campaign/login/index.jsp';
    htmlUrl = changeUrl(['prd_id', 'channel', 'shownav'], htmlUrl);
    window.location.href = htmlUrl;
}

/**
 * 非app时初始化phead，
 */
let initPheadForH5 = function() {
    let tphead = {"pversion":"30","cversion":0,"cityid":"440100","gcityid":"440100"},
        cookie = new Cookies();

    let cookiePhead = cookie.get('phead'),
        prdid,
        channel;
    
    if(cookiePhead){
        try{
            tphead = JSON.parse(cookiePhead);
            return;
        }catch(e){
            //
        }
    }

    // 处理平台
    if(xmUtils.isIOS()){
        tphead.platform = 'ios';
    }else{
        tphead.platform = 'android';
    }

    prdid = xmUtils.getQueryParam('prd_id');
    if(prdid){
        tphead.prdid = prdid;
    }

    channel = xmUtils.getQueryParam('channel');
    if(prdid){
        tphead.channel = channel;
    }

    phead = tphead;
};

function getUrlParam(param_name, url){
    let reg = new RegExp("(^|&)" + param_name + "=([^&]*)(&|$)");
    let urlSearchPot = url.indexOf('?');
    if(urlSearchPot <= -1){
        return null;
    }
    let r = url.substr(urlSearchPot + 1, url.length).match(reg);
    if (r != null) return unescape(r[2]);
    return null
};

/**
 * 针对H5页面进行bridge、phead兼容
 */
let bridgePolyfill = function(currentPhead) {
    // 根据phead判断是否在app内，车主无忧为空或者1005~1009，财迷之家为4000，微信为1010，H5为4500以上
    // pheadFromHead 这个是jsp中定义的参数，见 common_header.jsp
    if (currentPhead != null 
            && (xmUtils.isNull(currentPhead.prdid) || (currentPhead.prdid < 4500 && currentPhead.prdid != 1010))) {
        // APP内
        _isAPP = true;
        phead = currentPhead;
    } else {
        //重写platform_launch方法兼容其他浏览器打开
        window.platform_launch = platformLaunchH5;
        window.platform_gotoLogin = platformGotoLoginH5;
        initPheadForH5();
    }
}

let mount = function(xm) {
    xm.bridgePolyfill = bridgePolyfill;
}

let init = function(xm) {
    mount(xm);
}

export default {
    init: init,
    bridgePolyfill: bridgePolyfill
};