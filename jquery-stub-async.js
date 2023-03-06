/**
 * jQuery Stub for inline jQuery()/.ready capture based on https://github.com/style-tools/async 
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/jquery-stub
 */

(function(win, doc){

    var CALLBACKS = [];

    // push to queue
    function JQUERY_STUB_PUSH_QUEUE(handler, fn) {
        fn = ((handler === "ready") ? fn : handler);

        var dependency = 'jquery'; // $async( ... {"ref":"jquery"})
        var index = CALLBACKS.push(function() {
            jQuery(fn);
        });
        index--;

        // example: alternative dependency based on script
        // var fn_text = fn.toString();
        // if (fn_text.indexOf('.owlCarousel(') !== -1) {
        //    dep = ['jquery','owl'];
        // }

        $async.dependencies(dep, CALLBACKS[index]);
    };

    // setup stub if jQuery is not yet loaded
    if (!win.jQuery) {

        // define an alias object 
        var JQUERY_ALIAS_OBJECT = {
            ready: JQUERY_STUB_PUSH_QUEUE,
            bind: JQUERY_STUB_PUSH_QUEUE
        };

        // jQuery stub
        win.$ = win.jQuery = function(handler) {

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

        // mark stub
        win.$.isStub = win.jQuery.isStub = true;

    }

}(window, document));