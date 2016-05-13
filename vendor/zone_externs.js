/**
 * @externs
 */
var Zone = function(){};
Zone.prototype.parent;
Zone.prototype.name;
/**
 * Returns a value associated with the `key`.
 *
 * If the current zone does not have a key, the request is delegated to the parent zone. Use
 * [ZoneSpec.properties] to configure the set of properties asseciated with the current zone.
 *
 * @param key The key to retrieve.
 * @returns {any} Tha value for the key, or `undefined` if not found.
 */
Zone.prototype.get = function(key){};
/**
 * Used to create a child zone.
 *
 * @param zoneSpec A set of rules which the child zone should follow.
 * @returns {Zone} A new child zone.
 */
Zone.prototype.fork = function(zoneSpec){};
/**
 * Wraps a callback function in a new function which will properly restore the current zone upon
 * invocation.
 *
 * The wrapped function will properly forward `this` as well as `arguments` to the `callback`.
 *
 * Before the function is wrapped the zone can intercept the `callback` by declaring
 * [ZoneSpec.onIntercept].
 *
 * @param callback the function which will be wrapped in the zone.
 * @param source A unique debug location of the API being wrapped.
 * @returns {function(): *} A function which will invoke the `callback` through [Zone.runGuarded].
 */
Zone.prototype.wrap = function(callback, source) {};
/**
 * Invokes a function in a given zone.
 *
 * The invocation of `callback` can be intercepted be declaring [ZoneSpec.onInvoke].
 *
 * @param callback The function to invoke.
 * @param applyThis
 * @param applyArgs
 * @param source A unique debug location of the API being invoked.
 * @returns {any} Value from the `callback` function.
 */
Zone.prototype.run = function(callback, applyThis, applyArgs, source) {};
/**
 * Invokes a function in a given zone and catches any exceptions.
 *
 * Any exceptions thrown will be forwarded to [Zone.HandleError].
 *
 * The invocation of `callback` can be intercepted be declaring [ZoneSpec.onInvoke]. The
 * handling of exceptions can intercepted by declaring [ZoneSpec.handleError].
 *
 * @param callback The function to invoke.
 * @param applyThis
 * @param applyArgs
 * @param source A unique debug location of the API being invoked.
 * @returns {any} Value from the `callback` function.
 */
Zone.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {};
