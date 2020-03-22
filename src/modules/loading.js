import './styles/loading.scss';
import utils from './utils';

/**
 * 使用说明
 * 
 * 1 添加DOM
 * <div class="xm-loading">
        <div class="xm-loading-wrapper">
            <img class="xm-loading-rotate" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAtFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oK74hAAAAPHRSTlMAEgQK/gcuGQ4dT/nyrdbM26JVJYOnfinRx5BnQzoh7nWVNrJwMvbq414W4L5iwrpKP0fni1mHnZlrebcrr0AtAAAE00lEQVRYw63Za3eaQBCA4VkoNysSQYWoEEVtvd+ixqT//391dnc2Uo9NUPYNybc8zpllTz4ESmYARH79x89FsG63ZrYBOjJkEL/8UP38WV92cqOia2GS9iVLNjYd7iq4JsLKrn+6KIt+/UrG7iOwZZpKVrSySf+F/T7N74dlF7qwEBqaV6//bpl3rcJ1LzTh8cv10GTXn47lZdPFrseG2K8rXEY05nsld+GKTIHT0CAzWJYeO/6iIMumYamRGWNucWxyi2U9v16QX7Cu9a3sMozGJvdm7mqt6Bdhb+bfnB+6ZBP8RXm7TlPzfgdRKZlx2oDvmmwI5vRLw/5KnjOVa0CZjos6ydhT/IWMSdmEkrGmlIWdOHC7+UW2oHy9V5Rlr8/s9uc7c4UbcE+TBs4s5NfX0a1fdR2M6yTfURYImNOvrRt30JEhDXc3X3JaNN3DVYZDofxAbC1nnk6nDe/6cz2PaAMeyUnkzIi34Z9MDxO4AY9lT7ksCqGY45FtwqOtptQiKCLMoxg83lnC08ViUDhDL8vk1FAhN+Eyr8EuQ2dEm1ClGsqyDqgymTeHarUl/LRI3M+hKasiPZHw09NTD2S46YjLDlStibJoQ+90xEPcrEznKMtyeREjmQfV8xXdAl5EuRroUNHPBt9HTDRoyGwg22jgM+H7iOM4Qt4BHQ0FjI35+xHLmBY6bFBNAIgpQwvtKDowwLLj2EY5Aj0tpZw0YmC2bXPb00R3JZwkNXBs2VwTPUY14fQYPKKZJrqWUCeIiDY10baimxATbWmivSQJEv49AnsywWdiG5poN0A3CJJgibQMNGUE1BommmkIVJzO8dE7NdE5hj/07Tp4Dvj3GuxcZmminWdq80lre68V3YY4T3P+ME10X9FniFKZp4leKboDHtGxJrq1Xj/zr+cZMKJzTbS/pnZgcneHWVrk+VqVAaArcrTQ2+VyKeSNAWATbetZNdKIL9ddAMh2lKFBNjdLasVv5m7XFzk69rFRtg1Y2pflGujhBuO6D7yoT7HKsi1lfMbAY8Ld7/eT6of4Z0M4vRSpkLGqY0d/MKE3QZYhLKq67RPCEg9BZgh6izmV5HQ0Its3gYqFjPWNCrLZHGFC74HKQphXq1U5yQG6EvcLhxZLGfMevy2+L+HRaAWXjL6UMfagnLV9tEVNEwp5NdXWfEhmZ5QJ78M/5cINa2G4tx6Q3UO7rezW9fFupR0+ZLunNibt5hyucsTMort3wg5ClvaNe2cTHB6Pd55l1m022yKUV3CjPsm8CMrXf2siTXOfDLiRtVXybDYr/VfY7HFZjT104WZujWReycHT7hvSyj47/z2OGsJEr1bb+bewNzif3y72mwfwlU0y1ts7Xx9fb3gWNNnDDL7IrRVkLIwtuJ2VDoZDpC921/nmVPYXGXt/f9/aLlzH8tWh2x1iF7rD4JuMVNJKHmO9Who7Lp/fZJ7dn30cECZa2NjKKHMDjqsreoB9fHx0sFardTodDtf2MIVSmXui3zGSiW4J+qRotZIBg7JFRw4rWsnXtLIPKdyRla/U0GrqIl0cu1sz4b7MdEX07amJ7oYu3J81mZH8X7rTN+HBvH5P2h9EF5fdCiOolJOGZAuZ6Nb7PgMdzeNdbdYbcPxj3Av3k1L/UfgLJ6HzH7DHA6cAAAAASUVORK5CYII=">
        </div>
    </div>
 *   
 * 2 js调用：xm.showLoading()、xm.hideLoading()
 */
let showLoading = function () {
    $('.xm-loading').show().on('touchstart', utils.stopEvent);
};

let hideLoading = function () {
    $('.xm-loading').hide().off('touchstart', utils.stopEvent);
};

let mount = function(xm) {
    xm.prototype.showLoading = showLoading;
    xm.prototype.hideLoading = hideLoading;
}

export default {
    mount: mount,
    showLoading: showLoading,
    hideLoading: hideLoading
}