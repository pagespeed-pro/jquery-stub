/**
 * jQuery Stub for inline jQuery()/.ready capture.
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/jquery-stub
 */

(function(win, doc){

    // push to queue
    function JQUERY_STUB_PUSH_QUEUE(handler, fn) {
        if (handler === "ready") {
            JQUERY_READY_QUEUE.push(fn);
        } else {
            JQUERY_READY_QUEUE.push(handler);
        }
    };

    // setup stub if jQuery is not yet loaded
    if (!win.jQuery) {

        var JQUERY_LOADED; // jQuery loaded flag

        // jQuery.ready queue
        var JQUERY_READY_QUEUE = [];
        var JQUERY_NOCONFLICT = false;

        // define an alias object 
        var JQUERY_ALIAS_OBJECT = {
            ready: JQUERY_STUB_PUSH_QUEUE,
            bind: JQUERY_STUB_PUSH_QUEUE
        };

        // jQuery stub
        win.$ = win.jQuery = function(handler) {

            // reference access, pass to jQuery object
            if (JQUERY_LOADED) {
                return win.jQuery.apply(this, arguments);
            }

            if (handler === doc || handler === undefined) {

                // Queue $(doc).ready(handler), $().ready(handler)
                // and $(doc).bind("ready", handler) by returning
                // an object with alias methods for JQUERY_STUB_PUSH_QUEUE
                return JQUERY_ALIAS_OBJECT;
            } else {
                // Queue $(handler)
                JQUERY_STUB_PUSH_QUEUE(handler);
            }
        };

        // noConflict
        win.$.noConflict = win.jQuery.noConflict = function() {
            JQUERY_NOCONFLICT = true;
        };

        // mark stub
        win.$.isStub = win.jQuery.isStub = true;

        // object.watch polyfill
        if (!Object.prototype.watch) {
            Object.defineProperty(Object.prototype, "watch", {
                enumerable: false,
                configurable: true,
                writable: false,
                value: function(prop, handler) {
                    var
                        oldval = this[prop],
                        newval = oldval,
                        getter = function() {
                            return newval;
                        },
                        setter = function(val) {
                            oldval = newval;
                            return newval = handler.call(this, prop, oldval, val);
                        };

                    if (delete this[prop]) { // can't watch constants
                        Object.defineProperty(this, prop, {
                            get: getter,
                            set: setter,
                            enumerable: true,
                            configurable: true
                        });
                    }
                }
            });
        }

        // object.unwatch
        if (!Object.prototype.unwatch) {
            Object.defineProperty(Object.prototype, "unwatch", {
                enumerable: false,
                configurable: true,
                writable: false,
                value: function(prop) {
                    var val = this[prop];
                    delete this[prop]; // remove accessors
                    this[prop] = val;
                }
            });
        }

        // wait for jQuery
        win.watch('jQuery', function(id, oldval, jQuery) {

            // Verify if valid jQuery
            if (typeof jQuery !== 'function' || typeof jQuery.fn === 'undefined' || typeof jQuery.isStub !== 'undefined') {
                return jQuery;
            }

            // jQuery.noConflict() has been called
            if (JQUERY_NOCONFLICT) {
                jQuery.noConflict();
            }

            // process jQuery.ready queue
            jQuery.each(JQUERY_READY_QUEUE, function(index, handler) {
                jQuery(handler);
            });

            // stop watching object
            win.unwatch('jQuery');

            // set global object
            win.jQuery = jQuery;

            // mark loaded
            JQUERY_LOADED = true;

            return jQuery;
        });
    }

}(window, document));