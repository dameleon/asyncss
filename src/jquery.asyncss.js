;(function(global, undefined) {
    var $ = global.jQuery || global.Zepto || global.$;

    $ && $.fn && ($.fn.asyncss = function (first, second) {
        var asyncss = new global.Asyncss(this);

        if (typeof second === 'function') {
            asyncss.getStyle(first, second);
        }
        else {
            asyncss.setStyle(first, second);
        }
        return this;
    });

})(window || global, void 0);