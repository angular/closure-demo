/**
 * @externs
 */
var Zone = function(){};
Zone.prototype.parent;
Zone.prototype.name;

Zone.assertZonePatched = function(){};
Zone.current;
Zone.currentTask;

/**
 * Returns a value associated with the `key`.
 *
 * If the current zone does not have a key, the request is delegated to the parent zone. Use
 * [ZoneSpec.properties] to configure the set of properties asseciated with the current zone.
 *
 * @param key The key to retrieve.
 * @returns {?} The value for the key, or `undefined` if not found.
 */
Zone.prototype.get = function(key){};

/**
 * Returns a Zone which defines a `key`.
 *
 * Recursively search the parent Zone until a Zone which has a property `key` is found.
 *
 * @param key The key to use for identification of the returned zone.
 * @returns {Zone} The Zone which defines the `key`, `null` if not found.
 */
Zone.prototype.getZoneWith = function(key){};

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
 * @returns {?} Value from the `callback` function.
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
 * @returns {?} Value from the `callback` function.
 */
Zone.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {};

/**
 * Execute the Task by restoring the [Zone.currentTask] in the Task's zone.
 *
 * @param callback
 * @param applyThis
 * @param applyArgs
 * @returns {?}
 */
Zone.prototype.runTask = function(task, applyThis, applyArgs) {};

/**
 * @param source
 * @param callback
 * @param data
 * @param customSchedule
 */
Zone.prototype.scheduleMicroTask = function(source, callback, data, customSchedule) {};

/**
 * @param source
 * @param callback
 * @param data
 * @param customSchedule
 */
Zone.prototype.scheduleMacroTask = function(source, callback, data, customSchedule, customCancel) {};

/**
 * @param source
 * @param callback
 * @param data
 * @param customSchedule
 */
Zone.prototype.scheduleEventTask = function(source, callback, data, customSchedule, customCancel) {};

/**
 * @param task
 */
Zone.prototype.cancelTask = function(task) {};

var ZoneSpec = function() {};
ZoneSpec.prototype.name;
ZoneSpec.prototype.properties;

/**
 * Allows the interception of zone forking.
 *
 * When the zone is being forked, the request is forwarded to this method for interception.
 *
 * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
 * @param currentZone The current [Zone] where the current interceptor has beed declared.
 * @param targetZone The [Zone] which originally received the request.
 * @param zoneSpec The argument passed into the `fork` method.
 */
ZoneSpec.prototype.onFork = function(parentZoneDelegate, currentZone, targetZone, zoneSpec) {};

  /**
   * Allows interception of the wrapping of the callback.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param delegate The argument passed into the `warp` method.
   * @param source The argument passed into the `warp` method.
   */
ZoneSpec.prototype.onIntercept = function
      (parentZoneDelegate, currentZone, targetZone, delegate, source) {};

  /**
   * Allows interception of the callback invocation.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param delegate The argument passed into the `run` method.
   * @param applyThis The argument passed into the `run` method.
   * @param applyArgs The argument passed into the `run` method.
   * @param source The argument passed into the `run` method.
   */
ZoneSpec.prototype.onInvoke = function
      (parentZoneDelegate, currentZone, targetZone, delegate,
       applyThis, applyArgs, source) {};

  /**
   * Allows interception of the error handling.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param error The argument passed into the `handleError` method.
   */
ZoneSpec.prototype.onHandleError = function
      (parentZoneDelegate, currentZone, targetZone, error) {};

  /**
   * Allows interception of task scheduling.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param task The argument passed into the `scheduleTask` method.
   */
ZoneSpec.prototype.onScheduleTask = function
      (parentZoneDelegate, currentZone, targetZone, task) {};

ZoneSpec.prototype.onInvokeTask = function
      (parentZoneDelegate, currentZone, targetZone, task,
       applyThis, applyArgs) {};

  /**
   * Allows interception of task cancelation.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param task The argument passed into the `cancelTask` method.
   */
ZoneSpec.prototype.onCancelTask = function
      (parentZoneDelegate, currentZone, targetZone, task) {};

  /**
   * Notifies of changes to the task queue empty status.
   *
   * @param parentZoneDelegate Delegate which performs the parent [ZoneSpec] operation.
   * @param currentZone The current [Zone] where the current interceptor has beed declared.
   * @param targetZone The [Zone] which originally received the request.
   * @param isEmpty
   */
ZoneSpec.prototype.onHasTask = function
      (delegate, current, target, hasTaskState) {};

var ZoneDelegate = function() {};
ZoneDelegate.prototype.zone;
ZoneDelegate.prototype.fork = function(targetZone, zoneSpec) {};
ZoneDelegate.prototype.intercept = function(targetZone, callback, source) {};
ZoneDelegate.prototype.invoke = function(targetZone, callback, applyThis, applyArgs, source) {};
ZoneDelegate.prototype.handleError = function(targetZone, error) {};
ZoneDelegate.prototype.scheduleTask = function(targetZone, task) {};
ZoneDelegate.prototype.invokeTask = function(targetZone, task, applyThis, applyArgs) {};
ZoneDelegate.prototype.cancelTask = function(targetZone, task) {};
ZoneDelegate.prototype.hasTask = function(targetZone, isEmpty) {};
