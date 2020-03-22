# XmKit
前端页面工具集，js部分提供事件绑定、小工具（判空、获取url参数等）、网络请求、UI组件（toast、loading、dialog）、错误监控等辅助工具。页面性能及错误自动集成，也可主动上报错误（sendErrorLog）。css部分提供样式重置以及flex、垂直对齐、分割线等常用样式组件。

## 引入
从CDN引入，本框架依赖jQuery，需在js之前引入jQuery


## 初始化 `(init)`
在业务js中调用，需提供loaded（可选）及binded（可选）回调。loaded在页面onload事件后回调，binded在jsbridge初始化完成后回调。

参数

```js
/**
 * 页面初始化
 * @param {*object} config 页面配置
 * {
 *      title: '', // 页面标题，统计用
 *      debug: true, // 是否开启调试
 *      loaded: function, // window onLoad回调
 *      binded: function, // jsbridge绑定成功回调
 *      phead: phead, // phead
 *      monitor: true, // 开启监控，默认true
 * }
 */
```
示例：

```js
    xmkit.init({
        title: '积分墙',
        loaded: function(){},
        binded: function(){},
        phead: phead,
        debug: true
    })
```
## 网络请求 `(request)`
发起网络请求，使用ajax实现。

参数

```js
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
```

示例：

```js
xmkit.request({
    service: 'appdownload_service',
    funid: 2,
    callback: function(data) {
        // do something
    }
})
```

## 绑定事件 `(bindEvent)`
批量绑定事件

参数：

```js
/**
 * 绑定事件
 * @param {*object} eventsMap 事件配置对象，属性key值表示事件类型和触发元素，以空格分隔
 */
 
```

示例：

```js
let downloadBtnClick = function(){}

xmkit.bindEvent({
	'click #download_buttton': downloadBtnClick
}});
```

## Toast `(toast)`
弹toast消息

参数：略

示例：

```html
<div class="xm-toast">
    <div></div>
</div>
```

```js
xmkit.toast('恭喜你中奖了！')
```

## 显示加载提示 `(showLoading)`
参数：无

示例：

```html
<div class="xm-loading">
    <div class="xm-loading-wrapper">
        <img class="xm-loading-rotate" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAtFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oK74hAAAAPHRSTlMAEgQK/gcuGQ4dT/nyrdbM26JVJYOnfinRx5BnQzoh7nWVNrJwMvbq414W4L5iwrpKP0fni1mHnZlrebcrr0AtAAAE00lEQVRYw63Za3eaQBCA4VkoNysSQYWoEEVtvd+ixqT//391dnc2Uo9NUPYNybc8zpllTz4ESmYARH79x89FsG63ZrYBOjJkEL/8UP38WV92cqOia2GS9iVLNjYd7iq4JsLKrn+6KIt+/UrG7iOwZZpKVrSySf+F/T7N74dlF7qwEBqaV6//bpl3rcJ1LzTh8cv10GTXn47lZdPFrseG2K8rXEY05nsld+GKTIHT0CAzWJYeO/6iIMumYamRGWNucWxyi2U9v16QX7Cu9a3sMozGJvdm7mqt6Bdhb+bfnB+6ZBP8RXm7TlPzfgdRKZlx2oDvmmwI5vRLw/5KnjOVa0CZjos6ydhT/IWMSdmEkrGmlIWdOHC7+UW2oHy9V5Rlr8/s9uc7c4UbcE+TBs4s5NfX0a1fdR2M6yTfURYImNOvrRt30JEhDXc3X3JaNN3DVYZDofxAbC1nnk6nDe/6cz2PaAMeyUnkzIi34Z9MDxO4AY9lT7ksCqGY45FtwqOtptQiKCLMoxg83lnC08ViUDhDL8vk1FAhN+Eyr8EuQ2dEm1ClGsqyDqgymTeHarUl/LRI3M+hKasiPZHw09NTD2S46YjLDlStibJoQ+90xEPcrEznKMtyeREjmQfV8xXdAl5EuRroUNHPBt9HTDRoyGwg22jgM+H7iOM4Qt4BHQ0FjI35+xHLmBY6bFBNAIgpQwvtKDowwLLj2EY5Aj0tpZw0YmC2bXPb00R3JZwkNXBs2VwTPUY14fQYPKKZJrqWUCeIiDY10baimxATbWmivSQJEv49AnsywWdiG5poN0A3CJJgibQMNGUE1BommmkIVJzO8dE7NdE5hj/07Tp4Dvj3GuxcZmminWdq80lre68V3YY4T3P+ME10X9FniFKZp4leKboDHtGxJrq1Xj/zr+cZMKJzTbS/pnZgcneHWVrk+VqVAaArcrTQ2+VyKeSNAWATbetZNdKIL9ddAMh2lKFBNjdLasVv5m7XFzk69rFRtg1Y2pflGujhBuO6D7yoT7HKsi1lfMbAY8Ld7/eT6of4Z0M4vRSpkLGqY0d/MKE3QZYhLKq67RPCEg9BZgh6izmV5HQ0Its3gYqFjPWNCrLZHGFC74HKQphXq1U5yQG6EvcLhxZLGfMevy2+L+HRaAWXjL6UMfagnLV9tEVNEwp5NdXWfEhmZ5QJ78M/5cINa2G4tx6Q3UO7rezW9fFupR0+ZLunNibt5hyucsTMort3wg5ClvaNe2cTHB6Pd55l1m022yKUV3CjPsm8CMrXf2siTXOfDLiRtVXybDYr/VfY7HFZjT104WZujWReycHT7hvSyj47/z2OGsJEr1bb+bewNzif3y72mwfwlU0y1ts7Xx9fb3gWNNnDDL7IrRVkLIwtuJ2VDoZDpC921/nmVPYXGXt/f9/aLlzH8tWh2x1iF7rD4JuMVNJKHmO9Who7Lp/fZJ7dn30cECZa2NjKKHMDjqsreoB9fHx0sFardTodDtf2MIVSmXui3zGSiW4J+qRotZIBg7JFRw4rWsnXtLIPKdyRla/U0GrqIl0cu1sz4b7MdEX07amJ7oYu3J81mZH8X7rTN+HBvH5P2h9EF5fdCiOolJOGZAuZ6Nb7PgMdzeNdbdYbcPxj3Av3k1L/UfgLJ6HzH7DHA6cAAAAASUVORK5CYII=">
    </div>
</div>
```
```js
xmkit.showLoading()
```

## 隐藏加载提示 `(hideLoading)`
参数：无

示例：

```js
xmkit.hideLoading()
```

## 弹框 `(showDialog)`
显示弹框，默认有标题、内容、按钮、关闭按钮。

参数：

```js
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
 */

```

示例：

```html
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
```

```js
xmkit.showDialog('#JtipsDialog', {
    title: '签到新手大礼包',
    content: '<p>1.新用户第二日签到可获得25金币的额外奖励；</p><p>2.新用户第五日签到可获得油卡奖励（金额随机）；</p><p>3.新用户第七日签到可获得55金币的额外奖励。</p>',
    sureBtnText: '我知道了'
});
```

## 异常上报 `(sendErrorLog)`
上报异常信息，记录到数据库，相同异常信息每10min超过40条会自动发送报警邮件

参数：略

示例：

```js
xmkit.sendErrorLog('phead is null')
```

## 小工具

```js
getQueryParam(name, url) // 从url中获取query属性值，默认使用当前页面地址

stopEvent(e) // 阻止事件传递

isNull(object) // 判空

isLogin() // 判断当前是否登录（通过phead中的access_token）

allowBodyMove(canMove) // 开启或禁止屏幕滚动

initLazyLoad() // 开始图片懒加载
```

## 样式集
主要提供了flex等比布局和水平、垂直居中工具。


示例：

<div></div>

```html
<div class="flex-cont">
    <div class="flex-item relative" style="height:100px; border: 1px solid #333">
        <p>a</p>
    </div>
    <div class="flex-item relative" style="height:100px; border: 1px solid #333">
        <p class="abs-v-center">a</p>
    </div>
    <div class="flex-item relative" style="height:100px; border: 1px solid #333">
        <p class="abs-h-center">a</p>
    </div>
    <div class="flex-item relative" style="height:100px; border: 1px solid #333">
        <p class="abs-center">a</p>
    </div>
</div>
```

几个有用的样式

```css
// 分割线
.divider {
    background-color: #dcdcdc;
}

.divider-vertical {
    width: 1px;
    height: 100%;
    transform: scaleX(.4);
    -webkit-transform: scaleX(.4);
}

.divider-horizontal {
    width: 100%;
    height: 1px;
    transform: scaleY(.4);
    -webkit-transform: scaleY(.4);
}

// 清除浮动
.clearfix:after {
    display: block;
    height: 0;
    content: "";
    clear: both;
}

.clearfix {
    zoom: 1;
}

// 文字前图标
i.icon {
    display: inline-block;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAbFBMVEUAAADKysrs7Oy8vLy9vb29vb2+vr69vb28vLy9vb2/v7+8vLy9vb29vb29vb3Dw8O8vLy8vLy+vr6+vr7AwMC9vb3BwcG9vb29vb29vb29vb2+vr6+vr6+vr68vLy+vr69vb29vb2+vr68vLz8yW/OAAAAI3RSTlMACQPnXvZP8uzbGfqvj3wRy7hmNivCHbOqgtNIP4prVpeWahiKqiIAAAGISURBVEjHlZbtdoMgDIZDEMRPqq1utl27jfu/x61y1kP4KOP55Ym8MSQxAAFMDlOjuk410yAZZNBVL4yD6CsNadhYm4B6TH0GZ26i8BkhQnswSQ4tBBy5eQE/gkclzEtE5a03WYjiKPIC4UTVcvMP+HPn6OXnfLuuyNbL1ni5QrDMxNxc4cmFSmZrZSSgRZPa9yQoW/PRC5SAi/t23PutjiRvlZfVPp1IX2m/BIrtbj8fzx9Wsfj+SJTvbpASHmzu+x6AiSBI4K76m1SPgTQuA0PEP9OyC25kgYTBJLGb+KIeYUquVzbDZ2KcoEmtr22z3am1AZVYv9g6tJ5DBV18/Ya2gGfP3sUF3R12rip4Q0OibYlb6E1FN632eFgsgQ1NK6lYtEITMdOOqmOCAWRsbp1+iQ8SSZovj2CkvfP04QzLTzNdh340Ip5io1/7Q8D91d5CwUjGTF7AGRlkecFMRmVecMDUMH5/fDrYNG9Lx33pgVJ+ZJUfiuXHbvnBXn51KL+cFF9/fgCRbNEkvCUT8gAAAABJRU5ErkJggg==');
    background-size: cover;
    vertical-align: middle;
}
```

## 发布历史

### v0.1.11 2018-1-12

changelog:

1. 解决Object.assign导致的config为空问题

### v0.1.10 2018-1-12

changelog:

1. 解决debug not defined问题

### v0.1.9 2017-12-27

changelog:

1. 监控默认关闭

### v0.1.7 2017-11-14

changelog:

1. 增加unBindEvent接口，可以解绑事件

### v0.1.6 2017-11-8

changelog:

1. 修改UI组件单位，统一使用px，兼容不同的页面缩放模式

### v0.1.5 2017-09-28

changelog:

1. 调整bind函数在load之后调用

### v0.1.4 2017-09-21

changelog:

1. 修复页面加载时长统计错误问题

### v0.1.3 2017-09-19

changelog:

1. isNull判断增加判断是否为数字0
1. 网络请求参数ignoreError为true时，所有异常均不弹出错误提示

### v0.1.2 2017-09-04

changelog:

1. 通用状态处理，包括数据空、网络异常、其他异常

### v0.1.1 2017-7-28

changelog：

1. 初始版本
1. 提供网络、事件绑定、上传错误日志接口
1. UI组件：toast、loading、dialog
1. 集成错误统计