'use strict';

var assert = require('power-assert');
var _ = require('lodash');

describe('Asyncss Class', function() {
    before(function() {
        fixture.load('test-elements.html');
        document.body.appendChild(fixture.el);
        this.elements = document.querySelectorAll('#fixture_container > *');
    });

    it('should be referable from global', function() {
        assert(typeof global.Asyncss === 'function');
    });

    it('should be instantiated', function() {
        assert(new Asyncss() instanceof Asyncss);
        assert(new Asyncss(this.elements) instanceof Asyncss);
    });

    describe('static method and property', function() {
        it('should be number', function() {
            assert.equal(typeof Asyncss.fallbackFrameTime, 'number');
        });
        it('should assert element', function () {
            assert(Asyncss.isElement(this.elements[0]));
            assert(!Asyncss.isElement('not element'));
            assert(!Asyncss.isElement(0));
            assert(!Asyncss.isElement([]));
            assert(!Asyncss.isElement({}));
            assert(!Asyncss.isElement(null));
            assert(!Asyncss.isElement(void 0));
        });
        it('should assert like element list', function() {
            assert(Asyncss.isLikeElementList(this.elements));
            assert(!Asyncss.isLikeElementList([]));
            assert(!Asyncss.isLikeElementList([1, 2, 3]));
            assert(!Asyncss.isLikeElementList(['hoge', 'fuga', 'piyo']));
        });
    });

    describe('instance method', function() {
        beforeEach(function() {
            this.asyncss = new Asyncss(this.elements);
            this.defaultStyles = {};
            _.forEach(this.elements, function(element, index) {
                var style = element.style;
                var props = {};

                for (var key in style) if (style.hasOwnProperty(key)) {
                    props[key] = style[key];
                }
                this.defaultStyles[index] = props;
            }, this);
        });
        afterEach(function() {
            _.forEach(this.elements, function(element, index) {
                var props = this.defaultStyles[index];

                for (var key in props) if (props.hasOwnProperty(key)) {
                    element.style[key] = props[key];
                }
            }, this);
        });
        it('should apply style with key-value', function(done) {
            var that = this;

            this.asyncss.setStyle('display', 'none');
            setTimeout(function() {
                _.forEach(that.elements, function(element) {
                    assert.equal(element.style.display, 'none');
                });
                done();
            }, 100);
        });
        it('should apply style with object', function(done) {
            var that = this;

            this.asyncss.setStyle({'display': 'none'});
            setTimeout(function() {
                _.forEach(that.elements, function(element) {
                    assert.equal(element.style.display, 'none');
                });
                done();
            }, 100);
        });
        it('should get style', function(done) {
            var that = this;

            this.asyncss.getStyle('display', function(value) {
                assert.equal(value, global.getComputedStyle(that.elements[0])['display']);
                done();
            });
        });
        it('should', function(done) {
            var elementList
        });
    });
});