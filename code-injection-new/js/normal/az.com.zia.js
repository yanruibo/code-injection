





    $(document).ready(function () {
        $('#try').click(function () {
            location.reload();
        });
    });

    $('#showjs').html("$(document).ready(function () {");


﻿(function (window, $) {
    // Using jresig's Class implementation http://ejohn.org/blog/simple-javascript-inheritance/
    (function () { var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/; this.JRClass = function () { }; JRClass.extend = function (prop) { var _super = this.prototype; initializing = true; var prototype = new this(); initializing = false; for (var name in prop) { prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) { return function () { var tmp = this._super; this._super = _super[name]; var ret = fn.apply(this, arguments); this._super = tmp; return ret; }; })(name, prop[name]) : prop[name]; } function JRClass() { if (!initializing && this.init) this.init.apply(this, arguments); } JRClass.prototype = prototype; JRClass.constructor = JRClass; JRClass.extend = arguments.callee; return JRClass; }; })();


  $(document).ready(function () {
    $(function () {
        $("div[data-anim]").map(function (index) {
            return new AnimPlayer(index, this);
        });
       
    });
});


    var AnimPlayer = JRClass.extend({
        init: function (index, tag) {
            this.index = index;
            this.tag = tag;
            this.doAnimate();
        },

        doAnimate: function () {
            alert("doAnimate Method Called");
        }


    });




})(window, jQuery);
