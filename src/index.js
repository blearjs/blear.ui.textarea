/**
 * blear.ui.textarea
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';


var UI = require('blear.ui');
var object = require('blear.utils.object');
var layout = require('blear.core.layout');
var attribute = require('blear.core.attribute');
var selector = require('blear.core.selector');
var event = require('blear.core.event');
var number = require('blear.utils.number');

var defaults = {
    /**
     * 元素
     */
    el: null,

    /**
     * 最大高度
     */
    maxHeight: 400,

    /**
     * 监听的键盘事件，事件可以为空，高度更新由使用放自行控制
     */
    keyEvent: 'input'
};
var Textarea = UI.extend({
    className: 'Textarea',
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        the[_textareaEl] = selector.query(options.el)[0];
        Textarea.parent(the);
        the[_autoHeightEnable] = false;
        the[_autoScrollEnable] = false;
    },

    /**
     * 启用/禁用自适应撑高
     * @param [enable=true] {Boolean} 是否启用
     * @returns {Textarea}
     */
    autoHeight: function (enable) {
        var the = this;
        var keyEvent = the[_options].keyEvent;

        if (enable === false) {
            if (the[_autoUpdateHeightListener]) {
                event.un(the[_textareaEl], keyEvent, the[_autoUpdateHeightListener]);
            }

            the[_autoHeightEnable] = false;
            the[_autoUpdateHeightListener] = null;
            return the;
        }

        if (the[_autoHeightEnable] === true) {
            return the;
        }

        the[_autoHeightEnable] = true;
        var boxSizing = attribute.style(the[_textareaEl], 'box-sizing');
        var getSize = function (key) {
            return number.parseFloat(attribute.style(the[_textareaEl], key));
        };
        the[_extraHeight] = boxSizing === 'border-box'
            ? getSize('border-top-width') + getSize('border-bottom-width')
            : 0;

        if (keyEvent) {
            event.on(
                the[_textareaEl],
                keyEvent,
                the[_autoUpdateHeightListener] = function () {
                    the.updateHeight();
                }
            );
        }

        the.updateHeight();
        return the;
    },

    /**
     * 手动更新高度信息
     * @returns {Textarea}
     */
    updateHeight: function () {
        var the = this;

        if (the[_autoHeightEnable] === false) {
            return the;
        }

        var maxHeight = the[_options].maxHeight;
        attribute.style(the[_textareaEl], 'height', '');
        var autoHeight = layout.scrollHeight(the[_textareaEl]) + the[_extraHeight];
        var height = Math.min(autoHeight, maxHeight);
        the.emit('autoHeight', height);
        attribute.style(
            the[_textareaEl],
            'height',
            height
        );

        return the;
    },

    autoScroll: function () {

    },

    destroy: function () {
        var the = this;

        the.autoHeight(false);
        the.autoScroll(false);
    }
});
Textarea.defaults = defaults;
var sole = Textarea.sole;
var proto = Textarea.prototype;
var _options = sole();
var _textareaEl = sole();
var _extraHeight = sole();
var _autoHeightEnable = sole();
var _autoScrollEnable = sole();
var _autoUpdateHeightListener = sole();
module.exports = Textarea;

// ====================================================
// ====================================================
// ====================================================

