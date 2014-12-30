;(function(global, undefined) {
    var $ = global.jQuery || global.Zepto || global.$;
    var IDENT = '__ASYNCSS_INSTANCE__';

    function asyncss() {
        var instance = this.data(IDENT);

        if (!instance) {
            instance = new global.Asyncss();
            this.data(IDENT, instance);
        }
        instance.replaceElementList(this);
        if (typeof second === 'function') {
            instance.getStyle(first, second);
        } else {
            instance.setStyle(first, second);
        }
        return this;
    }

    $ && $.fn && ($.fn.asyncss = asyncss);

})(window || global, void 0);