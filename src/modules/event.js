//控制避免连续点击触发事件
let period = false;
let eventFun = {};

let _delegate = function (name, selector, func) {
    var key = name+selector.replace(/\s*/g,"")+(func.name||func.toString().length);
    eventFun[key] = function (e) {
        if (name === 'click') {
            if(!period){
                period = true
                setTimeout(function () {
                    period = false
                }, 300)
                func.call(this, e)
            }
        } else {
            func.call(this, e)
        }
    };
    $('body').on(name, selector, eventFun[key]);
}

let _undelegate = function (name, selector, func) {
    var key = name+selector.replace(/\s*/g,"")+(func.name||func.toString().length);
    $('body').off(name, selector,eventFun[key]);
    delete eventFun[key];
}

let _scanEventsMap = function (maps, isOn) {
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    var bind = isOn ? _delegate : _undelegate;
    for (var keys in maps) {
        if (maps.hasOwnProperty(keys)) {
            var matchs = keys.match(delegateEventSplitter);
            bind(matchs[1], matchs[2], maps[keys]);
        }
    }
}

let initializeOrdinaryEvents = function (maps) {
    _scanEventsMap(maps, true);
}

let uninitializeOrdinaryEvents = function (maps) {
    _scanEventsMap(maps);
}

/**
 * 绑定事件
 * @param {*object} eventsMap 事件配置对象，属性key值表示事件类型和触发元素，以空格分隔
 */
let bindEvent = function (eventsMap) {
    initializeOrdinaryEvents(eventsMap);
}

let unBindEvent = function (eventsMap) {
    uninitializeOrdinaryEvents(eventsMap);
}

let mount = function (xm) {
    xm.prototype.bindEvent = bindEvent;
    xm.prototype.unBindEvent = unBindEvent;
}

export default {
    mount: mount,
    bindEvent: bindEvent,
    unBindEvent: unBindEvent
};