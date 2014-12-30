;(function(global, undefined) {
    var requestAnimationFrame =
        global.requestAnimationFrame ||
        global.webkitRequestAnimationFrame ||
        global.mozRequestAnimationFrame ||
        function(callback) {
            return global.setTimeout(callback, Asyncss.fallbackFrameTime);
        };

    function Asyncss() {
        var that = this;

        this.isTicking = false;
        this.queueList = [];
        this.elementList = [];
        this.ticker = function() {
            var queueList = that.queueList;
            var queue = queueList.shift();

            that.handleQueue(queue);
            if (queueList.length > 0) {
                requestAnimationFrame(that.ticker);
            } else {
                that.isTicking = false;
            }
        };
        if (elements) {
            this.addElement(elements);
        }
    }

    // 30 fps
    Asyncss.fallbackFrameTime = 30 / 1000;
    Asyncss.isElement = function(target) {
        return target instanceof HTMLElement;
    };
    Asyncss.isLikeElementList = function(target) {
        return target && target.length && Asyncss.isElement(target[0]);
    };

    Asyncss.prototype = {
        constructor: Asyncss,
        handleQueue: function(queue) {
            switch (queue.type) {
                case 'set':
                    this._setStyle(queue);
                    break;
                case 'get':
                    this._getStyle(queue);
                    break;
            }
        },
        _setStyle: function(queue) {
            var elementList = this.elementList;
            var elmLength = elementList.length;
            var props = queue.props;
            var keys = Object.keys(props);
            var keysLength = keys.length;
            var style, key;

            while (0 < elmLength) {
                elmLength--;
                style = elementList[elmLength].style;

                while (0 < keysLength) {
                    keysLength--;
                    key = keys[keysLength];
                    style[key] = props[key];
                }
            }
        },
        _getStyle: function(queue) {
            var style = global.getComputedStyle(this.elementList[0])[key];

            queue.callback(style[queue.key]);
        },
        setStyle: function(props, value) {
            var queue = {
                type: 'set'
            };

            if (typeof props === 'string') {
                queue.props = {};
                queue.props[props] = value;
            } else {
                queue.props = props;
            }
            this.addQueue(queue);
        },
        getStyle: function(key, callback) {
            this.addQueue({
                type: 'get',
                key: key,
                callback: callback
            });
        },
        addQueue: function(queue) {
            this.queueList(queue);
            if (!this.isTicking) {
                this.isTicking = true;
                requestAnimationFrame(this.ticker);
            }
        },
        addElement: function(elements) {
            if (Asyncss.isElement(elements)) {
                this.elementList.push(elements);
            }
            else if (Asyncss.isLikeElementList(elements)) {
                this.elementList.push.apply(this.elementList, elements);
            }
        },
        removeElement: function(elements) {
            var targetList = [];
            var elementList = this.elementList;

            if (Asyncss.isElement(elements)) {
                targetList = [elements];
            }
            else if (Asyncss.isLikeElementList(elements)) {
                targetList.push.apply(targetList, elements);
            }
            if (targetList.length < 1) {
                return;
            }
            targetList.forEach(function (target) {
                var index = elementList.indexOf(target);
                if (index < 0) {
                    elementList.splice(index, 1);
                }
            });
        },
        replaceElementList: function(elements) {
            if (!Asyncss.isLikeElementList(elements)) {
                throw new TypeError('Argument 1 must be like NodeList type object');
            }
            this.elementList = elements;
        }
    };

    global.Asyncss = Asyncss;

})(window || global, void 0);
