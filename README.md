# jQuery Stub

Inline `jQuery(function(){})` and `jQuery.ready` queue to enable async loading of jQuery. It also queues `jQuery.noConflict`.

Include `jquery-stub.js` before inline code that uses `jQuery`.

When using [$async](https://github.com/style-tools/async) you can use `jquery-stub-async.js` to simply hook into the jQuery dependency or other dependencies.

You could use `fn.toString()` and regular expression to selectively set the dependencies.

```javascript
$async.js({
    src: '', // to save size, $async does not verify src and fails when omitted.
    inline: callback_name + '();', 
    dependencies: 'jquery', 
    exec_timing: 'requestIdleCallback'
});
```