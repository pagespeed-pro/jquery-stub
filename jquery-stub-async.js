/**
 * jQuery Stub for inline jQuery()/.ready capture based on https://github.com/style-tools/async 
 *
 * Copyright (C) 2019 Style.Tools
 * @link https://github.com/style-tools/jquery-stub
 */

(function(win, doc){

    var JQUERY_CALLBACK_COUNT = 0;

    // push to queue
    function JQUERY_STUB_PUSH_QUEUE(handler, fn) {
        fn = ((handler === "ready") ? fn : handler);

        var index = ++JQUERY_CALLBACK_COUNT;
        var callback_name = 'st_jq_cb_' + index;
        win[callback_name] = function() {
            jQuery(fn);
        };

        $async.js({
            src: '', // to save size, $async does not verify src and fails when omitted.
            inline: callback_name + '();', 
            dependencies: 'jquery', 
            exec_timing: 'requestIdleCallback'
        });
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