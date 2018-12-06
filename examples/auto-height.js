/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';


var Textarea = require('../src/index');


var t = new Textarea({
    el: '#demo'
});

t.autoHeight();

document.getElementById('enable').onclick = function () {
    t.autoHeight(true);
};

document.getElementById('disable').onclick = function () {
    t.autoHeight(false);
};
