# jQuery Stub

Inline `jQuery(function(){})` and `jQuery.ready` queue to enable async loading of jQuery. It also queues `jQuery.noConflict`.

Include `jquery-stub.js` before inline code that uses `jQuery`.

When using [$async](https://github.com/style-tools/async) you can use `jquery-stub-async.js` to hook into the jQuery dependency and/or other dependencies.

You can use `fn.toString()` and a regular expression to selectively set the dependencies. `jquery-stub-async.js` provides an example.

```javascript
$async.js.dependencies('jquery', function() {
	// .. queued jquery code
});
```